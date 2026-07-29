import Database from 'better-sqlite3';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

const DB_PATH = join(process.cwd(), 'backend', 'db', 'fundao.db');

const dbDir = join(process.cwd(), 'backend', 'db');
if (!existsSync(dbDir)) {
  mkdirSync(dbDir, { recursive: true });
}

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id TEXT PRIMARY KEY,
    title_zh TEXT NOT NULL,
    title_en TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    content_zh TEXT NOT NULL,
    content_en TEXT NOT NULL,
    excerpt_zh TEXT,
    excerpt_en TEXT,
    cover_image TEXT,
    tags TEXT,
    published INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS page_content (
    id TEXT PRIMARY KEY,
    page_key TEXT NOT NULL,
    lang TEXT NOT NULL,
    content TEXT NOT NULL,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(page_key, lang)
  );

  CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS api_keys (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    key TEXT UNIQUE NOT NULL,
    permissions TEXT DEFAULT 'read',
    active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS banners (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    link_url TEXT,
    sort_order INTEGER DEFAULT 0,
    active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

// Create default agent API key
const existingKey = db.prepare('SELECT id FROM api_keys WHERE name = ?').get('agent-default');
if (!existingKey) {
  const defaultKeyId = uuidv4();
  const defaultApiKey = 'fundao_agent_' + uuidv4().replace(/-/g, '');
  db.prepare(`INSERT INTO api_keys (id, name, key, permissions, active) VALUES (?, 'agent-default', ?, 'write', 1)`).run(defaultKeyId, defaultApiKey);
  console.log('Default agent API key created: ' + defaultApiKey);
}

export default db;
