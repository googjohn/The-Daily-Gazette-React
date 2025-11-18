import { useState, useEffect } from "react"

export default function useFormatter(date, options = { dateStyle: 'full' }) {
  const [formattedDate, setFormattedDate] = useState(date)

  useEffect(() => {
    if (!isNaN(date)) {
      const formatter = new Intl.DateTimeFormat('default', options)

      setFormattedDate(formatter.format(date).toString())
    }
  }, [date, options])

  return formattedDate.toString()
}

export function formatDate(date, options = { dateStyle: 'full' }) {
  const formatter = new Intl.DateTimeFormat('default', options)
  const newDate = new Date(date)
  return formatter.format(newDate)
}