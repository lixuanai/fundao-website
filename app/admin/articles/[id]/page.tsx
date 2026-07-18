'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Article {
  _id: string
  titleZh: string
  titleEn?: string
  excerptZh?: string
  excerptEn?: string
  contentZh?: any[]
  contentEn?: any[]
  category: 'news' | 'industry'
  slug: { current: string }
  tags?: string[]
  status: 'draft' | 'published'
  publishedAt?: string
}

export default function EditArticle({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [article, setArticle] = useState<Article | null>(null)

  const [form, setForm] = useState({
    titleZh: '',
    titleEn: '',
    excerptZh: '',
    excerptEn: '',
    contentZh: '',
    contentEn: '',
    category: 'news' as 'news' | 'industry',
    slug: '',
    tags: '',
    status: 'draft' as 'draft' | 'published',
  })

  useEffect(() => {
    fetchArticle()
  }, [params.id])

  const fetchArticle = async () => {
    try {
      const res = await fetch(`/api/admin/articles/${params.id}`)
      if (res.status === 401) {
        router.push('/admin/login')
        return
      }
      if (!res.ok) throw new Error('获取失败')
      const data = await res.json()
      const a = data.article

      // Convert Portable Text to plain text for editing
      const contentZh = a.contentZh?.map((b: any) =>
        b.children?.map((c: any) => c.text).join('') || ''
      ).join('\n\n') || ''

      const contentEn = a.contentEn?.map((b: any) =>
        b.children?.map((c: any) => c.text).join('') || ''
      ).join('\n\n') || ''

      setArticle(a)
      setForm({
        titleZh: a.titleZh || '',
        titleEn: a.titleEn || '',
        excerptZh: a.excerptZh || '',
        excerptEn: a.excerptEn || '',
        contentZh,
        contentEn,
        category: a.category || 'news',
        slug: a.slug?.current || '',
        tags: a.tags?.join(', ') || '',
        status: a.status || 'draft',
      })
    } catch {
      setError('获取文章失败')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const res = await fetch(`/api/admin/articles/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        }),
      })

      if (res.ok) {
        alert('保存成功')
        if (form.status === 'published') {
          router.push('/admin/articles')
        }
      } else {
        const data = await res.json()
        setError(data.error || '保存失败')
      }
    } catch {
      setError('网络错误')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-gray-400">加载中...</div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-red-400">文章不存在</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">编辑文章</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
            >
              {showPreview ? '隐藏预览' : '显示预览'}
            </button>
            <button
              onClick={() => router.push('/admin/articles')}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
            >
              返回列表
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-900/50 border border-red-800 rounded-lg text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">基本信息</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  中文标题 *
                </label>
                <input
                  type="text"
                  value={form.titleZh}
                  onChange={(e) => handleChange('titleZh', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  英文标题
                </label>
                <input
                  type="text"
                  value={form.titleEn}
                  onChange={(e) => handleChange('titleEn', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  分类 *
                </label>
                <select
                  value={form.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="news">新闻</option>
                  <option value="industry">行业资讯</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  URL Slug *
                </label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  标签（逗号分隔）
                </label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => handleChange('tags', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="DeFi, AI, 趋势"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  状态 *
                </label>
                <select
                  value={form.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="draft">草稿</option>
                  <option value="published">立即发布</option>
                </select>
              </div>
            </div>
          </div>

          {/* Excerpts */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">摘要</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  中文摘要
                </label>
                <textarea
                  value={form.excerptZh}
                  onChange={(e) => handleChange('excerptZh', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  英文摘要
                </label>
                <textarea
                  value={form.excerptEn}
                  onChange={(e) => handleChange('excerptEn', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">正文（Markdown）</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  中文内容
                </label>
                <textarea
                  value={form.contentZh}
                  onChange={(e) => handleChange('contentZh', e.target.value)}
                  rows={20}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {showPreview && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    预览
                  </label>
                  <div className="w-full h-full min-h-[400px] px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white prose prose-invert overflow-auto">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {form.contentZh || '*暂无内容*'}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                英文内容（可选）
              </label>
              <textarea
                value={form.contentEn}
                onChange={(e) => handleChange('contentEn', e.target.value)}
                rows={10}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => router.push('/admin/articles')}
              className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white font-medium rounded-lg transition-colors"
            >
              {saving ? '保存中...' : '保存'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
