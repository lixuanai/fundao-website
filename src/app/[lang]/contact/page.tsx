'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ContactPage() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-20">
      <div className="absolute inset-0 mesh-gradient opacity-30 pointer-events-none"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-16">
          <span className="tag-cyan mb-4 inline-block">{t('contactBadge')}</span>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4">
            <span className="gradient-text">{t('title')}</span>
          </h1>
          <p className="text-gray-500 text-base sm:text-lg">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
          {/* Form */}
          <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8">{t('form.submit')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                  placeholder={t('form.namePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                  placeholder={t('form.emailPlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('form.subject')}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                  placeholder={t('form.subjectPlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all resize-none"
                  placeholder={t('form.messagePlaceholder')}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full btn-gradient shimmer-btn text-white font-bold py-4 rounded-xl disabled:opacity-50"
              >
                {status === 'sending' ? t('common.sending', { default: 'Sending...' }) : t('form.submit')}
              </button>

              {status === 'success' && (
                <p className="text-green-600 text-sm font-medium text-center">{t('form.success')}</p>
              )}
              {status === 'error' && (
                <p className="text-red-500 text-sm font-medium text-center">{t('form.error')}</p>
              )}
            </form>
          </div>

          {/* Contact info side */}
          <div className="space-y-6">
            {/* Contact cards */}
            <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">{t('contactInfo')}</h2>
              <div className="space-y-4 sm:space-y-5">
                {[
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                    label: 'Email',
                    value: 'contact@fundao.org',
                    href: 'mailto:contact@fundao.org',
                    gradient: 'from-purple-500 to-purple-600',
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                    ),
                    label: 'Telegram',
                    value: '@fundaofun',
                    href: 'https://t.me/fundaofun',
                    gradient: 'from-cyan-500 to-cyan-600',
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                    ),
                    label: 'Discord',
                    value: 'FunDAO Community',
                    href: 'https://discord.gg/fundao',
                    gradient: 'from-pink-500 to-pink-600',
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.032zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.969-.982z"/></svg>
                    ),
                    label: 'WeChat',
                    value: 'FunDAO_Official',
                    href: '#',
                    gradient: 'from-green-500 to-green-600',
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654L3.111 24l4.63-2.315A13.17 13.17 0 0012 22.222c6.627 0 12-4.974 12-11.111S18.627 0 12 0zm0 20c-1.396 0-2.74-.248-3.98-.7l-.28-.104-2.72 1.36.73-2.67-.18-.28C3.96 15.34 3 13.28 3 11.111 3 6.08 7.03 2 12 2s9 4.08 9 9.111S16.97 20 12 20z"/></svg>
                    ),
                    label: 'QQ',
                    value: 'FunDAO',
                    href: '#',
                    gradient: 'from-blue-500 to-blue-600',
                  },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 rounded-xl hover:bg-purple-50/50 transition-all group"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">{item.label}</div>
                      <div className="text-gray-800 font-medium group-hover:text-purple-600 transition-colors">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick response card */}
            <div className="relative rounded-3xl p-8 overflow-hidden">
              <div className="absolute inset-0 animated-gradient-bg opacity-90"></div>
              <div className="relative">
                <h3 className="text-xl font-bold text-white mb-3">{t('quickResponse')}</h3>
                <p className="text-white/80 leading-relaxed">
                  {t('quickResponseDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
