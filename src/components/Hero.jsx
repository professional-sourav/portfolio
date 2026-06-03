import { useState } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'

async function downloadResume(setStatus) {
  setStatus('loading')
  try {
    const res = await fetch('my-resume.pdf', { cache: 'no-store' })
    if (!res.ok) throw new Error('not found')
    const blob = await res.blob()
    if (blob.type && !blob.type.includes('pdf')) throw new Error('invalid type')
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Sourav_Chakraborty_Resume.pdf'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(url), 10000)
  } catch {
    alert('Resume download is temporarily unavailable. Please try again later.')
  } finally {
    setStatus('idle')
  }
}

export default function Hero() {
  const typeText = useTypewriter()
  const [resumeStatus, setResumeStatus] = useState('idle')

  return (
    <section id="hero" aria-labelledby="hero-heading">
      <div className="container">
        <div className="hero-grid">

          {/* Left column */}
          <div className="hero-text-col">
            <div className="hero-badge" aria-label="Currently available for work">
              <span className="pulse-dot" aria-hidden="true" />
              Available for Work ✦
            </div>

            <h1 className="hero-h1" id="hero-heading">
              Full-Stack<br />
              <span className="gradient-text">Developer</span>
            </h1>

            <div className="hero-typewriter-wrap" aria-live="polite" aria-atomic="true">
              <span className="typewriter-text">{typeText}</span>
              <span className="cursor" aria-hidden="true" />
            </div>

            <p className="hero-bio">
              8+ years building <strong>high-traffic web apps</strong>, SaaS platforms, and scalable APIs.
              Deep specialist in <strong>Laravel &amp; Filament</strong> — including a multi-tenant SaaS.
              Core stack: <strong>PHP · Laravel · WordPress · Python · React.js · Node.js</strong>
            </p>

            <div className="hero-ctas">
              <a href="#portfolio" className="btn btn-primary"
                onClick={e => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }) }}>
                View My Work
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
              <button
                className="btn btn-outline"
                disabled={resumeStatus === 'loading'}
                onClick={() => downloadResume(setResumeStatus)}
              >
                <span className="btn-label">
                  {resumeStatus === 'loading' ? 'Preparing…' : 'Download CV'}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </button>
            </div>

            <div className="hero-stats" role="list" aria-label="Career highlights">
              <div className="stat-item" role="listitem">
                <span className="stat-value">8+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-divider" aria-hidden="true" />
              <div className="stat-item" role="listitem">
                <span className="stat-value">50+</span>
                <span className="stat-label">Projects Delivered</span>
              </div>
              <div className="stat-divider" aria-hidden="true" />
              <div className="stat-item" role="listitem">
                <span className="stat-value">5★</span>
                <span className="stat-label">Client Reviews</span>
              </div>
            </div>
          </div>

          {/* Right column — photo */}
          <div className="hero-photo-col" aria-hidden="true">
            <div className="photo-ring-wrap">
              <div className="photo-ring" />
              <div className="photo-inner">
                <img
                  src={`${import.meta.env.BASE_URL}sourav-chakraborty-portrait.jpg`}
                  alt="Sourav Chakraborty — Full-Stack Developer"
                  loading="eager"
                  onError={e => { e.currentTarget.parentElement.style.background = 'linear-gradient(135deg,#6366f1,#06b6d4)' }}
                />
              </div>
              <span className="float-badge badge-php">
                <img src="https://cdn.simpleicons.org/php/777BB4" width="14" height="14" alt="" aria-hidden="true" /> PHP
              </span>
              <span className="float-badge badge-laravel">
                <img src="https://cdn.simpleicons.org/laravel/FF2D20" width="14" height="14" alt="" aria-hidden="true" /> Laravel
              </span>
              <span className="float-badge badge-wp">
                <img src="https://cdn.simpleicons.org/wordpress/21759B" width="14" height="14" alt="" aria-hidden="true" /> WordPress
              </span>
              <span className="float-badge badge-python">
                <img src="https://cdn.simpleicons.org/python/3776AB" width="14" height="14" alt="" aria-hidden="true" /> Python
              </span>
              <span className="float-badge badge-react">
                <img src="https://cdn.simpleicons.org/react/61DAFB" width="14" height="14" alt="" aria-hidden="true" /> React
              </span>
              <span className="float-badge badge-n8n">
                <img src="https://cdn.simpleicons.org/n8n/EA4B71" width="14" height="14" alt="" aria-hidden="true" /> n8n
              </span>
              <span className="float-badge badge-aws">
                <AwsIcon /> AWS
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function AwsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#FF9900" aria-hidden="true">
      <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.918 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.15 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.743.167-1.166.167zM21.698 16.207c-2.626 1.94-6.442 2.97-9.722 2.97-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.352 3.384 1.963 7.559 3.147 11.877 3.147 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.613zm1.092-1.244c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z"/>
    </svg>
  )
}
