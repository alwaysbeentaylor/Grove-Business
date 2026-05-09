import { json, readJson, writeJson, readJsonBody, requireAuth, clean, SEED_FLEET } from './_lib.js';
import crypto from 'node:crypto';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const fleet = await readJson('fleet.json', null);
    return json(res, Array.isArray(fleet) ? fleet : SEED_FLEET);
  }

  if (req.method === 'POST') {
    if (!requireAuth(req, res)) return;
    const body = await readJsonBody(req);
    if (!Array.isArray(body.fleet)) return json(res, { error: 'Invalid payload' }, 400);

    const cleaned = body.fleet.map(c => ({
      id:    typeof c.id === 'string' && c.id ? c.id : 'car_' + crypto.randomBytes(4).toString('hex'),
      name:  clean(c.name  || ''),
      class: clean(c.class || ''),
      specs: Array.isArray(c.specs) ? c.specs.map(clean).filter(Boolean) : [],
      price: clean(c.price || ''),
      image: clean(c.image || ''),
    })).filter(c => c.name);

    await writeJson('fleet.json', cleaned);
    return json(res, { ok: true, count: cleaned.length });
  }

  return json(res, { error: 'Method not allowed' }, 405);
}
