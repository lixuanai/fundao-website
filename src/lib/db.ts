import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import seedArticlesData from '../data/seed-articles.json';

const DB_DIR = join(process.cwd(), 'data');
const DB_PATH = join(DB_DIR, 'fundao.json');

interface DB {
  articles: Article[];
  page_content: PageContent[];
  site_settings: SiteSetting[];
  api_keys: ApiKey[];
  contacts: Contact[];
}

interface Article {
  id: string;
  title_zh: string;
  title_en: string;
  slug: string;
  category: string;
  content_zh: string;
  content_en: string;
  excerpt_zh: string;
  excerpt_en: string;
  cover_image: string;
  tags: string;
  published: number;
  created_at: string;
  updated_at: string;
}

interface PageContent {
  id: string;
  page_key: string;
  lang: string;
  content: string;
  updated_at: string;
}

interface SiteSetting {
  key: string;
  value: string;
  updated_at: string;
}

interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string;
  active: number;
  created_at: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

let cache: DB | null = null;

function ensureDir() {
  if (!existsSync(DB_DIR)) mkdirSync(DB_DIR, { recursive: true });
}

function loadDB(): DB {
  if (cache) return cache;
  ensureDir();
  if (existsSync(DB_PATH)) {
    cache = JSON.parse(readFileSync(DB_PATH, 'utf-8'));
  } else {
    cache = {
      articles: [],
      page_content: [],
      site_settings: [],
      api_keys: [],
      contacts: [],
    };
    seedData();
  }
  return cache!;
}

function saveDB() {
  ensureDir();
  writeFileSync(DB_PATH, JSON.stringify(cache, null, 2));
}

function genId(): string {
  return 'id_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function queryAll(sql: string, params: any[] = []): any[] {
  const db = loadDB();
  
  // Simple SQL parser for our use cases
  if (sql.includes('FROM articles')) {
    let results = [...db.articles];
    if (sql.includes('WHERE published = 1')) results = results.filter(a => a.published === 1);
    if (sql.includes('WHERE slug =')) {
      const slug = params[0];
      results = results.filter(a => a.slug === slug);
    }
    if (sql.includes('ORDER BY created_at DESC')) results.sort((a, b) => b.created_at.localeCompare(a.created_at));
    return results;
  }
  if (sql.includes('FROM contacts')) {
    let results = [...db.contacts];
    if (sql.includes('ORDER BY created_at DESC')) results.sort((a, b) => b.created_at.localeCompare(a.created_at));
    return results;
  }
  if (sql.includes('FROM site_settings')) {
    if (sql.includes('WHERE key =')) return db.site_settings.filter(s => s.key === params[0]);
    return [...db.site_settings];
  }
  if (sql.includes('FROM api_keys')) {
    if (sql.includes('WHERE key =')) return db.api_keys.filter(k => k.key === params[0] && k.active === 1);
    return [...db.api_keys];
  }
  if (sql.includes('FROM page_content')) {
    if (sql.includes('WHERE page_key =')) return db.page_content.filter(p => p.page_key === params[0] && p.lang === (params[1] || 'zh'));
    return [...db.page_content];
  }
  return [];
}

function queryOne(sql: string, params: any[] = []): any | null {
  const results = queryAll(sql, params);
  return results.length ? results[0] : null;
}

function insertArticle(a: Article) {
  const db = loadDB();
  db.articles.push(a);
  saveDB();
}

function updateArticle(slug: string, fields: Partial<Article>) {
  const db = loadDB();
  const idx = db.articles.findIndex(a => a.slug === slug);
  if (idx >= 0) {
    db.articles[idx] = { ...db.articles[idx], ...fields, updated_at: new Date().toISOString() };
    saveDB();
  }
}

function deleteArticle(slug: string) {
  const db = loadDB();
  db.articles = db.articles.filter(a => a.slug !== slug);
  saveDB();
}

function insertContact(c: Contact) {
  const db = loadDB();
  db.contacts.push({ ...c, subject: c.subject || '' });
  saveDB();
}

function upsertSetting(key: string, value: string) {
  const db = loadDB();
  const idx = db.site_settings.findIndex(s => s.key === key);
  const entry = { key, value, updated_at: new Date().toISOString() };
  if (idx >= 0) db.site_settings[idx] = entry;
  else db.site_settings.push(entry);
  saveDB();
}

function seedData() {
  const db = loadDB()!;
  const now = new Date().toISOString();
  
  // Seed default API key
  db.api_keys.push({
    id: 'key-1',
    name: 'agent-default',
    key: 'fundao_agent_8caa8e1209a44a05a0a0e5f990a6a577',
    permissions: 'write',
    active: 1,
    created_at: now,
  });

  // Seed articles from committed JSON file (works on Vercel)
  const articles: Article[] = (seedArticlesData as any[]).map((a: any, i: number) => ({
    id: a.id || genId(),
    title_zh: a.title_zh || '',
    title_en: a.title_en || '',
    slug: a.slug || '',
    category: a.category || '',
    content_zh: a.content_zh || '',
    content_en: a.content_en || '',
    excerpt_zh: a.excerpt_zh || '',
    excerpt_en: a.excerpt_en || '',
    cover_image: a.cover_image || '',
    tags: a.tags || '',
    published: a.published ?? 1,
    created_at: a.created_at || now,
    updated_at: a.updated_at || now,
  }));
  db.articles = articles;
  saveDB();
}

export { loadDB as getDb, saveDB as saveDb, genId, queryAll, queryOne, insertArticle, updateArticle, deleteArticle, insertContact, upsertSetting };
export type { Article, Contact, SiteSetting, ApiKey, PageContent, DB };
