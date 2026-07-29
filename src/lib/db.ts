import initSqlJs, { Database } from 'sql.js';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DB_DIR = join(process.cwd(), 'data');
const DB_PATH = join(DB_DIR, 'fundao.db');

let db: Database | null = null;
let initPromise: Promise<Database> | null = null;

function ensureDir() {
  if (!existsSync(DB_DIR)) mkdirSync(DB_DIR, { recursive: true });
}

async function getDb(): Promise<Database> {
  if (db) return db;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const SQL = await initSqlJs({
      locateFile: (file: string) => `https://sql.js.org/dist/${file}`
    });
    ensureDir();

    if (existsSync(DB_PATH)) {
      const buffer = readFileSync(DB_PATH);
      db = new SQL.Database(buffer);
    } else {
      db = new SQL.Database();
    }

    db.run(`
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
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );
      CREATE TABLE IF NOT EXISTS page_content (
        id TEXT PRIMARY KEY,
        page_key TEXT NOT NULL,
        lang TEXT NOT NULL,
        content TEXT NOT NULL,
        updated_at TEXT DEFAULT (datetime('now')),
        UNIQUE(page_key, lang)
      );
      CREATE TABLE IF NOT EXISTS site_settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at TEXT DEFAULT (datetime('now'))
      );
      CREATE TABLE IF NOT EXISTS api_keys (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        key TEXT UNIQUE NOT NULL,
        permissions TEXT DEFAULT 'read',
        active INTEGER DEFAULT 1,
        created_at TEXT DEFAULT (datetime('now'))
      );
      CREATE TABLE IF NOT EXISTS contacts (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT,
        message TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now'))
      );
    `);

    // Seed default articles if empty
    const countResult = db.exec("SELECT COUNT(*) as c FROM articles");
    if (!countResult.length || countResult[0].values[0][0] === 0) {
      seedArticles();
    }

    // Seed default API key
    const keyResult = db.exec("SELECT COUNT(*) as c FROM api_keys");
    if (!keyResult.length || keyResult[0].values[0][0] === 0) {
      const defaultKey = 'fundao_agent_8caa8e1209a44a05a0a0e5f990a6a577';
      db.run("INSERT INTO api_keys (id, name, key, permissions, active) VALUES (?, 'agent-default', ?, 'write', 1)", ['key-1', defaultKey]);
    }

    saveDb();
    return db!;
  })();

  return initPromise;
}

function saveDb() {
  if (!db) return;
  ensureDir();
  const data = db.export();
  const buffer = Buffer.from(data);
  writeFileSync(DB_PATH, buffer);
}

function genId(): string {
  return 'id_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function seedArticles() {
  const articles = [
    {
      id: genId(),
      title_zh: 'FunDAO 上线 30 天涨幅超 18 倍',
      title_en: 'FunDAO Surges 18x in 30 Days',
      slug: 'fundao-30days',
      category: '机制解读',
      content_zh: 'FunDAO 自上线以来，凭借每日 2.5% 通缩机制和智能熔断保护，30 天内实现超 18 倍涨幅。持币地址数突破 7,739 个，社区持续壮大。',
      content_en: 'FunDAO has achieved over 18x growth in 30 days, powered by its daily 2.5% deflation mechanism and smart circuit breaker protection. Holder addresses have surpassed 7,739.',
      excerpt_zh: '上线 30 天涨幅超 18 倍，持币地址突破 7,739 个',
      excerpt_en: '18x growth in 30 days, 7,739+ holder addresses',
      cover_image: '',
      tags: '涨幅,通缩,社区',
      published: 1
    },
    {
      id: genId(),
      title_zh: '每日通缩 2.5%：FunDAO 的可持续价值引擎',
      title_en: 'Daily 2.5% Deflation: Sustainable Value Engine',
      slug: 'daily-deflation',
      category: '机制解读',
      content_zh: 'FunDAO 独创每日 2.5% 通缩机制，其中 50% 永久销毁、50% 分配给持有者。持续减少流通供应量，支撑代币长期价值。配合三级熔断机制（5%/10%/20%），有效防止恶意砸盘。',
      content_en: 'FunDAO\'s innovative daily 2.5% deflation mechanism permanently burns 50% and distributes 50% to holders. Combined with three-tier circuit breaker (5%/10%/20%), it effectively prevents malicious dumping.',
      excerpt_zh: '50% 销毁 + 50% 分配，三级熔断保护',
      excerpt_en: '50% burn + 50% distribute, three-tier circuit breaker',
      cover_image: '',
      tags: '通缩,销毁,熔断',
      published: 1
    },
    {
      id: genId(),
      title_zh: '13 家顶级加密基金参投 FunDAO',
      title_en: '13 Top Crypto Funds Invest in FunDAO',
      slug: '13-funds',
      category: '生态合作',
      content_zh: 'Dragonfly、Animoca Brands、OKX Ventures 等 13 家全球顶级加密基金共同参投 FunDAO，彰显市场对去中心化增值模式的信心。',
      content_en: '13 top global crypto funds including Dragonfly, Animoca Brands, and OKX Ventures have invested in FunDAO.',
      excerpt_zh: 'Dragonfly、Animoca、OKX Ventures 等 13 家机构参投',
      excerpt_en: 'Dragonfly, Animoca, OKX Ventures among 13 institutional investors',
      cover_image: '',
      tags: '投资,机构,合作',
      published: 1
    },
    {
      id: genId(),
      title_zh: 'FunDAO 路线图：从 BSC 到多链生态',
      title_en: 'FunDAO Roadmap: From BSC to Multi-Chain',
      slug: 'roadmap-2026',
      category: '项目动态',
      content_zh: 'FunDAO 发布发展路线图：短期聚焦多语言社区建设和流动性增强，中长期将扩展至以太坊、Solana 等多链生态，并探索 AI 交易整合与 RWA 应用。',
      content_en: 'FunDAO releases development roadmap: short-term focus on multilingual community and liquidity enhancement, mid-to-long term expansion to Ethereum, Solana multi-chain ecosystem.',
      excerpt_zh: '多链扩展、AI 交易整合、RWA 探索',
      excerpt_en: 'Multi-chain expansion, AI trading, RWA exploration',
      cover_image: '',
      tags: '路线图,多链,AI',
      published: 1
    }
  ];

  const stmt = db!.prepare(
    'INSERT INTO articles (id, title_zh, title_en, slug, category, content_zh, content_en, excerpt_zh, excerpt_en, cover_image, tags, published) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'
  );
  for (const a of articles) {
    stmt.run([a.id, a.title_zh, a.title_en, a.slug, a.category, a.content_zh, a.content_en, a.excerpt_zh, a.excerpt_en, a.cover_image, a.tags, a.published]);
  }
  stmt.free();
  saveDb();
}

function queryAll(sql: string, params: any[] = []): any[] {
  if (!db) return [];
  const results = db.exec(sql, params);
  if (!results.length) return [];
  const columns = results[0].columns;
  return results[0].values.map(row => {
    const obj: any = {};
    columns.forEach((col, i) => { obj[col] = row[i]; });
    return obj;
  });
}

function queryOne(sql: string, params: any[] = []): any | null {
  const results = queryAll(sql, params);
  return results.length ? results[0] : null;
}

export { getDb, saveDb, genId, queryAll, queryOne };
