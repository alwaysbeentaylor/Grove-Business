import { json, readJson, writeJson, readJsonBody, requireAuth, clean, SEED_CONFIG } from './_lib.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const cfg = await readJson('config.json', null);
    return json(res, cfg && typeof cfg === 'object' ? cfg : SEED_CONFIG);
  }

  if (req.method === 'POST') {
    if (!requireAuth(req, res)) return;
    const body = await readJsonBody(req);
    const cfg = body.config;
    if (!cfg || typeof cfg !== 'object' || Array.isArray(cfg)) {
      return json(res, { error: 'Invalid payload' }, 400);
    }
    if (cfg.contact && typeof cfg.contact === 'object') {
      cfg.contact.whatsapp = String(cfg.contact.whatsapp || '').replace(/\D+/g, '');
    }
    await writeJson('config.json', clean(cfg));
    return json(res, { ok: true });
  }

  return json(res, { error: 'Method not allowed' }, 405);
}
