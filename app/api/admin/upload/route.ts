import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { sanityWriteClient } from '@/lib/sanity/admin-client'

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

export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: '未选择文件' }, { status: 400 })
    }

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: '只支持图片文件' }, { status: 400 })
    }

    // 验证文件大小 (最大 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: '文件大小不能超过 5MB' }, { status: 400 })
    }

    // 上传到 Sanity
    const buffer = Buffer.from(await file.arrayBuffer())
    const result = await sanityWriteClient.assets.upload('image', buffer, {
      filename: file.name,
      contentType: file.type,
    })

    return NextResponse.json({
      success: true,
      assetId: result._id,
      url: result.url,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: '上传失败', details: String(error) }, { status: 500 })
  }
}
