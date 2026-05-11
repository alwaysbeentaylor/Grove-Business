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

  if (req.method !== 'POST') return json(res, { error: 'Método não permitido' }, 405);
  const body = await readJsonBody(req);

  if (action === 'login') {
    const password = body.password || '';
    if (!password) return json(res, { error: 'Palavra-passe obrigatória' }, 400);
    if (!isBlobConfigured()) {
      return json(res, {
        error: 'Armazenamento Vercel Blob não está ligado. No painel Vercel: Storage → Create → Blob → Connect to project, depois faça redeploy.',
      }, 503);
    }
    let hash, isDefault;
    try {
      ({ hash, isDefault } = await getStoredHash());
    } catch (e) {
      console.error('getStoredHash failed:', e);
      return json(res, { error: 'Não foi possível aceder ao armazenamento: ' + (e.message || 'erro desconhecido') }, 500);
    }
    if (!verifyPassword(password, hash)) {
      await new Promise(r => setTimeout(r, 600));
      return json(res, { error: 'Palavra-passe inválida' }, 401);
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
    const current = body.current || '';
    const next    = body.new     || '';
    if (next.length < 6) {
      return json(res, { error: 'A nova palavra-passe tem de ter pelo menos 6 caracteres' }, 400);
    }
    let hash;
    try {
      ({ hash } = await getStoredHash());
    } catch (e) {
      console.error('getStoredHash failed:', e);
      return json(res, { error: 'Não foi possível aceder ao armazenamento: ' + (e.message || 'erro desconhecido') }, 500);
    }
    if (!verifyPassword(current, hash)) {
      return json(res, { error: 'Palavra-passe atual incorreta' }, 401);
    }
    try {
      await setStoredHash(hashPassword(next));
    } catch (e) {
      console.error('setStoredHash failed:', e);
      return json(res, { error: 'Não foi possível guardar a nova palavra-passe: ' + (e.message || 'erro desconhecido') }, 500);
    }
    return json(res, { ok: true });
  }

  return json(res, { error: 'Ação desconhecida' }, 400);
}
