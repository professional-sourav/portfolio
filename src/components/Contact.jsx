import { useState } from 'react'
import Reveal from './Reveal'

const ACCESS_KEY = 'a27f9195-3c73-45b6-a726-de04989c7289'

const SOCIALS = [
  {
    cls: 'linkedin',
    href: 'https://linkedin.com/in/iamsouravch',
    label: 'LinkedIn — iamsouravch',
    iconBg: 'rgba(10,102,194,0.15)',
    name: 'LinkedIn',
    handle: 'iamsouravch',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#0a66c2">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    cls: 'github',
    href: 'https://github.com/professional-sourav',
    label: 'GitHub — professional-sourav',
    iconBg: 'rgba(255,255,255,0.07)',
    name: 'GitHub',
    handle: 'professional-sourav',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#e2e8f0">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
  },
  {
    cls: 'upwork',
    href: 'https://www.upwork.com/freelancers/souravthedeveloper',
    label: 'Upwork — souravthedeveloper',
    iconBg: 'rgba(20,163,84,0.12)',
    name: 'Upwork',
    handle: 'souravthedeveloper',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#14a354">
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.543-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.452-5.439-5.452z"/>
      </svg>
    ),
  },
  {
    cls: 'gmail',
    href: 'mailto:professional.sourav@gmail.com',
    label: 'Gmail — professional.sourav@gmail.com',
    iconBg: 'rgba(234,67,53,0.12)',
    name: 'Gmail',
    handle: 'professional.sourav',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="#ea4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
]

export default function Contact() {
  const [fields, setFields] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  function handleChange(e) {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const { name, email, message } = fields
    if (!name.trim() || !email.trim() || !message.trim()) return

    setStatus('loading')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Portfolio enquiry from ${name}`,
          from_name: name,
          name,
          email,
          message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setFields({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 7000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title" id="contact-heading">
            Let's Build <span className="gradient-text">Something</span>
          </h2>
          <div className="divider" aria-hidden="true" />
        </Reveal>

        <div className="contact-grid">

          <Reveal>
            <p className="contact-subtitle">Open to freelance, contract, and full-time opportunities.</p>
            <div className="social-cards" role="list">
              {SOCIALS.map(s => (
                <a
                  key={s.cls}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={s.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className={`social-card ${s.cls}`}
                  role="listitem"
                  aria-label={s.label}
                >
                  <div className="social-icon" style={{ background: s.iconBg }} aria-hidden="true">
                    {s.icon}
                  </div>
                  <div>
                    <div className="social-name">{s.name}</div>
                    <div className="social-handle">{s.handle}</div>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={2}>
            <form
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={fields.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={fields.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={fields.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project…"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ alignSelf: 'flex-start' }}
                disabled={status === 'loading'}
              >
                <span className="btn-label">
                  {status === 'loading' ? 'Sending…' : 'Send Message'}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>

              {status === 'success' && (
                <div className="form-success" role="alert" aria-live="polite">
                  ✓ Message sent! I'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="form-error" role="alert" aria-live="polite">
                  ✗ Something went wrong. Please try again or email me directly.
                </div>
              )}
            </form>
          </Reveal>

        </div>
      </div>
    </section>
  )
}
