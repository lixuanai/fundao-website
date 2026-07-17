import Link from 'next/link'
import { DEFAULT_LANG } from '@/lib/i18n/config'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <html lang="zh-CN" className="bg-surface text-white">
      <body className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-8xl font-bold gradient-text mb-4">404</div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            页面未找到
          </h1>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            您访问的页面不存在或已被移除。
          </p>
          <Link
            href={`/${DEFAULT_LANG}`}
            className="btn-primary inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
        </div>
      </body>
    </html>
  )
}
