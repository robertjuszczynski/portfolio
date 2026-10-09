const ROTATE = { ne: -45, right: 0, down: 90, left: 180, up: -90 }

export function Arrow({ dir = 'ne' }: { dir?: keyof typeof ROTATE }) {
  return (
    <svg className="arrow" viewBox="0 0 16 16" aria-hidden="true" style={{ transform: `rotate(${ROTATE[dir]}deg)` }}>
      <path d="M1.5 8h12M8.5 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  )
}
