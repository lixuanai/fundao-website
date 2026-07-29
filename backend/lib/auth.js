import db from './db.js';

export function validateApiKey(apiKey) {
  if (!apiKey) return false;
  const key = db.prepare('SELECT * FROM api_keys WHERE key = ? AND active = 1').get(apiKey);
  return !!key;
}

export function getKeyPermissions(apiKey) {
  const key = db.prepare('SELECT permissions FROM api_keys WHERE key = ? AND active = 1').get(apiKey);
  return key ? key.permissions : null;
}

export function requireAuth(req, res, permission = 'read') {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;
  if (!apiKey || !validateApiKey(apiKey)) {
    res.status(401).json({ error: 'Invalid or missing API key' });
    return false;
  }
  const perms = getKeyPermissions(apiKey);
  if (permission === 'write' && perms !== 'write') {
    res.status(403).json({ error: 'Insufficient permissions' });
    return false;
  }
  return true;
}
