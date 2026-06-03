import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds, threshold = 0.4) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold }
    )

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })

    return () => obs.disconnect()
  }, [sectionIds, threshold])

  return active
}
