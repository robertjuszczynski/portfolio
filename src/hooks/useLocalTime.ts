import { useEffect, useState } from 'react'

const format = () =>
  new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Warsaw' }).format(new Date())

export function useLocalTime() {
  const [time, setTime] = useState(format)

  useEffect(() => {
    const id = setInterval(() => setTime(format()), 10000)
    return () => clearInterval(id)
  }, [])

  return time
}
