import { NextRequest, NextResponse } from 'next/server';
import { getDb, queryOne, saveDb } from '@/lib/db';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  await getDb();
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'zh';
  const article = queryOne("SELECT * FROM articles WHERE slug = ?", [params.slug]);
  if (!article) return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  return NextResponse.json(article);
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  await getDb();
  const apiKey = request.headers.get('x-api-key');
  if (!apiKey) return NextResponse.json({ error: 'Missing API key' }, { status: 401 });

  const key = queryOne("SELECT permissions FROM api_keys WHERE key = ? AND active = 1", [apiKey]);
  if (!key) return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });

  const body = await request.json();
  const now = new Date().toISOString();
  const db = await getDb();
  db.run(
    `UPDATE articles SET title_zh=?, title_en=?, content_zh=?, content_en=?, excerpt_zh=?, excerpt_en=?, category=?, tags=?, published=?, updated_at=? WHERE slug=?`,
    [body.title_zh, body.title_en, body.content_zh, body.content_en, body.excerpt_zh, body.excerpt_en, body.category, body.tags, body.published ? 1 : 0, now, params.slug]
  );
  saveDb();
  return NextResponse.json({ updated: true });
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  await getDb();
  const apiKey = request.headers.get('x-api-key');
  if (!apiKey) return NextResponse.json({ error: 'Missing API key' }, { status: 401 });

  const key = queryOne("SELECT permissions FROM api_keys WHERE key = ? AND active = 1", [apiKey]);
  if (!key) return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });

  const db = await getDb();
  db.run("DELETE FROM articles WHERE slug = ?", [params.slug]);
  saveDb();
  return NextResponse.json({ deleted: true });
}
