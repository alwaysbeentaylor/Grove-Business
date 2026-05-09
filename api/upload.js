/* Client-direct image upload via @vercel/blob.
 * The browser sends the file straight to Blob storage; this function
 * only issues a short-lived signed token after authenticating the admin.
 * Keeps us under Vercel's serverless body-size limit. */

import { handleUpload } from '@vercel/blob/client';
import { getSessionFromReq, json } from './_lib.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, { error: 'Method not allowed' }, 405);

  const session = getSessionFromReq(req);
  if (!session?.admin) return json(res, { error: 'Unauthorized' }, 401);

  let body;
  try {
    let raw = '';
    for await (const chunk of req) raw += chunk;
    body = raw ? JSON.parse(raw) : {};
  } catch {
    return json(res, { error: 'Invalid body' }, 400);
  }

  try {
    const result = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
        maximumSizeInBytes: 8 * 1024 * 1024,
        addRandomSuffix: true,
      }),
      onUploadCompleted: async () => { /* nothing extra to do */ },
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    res.end(JSON.stringify(result));
  } catch (e) {
    json(res, { error: e?.message || 'Upload failed' }, 400);
  }
}
