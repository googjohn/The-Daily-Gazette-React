import { useState, useEffect } from "react"

export default function useClock() {
  const [timer, setTimer] = useState('');

  const date = new Date();
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    weekday: 'long',
    day: '2-digit',
  }
  const { weekday, day, month, year } = new Intl.DateTimeFormat('default', dateOptions).formatToParts(date)
    .reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {})
  const dateToday = `${weekday} ${day}, ${month} ${year}`

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  }
  const formatter = new Intl.DateTimeFormat('default', timeOptions)

  useEffect(() => {
    let timer = setInterval(() => {
      setTimer(() => {
        return formatter.format(new Date())
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timer])
  return { dateToday, timer, formatter }
}