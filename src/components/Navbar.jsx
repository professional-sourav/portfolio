import { useState, useEffect, useCallback } from 'react'
import { useScrollNav } from '../hooks/useScrollNav'
import { useScrollSpy } from '../hooks/useScrollSpy'

const NAV_SECTIONS = ['about', 'skills', 'portfolio', 'reviews', 'contact']

function scrollTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
}

export default function Navbar({ theme, onToggleTheme }) {
  const { scrolled, hidden } = useScrollNav()
  const active = useScrollSpy(NAV_SECTIONS)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') closeDrawer() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeDrawer])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  function handleNavClick(e, id) {
    e.preventDefault()
    closeDrawer()
    scrollTo(id)
  }

  return (
    <>
      <header
        id="navbar"
        role="banner"
        className={[scrolled ? 'scrolled' : '', hidden ? 'hidden' : ''].filter(Boolean).join(' ')}
      >
        <nav className="nav-inner" aria-label="Primary navigation">
          <a
            href="#hero"
            className="nav-logo"
            aria-label="Sourav Chakraborty — Home"
            onClick={e => handleNavClick(e, 'hero')}
          >
            <span className="nav-logo-badge" aria-hidden="true">SC</span>
            Sourav Chakraborty
          </a>

          <ul className="nav-links" role="list">
            {NAV_SECTIONS.map(id => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={active === id ? 'active' : ''}
                  onClick={e => handleNavClick(e, id)}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a
              href="#contact"
              className="btn-hire"
              aria-label="Hire Sourav Chakraborty"
              onClick={e => handleNavClick(e, 'contact')}
            >
              <span>Hire Me</span>
            </a>

            <button
              className="theme-toggle"
              onClick={onToggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            <button
              className={`hamburger${drawerOpen ? ' open' : ''}`}
              id="hamburger-btn"
              aria-label="Toggle navigation menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              onClick={() => setDrawerOpen(v => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`drawer-overlay${drawerOpen ? ' open' : ''}`}
        aria-hidden="true"
        onClick={closeDrawer}
      />

      <nav
        className={`mobile-drawer${drawerOpen ? ' open' : ''}`}
        id="mobile-drawer"
        aria-label="Mobile navigation"
      >
        {NAV_SECTIONS.map(id => (
          <a
            key={id}
            href={`#${id}`}
            onClick={e => handleNavClick(e, id)}
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
        <a
          href="#contact"
          className="btn btn-primary"
          style={{ marginTop: '1rem', justifyContent: 'center' }}
          onClick={e => handleNavClick(e, 'contact')}
        >
          Hire Me
        </a>
      </nav>
    </>
  )
}
