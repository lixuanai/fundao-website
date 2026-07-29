export default function AgentPortalPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Agent API Portal
      </h1>
      
      <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
        <div className="bg-blue-950/30 border border-blue-800/50 rounded-lg p-6 mb-8">
          <p className="text-blue-300 font-semibold text-lg mb-2">
            Agent 操作端口已启用
          </p>
          <p className="text-gray-400 text-sm">
            外部 Agent 可以通过 API 管理文章、页面内容和系统设置。所有写操作需要 API Key 认证。
          </p>
        </div>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">API 端点</h2>
          
          <h3 className="text-lg font-medium text-white mt-6 mb-2">文章管理</h3>
          <ul className="space-y-2 text-sm">
            <li><code className="text-blue-400">POST /api/agent/articles</code> - 创建文章</li>
            <li><code className="text-blue-400">PUT /api/agent/articles/[slug]</code> - 更新文章</li>
            <li><code className="text-blue-400">DELETE /api/agent/articles/[slug]</code> - 删除文章</li>
          </ul>

          <h3 className="text-lg font-medium text-white mt-6 mb-2">页面内容</h3>
          <ul className="space-y-2 text-sm">
            <li><code className="text-blue-400">POST /api/agent/page/[pageKey]</code> - 更新页面内容</li>
          </ul>

          <h3 className="text-lg font-medium text-white mt-6 mb-2">系统设置</h3>
          <ul className="space-y-2 text-sm">
            <li><code className="text-blue-400">PUT /api/agent/settings/[key]</code> - 更新设置</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">认证方式</h2>
          <p>所有写操作需要在请求头中包含 API Key：</p>
          <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm mt-3">
            <code>{`x-api-key: your_agent_api_key`}</code>
          </pre>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">请求示例</h2>
          <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm mt-3">
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
          <h2 className="text-xl font-semibold text-white mb-3">数据模型</h2>
          
          <h3 className="text-lg font-medium text-white mt-6 mb-2">文章 (Article)</h3>
          <ul className="space-y-1 text-sm">
            <li><code>titleZh</code> / <code>titleEn</code> - 中英文标题</li>
            <li><code>slug</code> - URL 标识符（唯一）</li>
            <li><code>category</code> - 分类（news/industry）</li>
            <li><code>contentZh</code> / <code>contentEn</code> - 中英文内容</li>
            <li><code>excerptZh</code> / <code>excerptEn</code> - 中英文摘要</li>
            <li><code>coverImage</code> - 封面图 URL</li>
            <li><code>tags</code> - 标签数组</li>
            <li><code>published</code> - 是否发布</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
