import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

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

  // Seed articles
  const articles: Article[] = [
    {
      id: genId(), title_zh: 'FunDAO 上线 30 天涨幅超 18 倍', title_en: 'FunDAO Surges 18x in 30 Days',
      slug: 'fundao-30days', category: '机制解读',
      content_zh: 'FunDAO 自上线以来，凭借每日 2.5% 通缩机制和智能熔断保护，30 天内实现超 18 倍涨幅。持币地址数突破 7,739 个，社区持续壮大。',
      content_en: 'FunDAO has achieved over 18x growth in 30 days, powered by its daily 2.5% deflation mechanism and smart circuit breaker protection. Holder addresses have surpassed 7,739.',
      excerpt_zh: '上线 30 天涨幅超 18 倍，持币地址突破 7,739 个',
      excerpt_en: '18x growth in 30 days, 7,739+ holder addresses',
      cover_image: '', tags: '涨幅,通缩,社区', published: 1, created_at: now, updated_at: now,
    },
    {
      id: genId(), title_zh: '每日通缩 2.5%：FunDAO 的可持续价值引擎', title_en: 'Daily 2.5% Deflation: Sustainable Value Engine',
      slug: 'daily-deflation', category: '机制解读',
      content_zh: 'FunDAO 独创每日 2.5% 通缩机制，其中 50% 永久销毁、50% 分配给持有者。持续减少流通供应量，支撑代币长期价值。配合三级熔断机制（5%/10%/20%），有效防止恶意砸盘。',
      content_en: "FunDAO's innovative daily 2.5% deflation mechanism permanently burns 50% and distributes 50% to holders. Combined with three-tier circuit breaker (5%/10%/20%), it effectively prevents malicious dumping.",
      excerpt_zh: '50% 销毁 + 50% 分配，三级熔断保护',
      excerpt_en: '50% burn + 50% distribute, three-tier circuit breaker',
      cover_image: '', tags: '通缩,销毁,熔断', published: 1, created_at: now, updated_at: now,
    },
    {
      id: genId(), title_zh: '13 家顶级加密基金参投 FunDAO', title_en: '13 Top Crypto Funds Invest in FunDAO',
      slug: '13-funds', category: '生态合作',
      content_zh: 'Dragonfly、Animoca Brands、OKX Ventures 等 13 家全球顶级加密基金共同参投 FunDAO，彰显市场对去中心化增值模式的信心。',
      content_en: '13 top global crypto funds including Dragonfly, Animoca Brands, and OKX Ventures have invested in FunDAO.',
      excerpt_zh: 'Dragonfly、Animoca、OKX Ventures 等 13 家机构参投',
      excerpt_en: 'Dragonfly, Animoca, OKX Ventures among 13 institutional investors',
      cover_image: '', tags: '投资,机构,合作', published: 1, created_at: now, updated_at: now,
    },
    {
      id: genId(), title_zh: 'FunDAO 路线图：从 BSC 到多链生态', title_en: 'FunDAO Roadmap: From BSC to Multi-Chain',
      slug: 'roadmap-2026', category: '项目动态',
      content_zh: 'FunDAO 发布发展路线图：短期聚焦多语言社区建设和流动性增强，中长期将扩展至以太坊、Solana 等多链生态，并探索 AI 交易整合与 RWA 应用。',
      content_en: 'FunDAO releases development roadmap: short-term focus on multilingual community and liquidity enhancement, mid-to-long term expansion to Ethereum, Solana multi-chain ecosystem.',
      excerpt_zh: '多链扩展、AI 交易整合、RWA 探索',
      excerpt_en: 'Multi-chain expansion, AI trading, RWA exploration',
      cover_image: '', tags: '路线图,多链,AI', published: 1, created_at: now, updated_at: now,
    },
  ];
  db.articles = articles;
  saveDB();
}

export { loadDB as getDb, saveDB as saveDb, genId, queryAll, queryOne, insertArticle, updateArticle, deleteArticle, insertContact, upsertSetting };
export type { Article, Contact, SiteSetting, ApiKey, PageContent, DB };
