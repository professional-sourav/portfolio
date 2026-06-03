import Reveal from './Reveal'

const STATS = [
  { num: '8+', label: 'Years with Laravel & PHP' },
  { num: '15+', label: 'Laravel projects delivered' },
  { num: '★', label: 'Filament admin panels & custom resources' },
  { num: '1', label: 'Multi-tenant SaaS shipped (Trailmate)' },
]

export default function LaravelSpotlight() {
  return (
    <section id="laravel-spotlight" aria-labelledby="laravel-heading">
      <div className="container">
        <Reveal className="laravel-strip">

          <div>
            <div className="laravel-strip-label">Laravel &amp; Filament Specialist</div>
            <h2 className="laravel-strip-heading" id="laravel-heading">
              Laravel &amp; Filament<br /><span>are my core.</span>
            </h2>
            <p className="laravel-strip-body">
              I specialise in <strong style={{ color: 'var(--text-primary)' }}>Laravel</strong> and{' '}
              <strong style={{ color: 'var(--text-primary)' }}>Filament</strong> — building robust backends,
              rich admin panels, and production-grade SaaS products. I've also shipped a full{' '}
              <strong style={{ color: 'var(--text-primary)' }}>multi-tenant SaaS</strong> (WP Vigil),
              giving me hands-on experience with tenant isolation, per-tenant config, and scalable architecture.
            </p>
            <div className="laravel-pillrow laravel-feat-pills">
              <span className="pill pill-laravel-hero">
                <img src="https://cdn.simpleicons.org/laravel/FF2D20" width="12" height="12" alt="" aria-hidden="true" style={{ flexShrink: 0 }} /> Laravel
              </span>
              <span className="pill pill-laravel-hero">Filament Admin</span>
              <span className="pill pill-indigo">Livewire</span>
              <span className="pill pill-indigo">Laravel Sanctum</span>
              <span className="pill pill-indigo">Queues &amp; Jobs</span>
              <span className="pill pill-indigo">Eloquent ORM</span>
              <span className="pill pill-cyan">REST APIs</span>
              <span className="pill pill-cyan">Laravel Nova</span>
              <span className="pill pill-orange">Redis / Horizon</span>
              <span className="pill pill-orange">Multi-Tenant SaaS</span>
            </div>
          </div>

          <div className="laravel-stats-col">
            {STATS.map((s, i) => (
              <div key={i} className="laravel-stat-card">
                <span className="laravel-stat-num">{s.num}</span>
                <span className="laravel-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

        </Reveal>
      </div>
    </section>
  )
}
