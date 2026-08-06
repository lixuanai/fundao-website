import { NextRequest, NextResponse } from 'next/server';
import { getDb, genId, queryAll, insertArticle } from '@/lib/db';

export async function GET(request: NextRequest) {
  getDb();
  const { searchParams } = new URL(request.url);
  const published = searchParams.get('published');

  let sql = `SELECT * FROM articles`;
  const params: any[] = [];

  if (published === 'true') {
    sql += ` WHERE published = 1`;
  }

  sql += ` ORDER BY created_at DESC`;

  const articles = queryAll(sql, params);
  // Force category_en mapping for all articles
  const categoryEnMap: Record<string, string> = {
    '行业新闻': 'Industry News',
    '生态合作': 'Ecosystem Partnerships',
    '项目动态': 'Project Updates',
    '机制解读': 'Mechanism Analysis',
  };
  const enriched = articles.map((a: any) => ({
    ...a,
    category_en: a.category_en || categoryEnMap[a.category] || a.category,
  }));
  return NextResponse.json({ ...enriched, _version: '2026-08-06-v2', _count: enriched.length });
}

export async function POST(request: NextRequest) {
  getDb();
  const apiKey = request.headers.get('x-api-key');
  if (!apiKey) return NextResponse.json({ error: 'Missing API key' }, { status: 401 });

  const key = queryAll("SELECT * FROM api_keys WHERE key = ?", [apiKey]);
  if (!key.length) return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });

  const body = await request.json();
  const id = genId();
  const now = new Date().toISOString();

  insertArticle({
    id,
    title_zh: body.title_zh || '',
    title_en: body.title_en || '',
    slug: body.slug || '',
    category: body.category || '项目动态',
    content_zh: body.content_zh || '',
    content_en: body.content_en || '',
    excerpt_zh: body.excerpt_zh || '',
    excerpt_en: body.excerpt_en || '',
    cover_image: body.cover_image || '',
    tags: body.tags || '',
    published: body.published ? 1 : 0,
    created_at: now,
    updated_at: now,
  });

  return NextResponse.json({ id, slug: body.slug }, { status: 201 });
}
