import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { sanityWriteClient, sanityReadClient } from '@/lib/sanity/admin-client'

const JWT_SECRET = process.env.JWT_SECRET || 'fundao-jwt-secret-2026'

// 验证 admin token
function verifyAdmin(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token')?.value
  if (!token) return false
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    return decoded.admin === true
  } catch {
    return false
  }
}

// 获取文章列表
export async function GET(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  try {
    const articles = await sanityReadClient.fetch(
      `*[_type == "article"] | order(publishedAt desc) {
        _id,
        titleZh,
        titleEn,
        slug,
        category,
        status,
        publishedAt,
        tags
      }`
    )
    return NextResponse.json({ articles })
  } catch (error) {
    return NextResponse.json({ error: '获取文章失败' }, { status: 500 })
  }
}

// 创建文章
export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { titleZh, titleEn, excerptZh, excerptEn, contentZh, contentEn, category, slug, tags, status } = body

    const doc = {
      _type: 'article',
      titleZh,
      titleEn: titleEn || titleZh, // 默认用中文标题
      excerptZh: excerptZh || '',
      excerptEn: excerptEn || excerptZh || '',
      contentZh: contentZh ? [{ _type: 'block', children: [{ _type: 'span', text: contentZh }] }] : [],
      contentEn: contentEn ? [{ _type: 'block', children: [{ _type: 'span', text: contentEn }] }] : [],
      category: category || 'news',
      slug: { _type: 'slug', current: slug || `article-${Date.now()}` },
      tags: tags || [],
      status: status || 'draft',
      publishedAt: status === 'published' ? new Date().toISOString() : null,
    }

    const result = await sanityWriteClient.create(doc)
    return NextResponse.json({ success: true, article: result })
  } catch (error) {
    console.error('Create article error:', error)
    return NextResponse.json({ error: '创建文章失败' }, { status: 500 })
  }
}
