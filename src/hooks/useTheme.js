import { useState, useEffect } from 'react'

const THEME_KEY = 'portfolio-theme-v2'

function themeByTime() {
  const hour = new Date().getHours()
  return hour >= 6 && hour < 18 ? 'light' : 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_KEY) || themeByTime()
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light'
    localStorage.setItem(THEME_KEY, next)
    setTheme(next)
  }

  return { theme, toggleTheme }
}
