import { useState } from 'react'
import Reveal from './Reveal'
import { projects } from '../data/projects'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'laravel', label: 'Laravel' },
  { key: 'wordpress', label: 'WordPress' },
  { key: 'ecommerce', label: 'E-Commerce' },
]

export default function Portfolio() {
  const [active, setActive] = useState('all')

  const visible = active === 'all'
    ? projects
    : projects.filter(p => p.tags.includes(active))

  return (
    <section id="portfolio" aria-labelledby="portfolio-heading">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-label">Work</span>
          <h2 className="section-title" id="portfolio-heading">Selected <span className="gradient-text">Work</span></h2>
          <div className="divider" aria-hidden="true" />
        </Reveal>

        <Reveal className="filter-tabs" role="group" aria-label="Filter projects by category">
          {FILTERS.map(f => (
            <button
              key={f.key}
              className={`filter-btn${active === f.key ? ' active' : ''}`}
              onClick={() => setActive(f.key)}
            >
              {f.label}
            </button>
          ))}
        </Reveal>

        <div className="portfolio-grid">
          {visible.map((project, i) => (
            <Reveal
              key={project.id}
              delay={(i % 4) || 0}
              as="article"
              className="project-card"
              aria-label={`${project.name}`}
            >
              <div className="project-bar" style={{ background: project.bar }} />
              <div className="project-body">
                <h3 className="project-name">{project.name}</h3>
                <div className="project-pills">
                  {project.pills.map((pill, j) => (
                    <span key={j} className={`pill pill-${pill.color}`}>{pill.label}</span>
                  ))}
                </div>
                <p className="project-desc">{project.desc}</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  Visit Site <span className="arrow">→</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
