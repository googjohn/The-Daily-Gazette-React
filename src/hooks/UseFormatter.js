import { useState, useEffect } from "react"

export default function useFormatter(date, options = { dateStyle: 'full' }) {
  const [formattedDate, setFormattedDate] = useState(date)

  useEffect(() => {
    let userLocale = typeof window !== 'undefined'
      ? navigator.language
      : undefined

    const newDate = new Date(date)
    if (!isNaN(newDate.getTime())) {
      const formatter = new Intl.DateTimeFormat(userLocale, options)

      setFormattedDate(formatter.format(date).toString())
    }
  }, [date, options])

  return formattedDate.toString()
}

export function formatDate(date, options = { dateStyle: 'full' }) {
  let userLocale = typeof window !== 'undefined'
    ? navigator.language
    : undefined

  const newDate = new Date(date)
  if (isNaN(newDate.getTime())) {
    console.error(`Invalid date input: Cannot format "${date}".`)
    return 'N/A'
  }
  const formatter = new Intl.DateTimeFormat(userLocale, options)
  return formatter.format(newDate)
}