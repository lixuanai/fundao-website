import db from '../lib/db.js';

export function getPageContent(pageKey, lang = 'zh') {
  const row = db.prepare('SELECT content FROM page_content WHERE page_key = ? AND lang = ?').get(pageKey, lang);
  return row ? JSON.parse(row.content) : null;
}

export function setPageContent(pageKey, lang, content) {
  const json = JSON.stringify(content);
  db.prepare(`INSERT INTO page_content (page_key, lang, content, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP) ON CONFLICT(page_key, lang) DO UPDATE SET content = ?, updated_at = CURRENT_TIMESTAMP`).run(pageKey, lang, json, json);
  return getPageContent(pageKey, lang);
}

export function getSetting(key) {
  const row = db.prepare('SELECT value FROM site_settings WHERE key = ?').get(key);
  return row ? row.value : null;
}

export function setSetting(key, value) {
  db.prepare(`INSERT INTO site_settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP) ON CONFLICT(key) DO UPDATE SET value = ?, updated_at = CURRENT_TIMESTAMP`).run(key, value, value);
  return getSetting(key);
}

export function getAllSettings() {
  const rows = db.prepare('SELECT key, value FROM site_settings').all();
  const result = {};
  rows.forEach(r => { result[r.key] = r.value; });
  return result;
}
