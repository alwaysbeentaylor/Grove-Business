/* =========================================================
   Grove Business — shared serverless helpers
   - Vercel Blob storage for fleet.json / config.json / images
   - HMAC-signed session cookies
   - scrypt password hashing (no deps beyond @vercel/blob)
   ========================================================= */

import crypto from 'node:crypto';
import { put, list, del } from '@vercel/blob';

/* ---------- SEED DATA ---------- */

export const SEED_FLEET = [
  { id:'g63',    name:'Mercedes-AMG G 63',           class:'SUV · OFF-ROAD ICON', specs:['4.0L V8 Biturbo','585 HP','Auto · 4 Seats'], price:'650',  image:'https://images.unsplash.com/photo-1622200294772-e411df76e3a2?w=1400&q=85&auto=format&fit=crop' },
  { id:'rs6',    name:'Audi RS 6 Avant',             class:'SPORT WAGON',          specs:['4.0L V8 TFSI','600 HP','Auto · 5 Seats'],     price:'450',  image:'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1400&q=85&auto=format&fit=crop' },
  { id:'p911',   name:'Porsche 911 Carrera',         class:'SPORTS COUPE',         specs:['3.0L Twin-Turbo','450 HP','PDK · 2+2 Seats'], price:'550',  image:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=85&auto=format&fit=crop' },
  { id:'rr',     name:'Range Rover Autobiography',   class:'LUXURY SUV',           specs:['4.4L V8','530 HP','Auto · 5 Seats'],          price:'495',  image:'https://images.unsplash.com/photo-1519440054040-ea13a3a2e2a7?w=1400&q=85&auto=format&fit=crop' },
  { id:'sclass', name:'Mercedes-Benz S-Class',       class:'EXECUTIVE SEDAN',      specs:['3.0L Inline-6','435 HP','Auto · 5 Seats'],    price:'420',  image:'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1400&q=85&auto=format&fit=crop' },
  { id:'urus',   name:'Lamborghini Urus',            class:'SUPER SUV',            specs:['4.0L V8 Biturbo','650 HP','Auto · 5 Seats'],  price:'1250', image:'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=1400&q=85&auto=format&fit=crop' },
];

export const SEED_CONFIG = {
  currency: '€',
  contact: {
    whatsapp: '351900000000',
    phone:    '+351 900 000 000',
    email:    'concierge@grovebusiness.pt',
    location: 'Lisbon · Porto · Algarve',
    address:  '',
    hours:    '24 / 7 · By appointment',
  },
  hero:  { eyebrow:'', titleStart:'', titleEnd:'', subtitle:'', image:'' },
  about: { title:'',   paragraph1:'', paragraph2:'', image:'' },
};

/* ---------- BLOB JSON HELPERS ---------- */

const blobUrl = (name) => `__data__/${name}`;

export async function readJson(name, fallback) {
  try {
    const { blobs } = await list({ prefix: blobUrl(name) });
    if (!blobs.length) return fallback;
    const res = await fetch(blobs[0].url, { cache: 'no-store' });
    if (!res.ok) return fallback;
    return await res.json();
  } catch (e) {
    console.error('readJson', name, e);
    return fallback;
  }
}

export async function writeJson(name, data) {
  await put(blobUrl(name), JSON.stringify(data, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
}

/* ---------- IMAGE UPLOADS ---------- */

export async function uploadImage(file, name) {
  return await put(`uploads/${name}`, file, {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function deleteBlob(url) {
  try { await del(url); } catch {}
}

/* ---------- AUTH ---------- */

const DEFAULT_PASS = 'grove2026';
const SECRET = process.env.SESSION_SECRET || 'dev-only-secret-change-in-vercel-env';

export function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const hash = crypto.scryptSync(password, salt, 64);
  return salt.toString('hex') + ':' + hash.toString('hex');
}

export function verifyPassword(password, stored) {
  try {
    const [saltHex, hashHex] = stored.split(':');
    const salt = Buffer.from(saltHex, 'hex');
    const expected = Buffer.from(hashHex, 'hex');
    if (expected.length !== 64) return false;
    const actual = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}

export async function getStoredHash() {
  const admin = await readJson('admin.json', null);
  if (admin && typeof admin.hash === 'string') return { hash: admin.hash, isDefault: false };
  return { hash: hashPassword(DEFAULT_PASS), isDefault: true };
}

export async function setStoredHash(hash) {
  await writeJson('admin.json', { hash });
}

const SESSION_DAYS = 7;

export function signSession(payload) {
  const data = Buffer.from(JSON.stringify({
    ...payload,
    exp: Date.now() + SESSION_DAYS * 24 * 3600 * 1000,
  })).toString('base64url');
  const sig = crypto.createHmac('sha256', SECRET).update(data).digest('base64url');
  return data + '.' + sig;
}

export function verifySession(token) {
  if (!token) return null;
  try {
    const [data, sig] = token.split('.');
    if (!data || !sig) return null;
    const expected = crypto.createHmac('sha256', SECRET).update(data).digest('base64url');
    const sigBuf = Buffer.from(sig);
    const expectedBuf = Buffer.from(expected);
    if (sigBuf.length !== expectedBuf.length) return null;
    if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return null;
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString());
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function isBlobConfigured() {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

/* ---------- COOKIE / REQUEST UTILS ---------- */

const COOKIE = 'gb_admin';

export function getSessionFromReq(req) {
  const raw = req.headers.cookie || '';
  for (const c of raw.split(';')) {
    const [k, ...rest] = c.trim().split('=');
    if (k === COOKIE) return verifySession(decodeURIComponent(rest.join('=')));
  }
  return null;
}

export function setSessionCookie(res, token) {
  const max = SESSION_DAYS * 24 * 3600;
  res.setHeader('Set-Cookie',
    `${COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${max}`);
}

export function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);
}

export function requireAuth(req, res) {
  const s = getSessionFromReq(req);
  if (!s || !s.admin) { json(res, { error: 'Unauthorized' }, 401); return null; }
  return s;
}

export function json(res, body, status = 200) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export async function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', c => { data += c; if (data.length > 256 * 1024) { req.destroy(); reject(new Error('Body too large')); } });
    req.on('end', () => {
      if (!data) return resolve({});
      try { resolve(JSON.parse(data)); } catch { resolve({}); }
    });
    req.on('error', reject);
  });
}

/* Recursively trim and bound string fields. */
export function clean(v) {
  if (typeof v === 'string') return v.trim().slice(0, 4000);
  if (Array.isArray(v))  return v.map(clean);
  if (v && typeof v === 'object') {
    const out = {};
    for (const [k, vv] of Object.entries(v)) out[k] = clean(vv);
    return out;
  }
  return v;
}
