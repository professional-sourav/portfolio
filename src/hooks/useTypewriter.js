import { useState, useEffect, useRef } from 'react'

const PHRASES = [
  'Laravel Specialist',
  'Filament Expert',
  'React Developer',
  'n8n Automation Expert',
  'WordPress Expert',
  'API Architect',
]

export function useTypewriter(delay = 900) {
  const [text, setText] = useState('')
  const state = useRef({ pi: 0, ci: 0, deleting: false })

  useEffect(() => {
    let timer

    function tick() {
      const { pi, ci, deleting } = state.current
      const phrase = PHRASES[pi]

      const next = deleting ? phrase.slice(0, ci - 1) : phrase.slice(0, ci + 1)
      setText(next)

      if (!deleting && ci + 1 === phrase.length) {
        state.current = { pi, ci: ci + 1, deleting: true }
        timer = setTimeout(tick, 2000)
        return
      }

      if (deleting && ci - 1 === 0) {
        state.current = { pi: (pi + 1) % PHRASES.length, ci: 0, deleting: false }
      } else {
        state.current = { pi, ci: deleting ? ci - 1 : ci + 1, deleting }
      }

      timer = setTimeout(tick, deleting ? 55 : 90)
    }

    timer = setTimeout(tick, delay)
    return () => clearTimeout(timer)
  }, [delay])

  return text
}
