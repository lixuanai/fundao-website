export default function AgentPortalPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mesh-gradient opacity-30"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 gradient-text">
            Agent API Portal
          </h1>
          
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200/50 rounded-2xl p-6 mb-8">
            <p className="text-blue-700 font-semibold text-lg mb-2">
              Agent 操作端口已启用
            </p>
            <p className="text-gray-600 text-sm">
              外部 Agent 可以通过 API 管理文章、页面内容和系统设置。所有写操作需要 API Key 认证。
            </p>
          </div>

          <div className="prose max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">API 端点</h2>
              
              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">文章管理</h3>
              <ul className="space-y-2 text-sm">
                <li><code className="text-purple-600 bg-purple-50 px-2 py-1 rounded">POST /api/agent/articles</code> - 创建文章</li>
                <li><code className="text-purple-600 bg-purple-50 px-2 py-1 rounded">PUT /api/agent/articles/[slug]</code> - 更新文章</li>
                <li><code className="text-purple-600 bg-purple-50 px-2 py-1 rounded">DELETE /api/agent/articles/[slug]</code> - 删除文章</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">页面内容</h3>
              <ul className="space-y-2 text-sm">
                <li><code className="text-purple-600 bg-purple-50 px-2 py-1 rounded">POST /api/agent/page/[pageKey]</code> - 更新页面内容</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">系统设置</h3>
              <ul className="space-y-2 text-sm">
                <li><code className="text-purple-600 bg-purple-50 px-2 py-1 rounded">PUT /api/agent/settings/[key]</code> - 更新设置</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">认证方式</h2>
              <p>所有写操作需要在请求头中包含 API Key：</p>
              <pre className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-2xl overflow-x-auto text-sm mt-3 border border-gray-200">
                <code>{`x-api-key: your_agent_api_key`}</code>
              </pre>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">请求示例</h2>
              <pre className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-2xl overflow-x-auto text-sm mt-3 border border-gray-200">
                <code>{`// 创建文章
POST /api/agent/articles
Headers: x-api-key: fundao_agent_xxx
Body: {
  "titleZh": "文章标题",
  "titleEn": "Article Title",
  "slug": "article-slug",
  "category": "news",
  "contentZh": "中文内容",
  "contentEn": "English content",
  "published": true
}

// 更新页面内容
POST /api/agent/page/home
Headers: x-api-key: fundao_agent_xxx
Body: {
  "lang": "zh",
  "content": {
    "hero": {
      "title": "新的标题",
      "subtitle": "新的副标题"
    }
  }
}`}</code>
              </pre>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">数据模型</h2>
              
              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">文章 (Article)</h3>
              <ul className="space-y-1 text-sm">
                <li><code className="text-purple-600">titleZh</code> / <code className="text-purple-600">titleEn</code> - 中英文标题</li>
                <li><code className="text-purple-600">slug</code> - URL 标识符（唯一）</li>
                <li><code className="text-purple-600">category</code> - 分类（news/industry）</li>
                <li><code className="text-purple-600">contentZh</code> / <code className="text-purple-600">contentEn</code> - 中英文内容</li>
                <li><code className="text-purple-600">excerptZh</code> / <code className="text-purple-600">excerptEn</code> - 中英文摘要</li>
                <li><code className="text-purple-600">coverImage</code> - 封面图 URL</li>
                <li><code className="text-purple-600">tags</code> - 标签数组</li>
                <li><code className="text-purple-600">published</code> - 是否发布</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
