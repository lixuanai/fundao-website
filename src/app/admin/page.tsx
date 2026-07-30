'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ADMIN_PASSWORD = 'fundao2026admin';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('fundao_admin', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('密码错误');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      <div className="w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl shadow-lg">
            🔐
          </div>
          <h1 className="text-2xl font-bold gradient-text">FunDAO 后台管理</h1>
          <p className="text-gray-500 text-sm mt-2">请输入管理员密码</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-purple-100">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">管理员密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
              placeholder="输入密码"
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            登录
          </button>
        </form>
      </div>
    </div>
  );
}
