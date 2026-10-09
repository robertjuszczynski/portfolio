import { scrollToTarget } from '../../lib/scroll'
import { Arrow } from './Arrow'

export const AVAILABLE = false

export function Status({ className = '' }: { className?: string }) {
  return (
    <button className={`status wipe ${AVAILABLE ? 'is-open' : ''} ${className}`} onClick={() => scrollToTarget('#contact')}>
      <span className="status-dot" aria-hidden="true"><i /></span>
      <span className="status-text">
        {AVAILABLE ? 'Available for new work' : 'Booked for now'}
        <span className="muted">{AVAILABLE ? 'Let’s talk' : 'Ask anyway'} <Arrow dir="right" /></span>
      </span>
    </button>
  )
}
