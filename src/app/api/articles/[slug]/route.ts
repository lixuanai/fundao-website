import { NextRequest, NextResponse } from 'next/server';
import { getDb, queryAll, updateArticle, deleteArticle } from '@/lib/db';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  getDb();
  const article = queryAll("SELECT * FROM articles WHERE slug = ?", [params.slug]);
  if (!article.length) return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  return NextResponse.json(article[0]);
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  getDb();
  const apiKey = request.headers.get('x-api-key');
  if (!apiKey) return NextResponse.json({ error: 'Missing API key' }, { status: 401 });

  const key = queryAll("SELECT * FROM api_keys WHERE key = ?", [apiKey]);
  if (!key.length) return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });

  const body = await request.json();
  updateArticle(params.slug, {
    title_zh: body.title_zh,
    title_en: body.title_en,
    content_zh: body.content_zh,
    content_en: body.content_en,
    excerpt_zh: body.excerpt_zh,
    excerpt_en: body.excerpt_en,
    category: body.category,
    tags: body.tags,
    published: body.published ? 1 : 0,
    cover_image: body.cover_image,
    cover_image_en: body.cover_image_en || body.cover_image,
  });
  return NextResponse.json({ updated: true });
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  getDb();
  const apiKey = request.headers.get('x-api-key');
  if (!apiKey) return NextResponse.json({ error: 'Missing API key' }, { status: 401 });

  const key = queryAll("SELECT * FROM api_keys WHERE key = ?", [apiKey]);
  if (!key.length) return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });

  deleteArticle(params.slug);
  return NextResponse.json({ deleted: true });
}
