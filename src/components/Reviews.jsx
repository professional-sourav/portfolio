import Reveal from './Reveal'
import { reviews } from '../data/reviews'

const STAR_PATH = 'M12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'

function StarRating({ rating }) {
  const full = Math.floor(rating)
  const partial = rating - full
  const gradId = `s${rating.toString().replace('.', '')}`

  return (
    <div className="review-stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#f59e0b" aria-hidden="true">
          <polygon points={STAR_PATH} />
        </svg>
      ))}
      {partial > 0 && (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id={gradId} x1="0" x2="1" y1="0" y2="0">
              <stop offset={`${partial * 100}%`} stopColor="#f59e0b" />
              <stop offset={`${partial * 100}%`} stopColor="#334155" />
            </linearGradient>
          </defs>
          <polygon points={STAR_PATH} fill={`url(#${gradId})`} />
        </svg>
      )}
      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: '4px' }}>
        {rating.toFixed(1)}
      </span>
    </div>
  )
}

export default function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-heading">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title" id="reviews-heading">What Clients <span className="gradient-text">Say</span></h2>
          <div className="divider" aria-hidden="true" />
        </Reveal>

        <div className="reviews-grid">
          {reviews.map((review, i) => (
            <Reveal key={review.id} delay={i % 3} as="article" className="review-card"
              aria-label={`Review: ${review.project}, ${review.rating} stars`}>
              <div className="review-quote-bg" aria-hidden="true">"</div>
              <StarRating rating={review.rating} />
              <p className="review-text">{review.text}</p>
              <div className="review-meta">
                <span className="review-project">{review.project}</span>
                <span className="review-date">{review.date}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
