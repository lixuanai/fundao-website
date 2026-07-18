'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Article {
  _id: string
  titleZh: string
  titleEn?: string
  slug: { current: string }
  category: 'news' | 'industry'
  status: 'draft' | 'published'
  publishedAt: string
  tags?: string[]
}

export default function ArticlesList() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/admin/articles')
      if (res.status === 401) {
        router.push('/admin/login')
        return
      }
      if (!res.ok) throw new Error('获取失败')
      const data = await res.json()
      setArticles(data.articles || [])
    } catch {
      setError('获取文章列表失败')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('确定删除这篇文章？')) return

    try {
      const res = await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setArticles(articles.filter(a => a._id !== id))
      } else {
        alert('删除失败')
      }
    } catch {
      alert('删除失败')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-gray-400">加载中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">FunDAO 文章管理</h1>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/articles/new"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              新建文章
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
            >
              返回前台
            </Link>
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

        {articles.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            还没有文章，点击「新建文章」开始发布
          </div>
        ) : (
          <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">标题</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">分类</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">状态</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">发布时间</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {articles.map((article) => (
                  <tr key={article._id} className="hover:bg-gray-800/50">
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/articles/${article._id}`}
                        className="text-white hover:text-blue-400 font-medium"
                      >
                        {article.titleZh}
                      </Link>
                      {article.titleEn && article.titleEn !== article.titleZh && (
                        <div className="text-sm text-gray-500 mt-1">{article.titleEn}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded ${
                        article.category === 'news'
                          ? 'bg-blue-900/50 text-blue-300'
                          : 'bg-purple-900/50 text-purple-300'
                      }`}>
                        {article.category === 'news' ? '新闻' : '行业'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded ${
                        article.status === 'published'
                          ? 'bg-green-900/50 text-green-300'
                          : 'bg-yellow-900/50 text-yellow-300'
                      }`}>
                        {article.status === 'published' ? '已发布' : '草稿'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-400">
                      {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('zh-CN') : '-'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/articles/${article._id}`}
                        className="text-blue-400 hover:text-blue-300 text-sm mr-3"
                      >
                        编辑
                      </Link>
                      <button
                        onClick={() => handleDelete(article._id)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
