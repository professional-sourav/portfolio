import { useState, useEffect, useRef } from 'react'

export function useScrollNav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScroll = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    function update() {
      const cur = window.scrollY
      setScrolled(cur > 80)
      setHidden(cur > lastScroll.current && cur > 200)
      lastScroll.current = cur <= 0 ? 0 : cur
      ticking.current = false
    }

    function onScroll() {
      if (!ticking.current) {
        requestAnimationFrame(update)
        ticking.current = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { scrolled, hidden }
}
