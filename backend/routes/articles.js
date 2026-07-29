import db from '../lib/db.js';
import { v4 as uuidv4 } from 'uuid';

export function getAllArticles(lang = 'zh', publishedOnly = false) {
  const sql = publishedOnly
    ? 'SELECT * FROM articles WHERE published = 1 ORDER BY created_at DESC'
    : 'SELECT * FROM articles ORDER BY created_at DESC';
  return db.prepare(sql).all().map(a => ({
    id: a.id,
    title: lang === 'en' ? a.title_en : a.title_zh,
    slug: a.slug,
    category: a.category,
    excerpt: lang === 'en' ? a.excerpt_en : a.excerpt_zh,
    coverImage: a.cover_image,
    tags: a.tags ? JSON.parse(a.tags) : [],
    published: a.published,
    createdAt: a.created_at,
    updatedAt: a.updated_at
  }));
}

export function getArticleBySlug(slug, lang = 'zh') {
  const a = db.prepare('SELECT * FROM articles WHERE slug = ?').get(slug);
  if (!a) return null;
  return {
    id: a.id,
    title: lang === 'en' ? a.title_en : a.title_zh,
    titleZh: a.title_zh,
    titleEn: a.title_en,
    slug: a.slug,
    category: a.category,
    content: lang === 'en' ? a.content_en : a.content_zh,
    contentZh: a.content_zh,
    contentEn: a.content_en,
    excerpt: lang === 'en' ? a.excerpt_en : a.excerpt_zh,
    coverImage: a.cover_image,
    tags: a.tags ? JSON.parse(a.tags) : [],
    published: a.published,
    createdAt: a.created_at,
    updatedAt: a.updated_at
  };
}

export function createArticle(data) {
  const id = uuidv4();
  db.prepare(`INSERT INTO articles (id, title_zh, title_en, slug, category, content_zh, content_en, excerpt_zh, excerpt_en, cover_image, tags, published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(
    id, data.titleZh, data.titleEn, data.slug, data.category,
    data.contentZh, data.contentEn, data.excerptZh || null, data.excerptEn || null,
    data.coverImage || null, JSON.stringify(data.tags || []), data.published ? 1 : 0
  );
  return getArticleBySlug(data.slug);
}

export function updateArticle(slug, data) {
  const updates = [];
  const values = [];
  const fields = {
    titleZh: 'title_zh', titleEn: 'title_en', contentZh: 'content_zh',
    contentEn: 'content_en', excerptZh: 'excerpt_zh', excerptEn: 'excerpt_en',
    category: 'category', coverImage: 'cover_image'
  };
  for (const [key, col] of Object.entries(fields)) {
    if (data[key] !== undefined) { updates.push(`${col} = ?`); values.push(data[key]); }
  }
  if (data.tags !== undefined) { updates.push('tags = ?'); values.push(JSON.stringify(data.tags)); }
  if (data.published !== undefined) { updates.push('published = ?'); values.push(data.published ? 1 : 0); }
  updates.push('updated_at = CURRENT_TIMESTAMP');
  values.push(slug);
  db.prepare(`UPDATE articles SET ${updates.join(', ')} WHERE slug = ?`).run(...values);
  return getArticleBySlug(slug);
}

export function deleteArticle(slug) {
  return db.prepare('DELETE FROM articles WHERE slug = ?').run(slug).changes > 0;
}
