import Reveal from './Reveal'

const SKILLS = [
  {
    type: 'backend',
    title: 'Backend',
    sub: 'Server-side & APIs',
    badge: <span className="laravel-badge">★ Core Specialty</span>,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/>
        <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
      </svg>
    ),
    pills: [
      { label: <><img src="https://cdn.simpleicons.org/laravel/FF2D20" width="12" height="12" alt="" aria-hidden="true" style={{flexShrink:0}}/> Laravel</>, cls: 'pill-laravel-hero' },
      { label: 'Multi-Tenant SaaS', cls: 'pill-laravel-hero' },
      { label: 'PHP', cls: 'pill-indigo' },
      { label: 'Python', cls: 'pill-indigo' },
      { label: 'Node.js', cls: 'pill-indigo' },
      { label: 'REST APIs', cls: 'pill-indigo' },
      { label: 'GraphQL', cls: 'pill-indigo' },
      { label: 'CodeIgniter', cls: 'pill-indigo' },
    ],
  },
  {
    type: 'frontend',
    title: 'Frontend',
    sub: 'UI & interactivity',
    badge: (
      <span className="react-badge">
        <img src="https://cdn.simpleicons.org/react/61DAFB" width="11" height="11" alt="" aria-hidden="true" style={{flexShrink:0}}/> React · 3 yrs
      </span>
    ),
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#67e8f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    pills: [
      { label: 'JavaScript', cls: 'pill-cyan' },
      { label: 'Vue.js', cls: 'pill-cyan' },
      { label: <><img src="https://cdn.simpleicons.org/react/61DAFB" width="12" height="12" alt="" aria-hidden="true" style={{flexShrink:0}}/> React.js <span className="pill-years">3 yrs</span></>, cls: 'pill-react-hero' },
      { label: 'Next.js', cls: 'pill-cyan' },
      { label: 'Tailwind CSS', cls: 'pill-cyan' },
      { label: 'Livewire', cls: 'pill-cyan' },
      { label: 'Alpine.js', cls: 'pill-cyan' },
    ],
  },
  {
    type: 'cms',
    title: 'CMS & E-Commerce',
    sub: 'Content & commerce',
    badge: null,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d8b4fe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    pills: [
      { label: 'WordPress', cls: 'pill-purple' },
      { label: 'WooCommerce', cls: 'pill-purple' },
      { label: 'Elementor', cls: 'pill-purple' },
      { label: 'Thrive Themes', cls: 'pill-purple' },
      { label: 'Divi', cls: 'pill-purple' },
      { label: 'ACF', cls: 'pill-purple' },
    ],
  },
  {
    type: 'devops',
    title: 'DevOps & Cloud',
    sub: 'Infrastructure & CI/CD',
    badge: (
      <span className="n8n-badge">
        <img src="https://cdn.simpleicons.org/n8n/EA4B71" width="11" height="11" alt="" aria-hidden="true" style={{flexShrink:0}}/> n8n Automation
      </span>
    ),
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fdba74" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
      </svg>
    ),
    pills: [
      { label: <><img src="https://cdn.simpleicons.org/n8n/EA4B71" width="12" height="12" alt="" aria-hidden="true" style={{flexShrink:0}}/>&nbsp; n8n Automation</>, cls: 'pill-n8n-hero' },
      { label: 'AWS EC2', cls: 'pill-orange' },
      { label: 'AWS S3', cls: 'pill-orange' },
      { label: 'AWS RDS', cls: 'pill-orange' },
      { label: 'AWS Lambda', cls: 'pill-orange' },
      { label: 'Docker', cls: 'pill-orange' },
      { label: 'GitHub Actions', cls: 'pill-orange' },
      { label: 'Redis', cls: 'pill-orange' },
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-label">Tech Stack</span>
          <h2 className="section-title" id="skills-heading">My <span className="gradient-text">Arsenal</span></h2>
          <div className="divider" aria-hidden="true" />
        </Reveal>

        <div className="skills-grid">
          {SKILLS.map((skill, i) => (
            <Reveal key={skill.type} delay={i + 1} className={`skill-card skill-card-${skill.type}`}>
              <div className="skill-card-header">
                <div className={`skill-icon skill-icon-${skill.type}`} aria-hidden="true">
                  {skill.icon}
                </div>
                <div className="skill-header-text">
                  <div className="skill-card-title">{skill.title}</div>
                  <div className="skill-card-sub">{skill.sub}</div>
                  {skill.badge}
                </div>
              </div>
              <div className="skill-pills">
                {skill.pills.map((pill, j) => (
                  <span key={j} className={`pill ${pill.cls}`}>{pill.label}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
