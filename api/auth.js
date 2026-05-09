import {
  json, readJsonBody, getSessionFromReq, setSessionCookie, clearSessionCookie,
  signSession, verifyPassword, hashPassword, getStoredHash, setStoredHash, requireAuth,
  isBlobConfigured,
} from './_lib.js';

export default async function handler(req, res) {
  const action = (req.query?.action) || '';

  if (action === 'me') {
    const session = getSessionFromReq(req);
    const blobOk  = isBlobConfigured();
    let isDefault = true;
    if (blobOk) {
      try { ({ isDefault } = await getStoredHash()); } catch (e) { /* fall through */ }
    }
    return json(res, {
      logged_in:      !!session?.admin,
      using_default:  isDefault,
      blob_configured: blobOk,
      secret_set:     !!process.env.SESSION_SECRET,
    });
  }

  if (req.method !== 'POST') return json(res, { error: 'Method not allowed' }, 405);
  const body = await readJsonBody(req);

  if (action === 'login') {
    const password = body.password || '';
    if (!password) return json(res, { error: 'Password required' }, 400);
    if (!isBlobConfigured()) {
      return json(res, {
        error: 'Vercel Blob storage is not connected. In your Vercel dashboard: Storage → Create → Blob → Connect to project, then redeploy.',
      }, 503);
    }
    let hash, isDefault;
    try {
      ({ hash, isDefault } = await getStoredHash());
    } catch (e) {
      console.error('getStoredHash failed:', e);
      return json(res, { error: 'Could not reach storage: ' + (e.message || 'unknown') }, 500);
    }
    if (!verifyPassword(password, hash)) {
      await new Promise(r => setTimeout(r, 600));
      return json(res, { error: 'Invalid password' }, 401);
    }
    setSessionCookie(res, signSession({ admin: true }));
    return json(res, { ok: true, using_default: isDefault });
  }

  if (action === 'logout') {
    clearSessionCookie(res);
    return json(res, { ok: true });
  }

  if (action === 'change_password') {
    if (!requireAuth(req, res)) return;
    const { current = '', next = '' } = { current: body.current, next: body.new };
    if (next.length < 6) return json(res, { error: 'New password must be at least 6 characters' }, 400);
    const { hash } = await getStoredHash();
    if (!verifyPassword(current, hash)) return json(res, { error: 'Current password is wrong' }, 401);
    await setStoredHash(hashPassword(next));
    return json(res, { ok: true });
  }

  return json(res, { error: 'Unknown action' }, 400);
}
