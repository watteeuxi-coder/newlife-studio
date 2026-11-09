'use client'

import { useState, useEffect, type FormEvent } from 'react'
import { FORMULES, formuleFromSlug, type Formule } from '@/lib/formules'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const inputClass =
  // Bordure line-strong (#8A94A3, 3,1:1) ; pas d'outline-none : le contour de focus global reste visible
  'w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-sm text-text-base placeholder:text-text-muted transition-colors focus:border-accent'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [formule, setFormule] = useState<Formule>(FORMULES[0])

  // ?formule=pro (boutons des forfaits) → présélection. Lu côté navigateur pour garder /contact statique.
  useEffect(() => {
    setFormule(formuleFromSlug(new URLSearchParams(window.location.search).get('formule')))
  }, [])

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
          formule: data.get('formule'),
          message: data.get('message'),
          company: data.get('company'),
        }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(json.error || "L'envoi a échoué — réessaie ou écris-moi sur WhatsApp.")
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
        <span className="mx-auto mb-3 flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="w-5 h-5">
            <path d="m5 13 4 4L19 7" />
          </svg>
        </span>
        <p className="text-text-base font-semibold mb-1">Message envoyé !</p>
        <p className="text-text-dim text-sm">Je te réponds sous 24h, promis.</p>
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

      {/* Label visible : un select n'a pas de placeholder pour poser la question */}
      <label className="block mb-4">
        <span className="block text-sm text-text-dim mb-2">Quelle formule t&rsquo;intéresse ?</span>
        <span className="relative block">
          <select
            name="formule"
            value={formule}
            onChange={(e) => setFormule(e.target.value as Formule)}
            className={`${inputClass} appearance-none pr-10 [&>option]:bg-night`}
          >
            {FORMULES.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </label>

      <label className="block mb-4">
        <span className="sr-only">Ton projet</span>
        <textarea
          name="message"
          required
          maxLength={5000}
          rows={4}
          placeholder="Parle-moi de ton projet (activité, objectifs, délais…)"
          className={`${inputClass} resize-none`}
        />
      </label>

      {status === 'error' && (
        <p role="alert" className="text-sm text-red-700 mb-4">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-accent text-white font-semibold hover:bg-accent-bright active:scale-[0.98] transition-all disabled:opacity-60 disabled:pointer-events-none"
      >
        {status === 'sending' ? 'Envoi en cours…' : 'Envoyer mon message'}
      </button>
    </form>
  )
}
