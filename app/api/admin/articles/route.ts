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
        tags,
        coverImage
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
    const { titleZh, titleEn, excerptZh, excerptEn, contentZh, contentEn, category, slug, tags, status, coverImage } = body

    // 构建 Portable Text 内容块
    const buildPortableText = (content: string) => {
      if (!content) return []
      // 简单实现：将整个 Markdown 作为一个文本块
      // 实际生产环境可以使用 markdown-it 或类似库解析为多个块
      return content.split('\n\n').map((paragraph: string) => ({
        _type: 'block',
        style: paragraph.startsWith('# ') ? 'h1' : paragraph.startsWith('## ') ? 'h2' : paragraph.startsWith('### ') ? 'h3' : 'normal',
        children: [{
          _type: 'span',
          text: paragraph.replace(/^#+\s/, '').trim()
        }]
      }))
    }

    const doc = {
      _type: 'article',
      titleZh,
      titleEn: titleEn || titleZh,
      excerptZh: excerptZh || '',
      excerptEn: excerptEn || excerptZh || '',
      contentZh: buildPortableText(contentZh),
      contentEn: buildPortableText(contentEn),
      category: category || 'news',
      slug: { _type: 'slug', current: slug || `article-${Date.now()}` },
      tags: tags || [],
      status: status || 'draft',
      publishedAt: status === 'published' ? new Date().toISOString() : null,
      // 封面图：如果提供了 asset ID，构建 Sanity 图片引用
      ...(coverImage && {
        coverImage: {
          _type: 'image',
          asset: { _type: 'reference', _ref: coverImage },
          alt: titleZh || '文章封面图'
        }
      })
    }

    const result = await sanityWriteClient.create(doc)
    return NextResponse.json({ success: true, article: result })
  } catch (error) {
    console.error('Create article error:', error)
    return NextResponse.json({ error: '创建文章失败', details: String(error) }, { status: 500 })
  }
}
