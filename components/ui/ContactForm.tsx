'use client'

import { useState, type FormEvent } from 'react'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-text-base placeholder:text-text-muted outline-none transition-colors focus:border-accent/50 focus:bg-white/[0.06]'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('sending')
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          contact: data.get('contact'),
          message: data.get('message'),
          company: data.get('company'),
        }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(json.error || "L'envoi a échoué — réessaie ou écris-nous sur WhatsApp.")
      }
      setStatus('sent')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
    }
  }

  if (status === 'sent') {
    return (
      <div
        role="status"
        className="rounded-xl border border-accent/30 bg-accent/[0.06] px-6 py-8 text-center"
      >
        <div className="text-2xl mb-2">✅</div>
        <p className="text-text-base font-semibold mb-1">Message envoyé !</p>
        <p className="text-text-dim text-sm">On te répond sous 24h, promis.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="text-left">
      {/* Honeypot anti-spam — caché aux humains */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <label className="block">
          <span className="sr-only">Ton nom</span>
          <input
            type="text"
            name="name"
            required
            maxLength={100}
            placeholder="Ton nom"
            autoComplete="name"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="sr-only">Email ou téléphone</span>
          <input
            type="text"
            name="contact"
            required
            maxLength={200}
            placeholder="Email ou téléphone"
            autoComplete="email"
            className={inputClass}
          />
        </label>
      </div>

      <label className="block mb-4">
        <span className="sr-only">Ton projet</span>
        <textarea
          name="message"
          required
          maxLength={5000}
          rows={4}
          placeholder="Parle-nous de ton projet (activité, objectifs, délais…)"
          className={`${inputClass} resize-none`}
        />
      </label>

      {status === 'error' && (
        <p role="alert" className="text-sm text-red-400 mb-4">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-accent text-void font-semibold hover:bg-accent-bright active:scale-[0.98] transition-all disabled:opacity-60 disabled:pointer-events-none"
      >
        {status === 'sending' ? 'Envoi en cours…' : 'Envoyer mon message'}
      </button>
    </form>
  )
}
