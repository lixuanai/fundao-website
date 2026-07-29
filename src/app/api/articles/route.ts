import { NextRequest, NextResponse } from 'next/server';
import { getDb, genId, queryAll, queryOne, saveDb } from '@/lib/db';

export async function GET(request: NextRequest) {
  await getDb();
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'zh';
  const published = searchParams.get('published');

  let sql = `SELECT * FROM articles`;
  const params: any[] = [];

  if (published === 'true') {
    sql += ` WHERE published = 1`;
  }

  sql += ` ORDER BY created_at DESC`;

  const articles = queryAll(sql, params);
  return NextResponse.json(articles);
}

export async function POST(request: NextRequest) {
  await getDb();
  const apiKey = request.headers.get('x-api-key');
  if (!apiKey) return NextResponse.json({ error: 'Missing API key' }, { status: 401 });

  const key = queryOne("SELECT permissions FROM api_keys WHERE key = ? AND active = 1", [apiKey]);
  if (!key) return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });

  const body = await request.json();
  const id = genId();
  const now = new Date().toISOString();

  const db = await getDb();
  db.run(
    `INSERT INTO articles (id, title_zh, title_en, slug, category, content_zh, content_en, excerpt_zh, excerpt_en, cover_image, tags, published, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [id, body.title_zh || '', body.title_en || '', body.slug || '', body.category || '项目动态', body.content_zh || '', body.content_en || '', body.excerpt_zh || '', body.excerpt_en || '', body.cover_image || '', body.tags || '', body.published ? 1 : 0, now, now]
  );
  saveDb();

  return NextResponse.json({ id, slug: body.slug }, { status: 201 });
}
