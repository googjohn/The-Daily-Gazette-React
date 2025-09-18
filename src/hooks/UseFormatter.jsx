import { useState, useEffect } from "react"

export default function useFormatter(date, options = { dateStyle: 'full' }) {
  const [formattedDate, setFormattedDate] = useState(date)

  useEffect(() => {
    const datenow = new Date(date)
    if (!isNaN(datenow)) {
      const formatter = new Intl.DateTimeFormat('default', options)

      setFormattedDate(formatter.format(datenow).toString())
    }
  }, [date, options])

  return formattedDate
}