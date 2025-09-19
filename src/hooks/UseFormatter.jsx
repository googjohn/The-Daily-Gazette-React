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