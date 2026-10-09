import { cx } from '../../lib/cx'

export type Theme = 'light' | 'dark'

interface Props {
  theme: Theme
  onTheme: () => void
  className?: string
}

export function ThemeSwitch({ theme, onTheme, className }: Props) {
  return (
    <button type="button" className={cx('theme-switch', className)} onClick={onTheme} data-cursor="Invert" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
      <span className={cx(theme === 'light' && 'on')}>W</span>
      {' / '}
      <span className={cx(theme === 'dark' && 'on')}>B</span>
    </button>
  )
}
