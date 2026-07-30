'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Article {
  id: string;
  title_zh: string;
  title_en: string;
  slug: string;
  category: string;
  excerpt_zh: string;
  excerpt_en: string;
  content_zh: string;
  content_en: string;
  published: number;
  created_at: string;
  updated_at: string;
}

const ADMIN_API_KEY = 'fundao_agent_8caa8e1209a44a05a0a0e5f990a6a577';

type Tab = 'articles';

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('articles');
  const [articles, setArticles] = useState<Article[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState({
    title_zh: '', title_en: '', slug: '', category: '项目动态',
    content_zh: '', content_en: '', excerpt_zh: '', excerpt_en: '', published: true
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const auth = sessionStorage.getItem('fundao_admin');
    if (!auth) { router.push('/admin'); return; }
    loadData();
  }, [tab]);

  const loadData = async () => {
    const res = await fetch('/api/articles');
    setArticles(await res.json());
  };

  const handleSave = async () => {
    setStatus('saving...');
    const method = editingArticle ? 'PUT' : 'POST';
    const url = editingArticle ? '/api/articles/' + editingArticle.slug : '/api/articles';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'x-api-key': ADMIN_API_KEY },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      setStatus('saved!');
      setShowForm(false);
      setEditingArticle(null);
      setFormData({ title_zh: '', title_en: '', slug: '', category: '项目动态', content_zh: '', content_en: '', excerpt_zh: '', excerpt_en: '', published: true });
      loadData();
      setTimeout(() => setStatus(''), 2000);
    } else {
      setStatus('error');
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('确定删除这篇文章？')) return;
    const res = await fetch('/api/articles/' + slug, { method: 'DELETE', headers: { 'x-api-key': ADMIN_API_KEY } });
    if (res.ok) loadData();
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title_zh: article.title_zh,
      title_en: article.title_en,
      slug: article.slug,
      category: article.category,
      content_zh: article.content_zh,
      content_en: article.content_en,
      excerpt_zh: article.excerpt_zh || '',
      excerpt_en: article.excerpt_en || '',
      published: article.published === 1,
    });
    setShowForm(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('fundao_admin');
    router.push('/admin');
  };

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'articles', label: '文章管理', icon: '📝' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      <header className="bg-white/80 backdrop-blur-xl border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl">️</div>
            <h1 className="text-xl font-bold gradient-text">FunDAO 后台管理</h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="/zh" target="_blank" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">查看网站 →</a>
            <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-700 transition-colors">退出</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-2 mb-6 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => { setTab(t.key); setShowForm(false); setEditingArticle(null); }}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                tab === t.key
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-300'
              }`}
            >
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {tab === 'articles' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">共 {articles.length} 篇文章</h2>
              <button
                onClick={() => { setShowForm(true); setEditingArticle(null); setFormData({ title_zh: '', title_en: '', slug: '', category: '项目动态', content_zh: '', content_en: '', excerpt_zh: '', excerpt_en: '', published: true }); }}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-xl shadow hover:shadow-lg transition-all"
              >
                + 新建文章
              </button>
            </div>

            {showForm && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">{editingArticle ? '编辑文章' : '新建文章'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">标题（中文）</label>
                    <input value={formData.title_zh} onChange={e => setFormData({...formData, title_zh: e.target.value})} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">标题（英文）</label>
                    <input value={formData.title_en} onChange={e => setFormData({...formData, title_en: e.target.value})} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug（URL）</label>
                    <input value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-400">
                      <option>行业新闻</option>
                      <option>生态合作</option>
                      <option>项目动态</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">摘要（中文）</label>
                    <input value={formData.excerpt_zh} onChange={e => setFormData({...formData, excerpt_zh: e.target.value})} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">摘要（英文）</label>
                    <input value={formData.excerpt_en} onChange={e => setFormData({...formData, excerpt_en: e.target.value})} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-400" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">内容（中文）</label>
                    <textarea value={formData.content_zh} onChange={e => setFormData({...formData, content_zh: e.target.value})} rows={6} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-400 resize-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">内容（英文）</label>
                    <textarea value={formData.content_en} onChange={e => setFormData({...formData, content_en: e.target.value})} rows={6} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-400 resize-none" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="published" checked={formData.published} onChange={e => setFormData({...formData, published: e.target.checked})} className="w-4 h-4 text-purple-600 rounded" />
                    <label htmlFor="published" className="text-sm text-gray-700">发布</label>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button onClick={handleSave} className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-xl shadow hover:shadow-lg transition-all">
                    {status === 'saving...' ? '保存中...' : status === 'saved!' ? '已保存 ✓' : '保存'}
                  </button>
                  <button onClick={() => { setShowForm(false); setEditingArticle(null); }} className="px-6 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-200 transition-all">
                    取消
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {articles.map((article) => (
                <div key={article.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-purple-200 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={'text-xs px-2 py-0.5 rounded-full font-medium ' + (article.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500')}>
                          {article.published ? '已发布' : '草稿'}
                        </span>
                        <span className="text-xs text-gray-400">{article.category}</span>
                        <span className="text-xs text-gray-400">{article.created_at?.split('T')[0]}</span>
                      </div>
                      <h3 className="text-base font-semibold text-gray-800">{article.title_zh}</h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">{article.excerpt_zh}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button onClick={() => handleEdit(article)} className="px-3 py-1.5 text-xs text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all">编辑</button>
                      <button onClick={() => handleDelete(article.slug)} className="px-3 py-1.5 text-xs text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-all">删除</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
