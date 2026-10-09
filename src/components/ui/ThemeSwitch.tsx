export type Theme = 'light' | 'dark'

interface Props {
  theme: Theme
  onTheme: () => void
  className?: string
}

export function ThemeSwitch({ theme, onTheme, className = '' }: Props) {
  return (
    <button className={`theme-switch ${className}`} onClick={onTheme} data-cursor="Invert" aria-label="Toggle colour theme">
      <span className={theme === 'light' ? 'on' : ''}>W</span>
      {' / '}
      <span className={theme === 'dark' ? 'on' : ''}>B</span>
    </button>
  )
}
