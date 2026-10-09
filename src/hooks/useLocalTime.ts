import { useEffect, useState } from 'react'

const formatter = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Warsaw' })
const now = () => formatter.format(new Date())

export function useLocalTime() {
  const [time, setTime] = useState(now)

  useEffect(() => {
    const id = window.setInterval(() => setTime(now()), 10_000)
    return () => window.clearInterval(id)
  }, [])

  return time
}
