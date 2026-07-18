import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { sanityWriteClient, sanityReadClient } from '@/lib/sanity/admin-client'

const JWT_SECRET = process.env.JWT_SECRET || 'fundao-jwt-secret-2026'

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

// 获取单篇文章
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  try {
    const article = await sanityReadClient.fetch(
      `*[_type == "article" && _id == $id][0]`,
      { id: params.id }
    )
    if (!article) {
      return NextResponse.json({ error: '文章不存在' }, { status: 404 })
    }
    return NextResponse.json({ article })
  } catch (error) {
    return NextResponse.json({ error: '获取文章失败' }, { status: 500 })
  }
}

// 更新文章
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { titleZh, titleEn, excerptZh, excerptEn, contentZh, contentEn, category, slug, tags, status } = body

    const updates: any = {}
    if (titleZh !== undefined) updates.titleZh = titleZh
    if (titleEn !== undefined) updates.titleEn = titleEn
    if (excerptZh !== undefined) updates.excerptZh = excerptZh
    if (excerptEn !== undefined) updates.excerptEn = excerptEn
    if (contentZh !== undefined) {
      updates.contentZh = [{ _type: 'block', children: [{ _type: 'span', text: contentZh }] }]
    }
    if (contentEn !== undefined) {
      updates.contentEn = [{ _type: 'block', children: [{ _type: 'span', text: contentEn }] }]
    }
    if (category !== undefined) updates.category = category
    if (slug !== undefined) updates.slug = { _type: 'slug', current: slug }
    if (tags !== undefined) updates.tags = tags
    if (status !== undefined) {
      updates.status = status
      if (status === 'published') {
        updates.publishedAt = new Date().toISOString()
      }
    }

    const result = await sanityWriteClient.patch(params.id).set(updates).commit()
    return NextResponse.json({ success: true, article: result })
  } catch (error) {
    console.error('Update article error:', error)
    return NextResponse.json({ error: '更新文章失败' }, { status: 500 })
  }
}

// 删除文章
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  try {
    await sanityWriteClient.delete(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: '删除文章失败' }, { status: 500 })
  }
}
