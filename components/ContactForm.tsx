'use client'

import { useState } from 'react'

interface ContactFormProps {
  lang: string
  labels: {
    name: string
    email: string
    subject: string
    message: string
    submit: string
    success: string
  }
}

export function ContactForm({ lang, labels }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        const result = await res.json()
        setErrorMsg(result.error || '发送失败')
        setStatus('error')
      }
    } catch {
      setStatus('error')
      setErrorMsg('网络错误，请稍后重试')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm text-white/60 mb-2">
            {labels.name}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/50 transition-colors"
            placeholder={labels.name}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-white/60 mb-2">
            {labels.email}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/50 transition-colors"
            placeholder="name@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm text-white/60 mb-2">
          {labels.subject}
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/50 transition-colors"
          placeholder={labels.subject}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-white/60 mb-2">
          {labels.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/50 transition-colors resize-none"
          placeholder={labels.message}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-primary w-full py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? '...' : labels.submit}
      </button>

      {status === 'success' && (
        <p className="text-center text-brand-cyan text-sm">{labels.success}</p>
      )}
      {status === 'error' && (
        <p className="text-center text-red-400 text-sm">{errorMsg || 'Failed to send. Please try again.'}</p>
      )}
    </form>
  )
}
