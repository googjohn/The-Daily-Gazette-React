import { useState, useEffect } from "react";

export default function Home() {
  const [timer, setTimer] = useState('')
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
    }, 1000);
    return () => clearInterval(timer)
  }, [timer]);

  return (
    <section id="world-news" className="min-h-screen max-w-[1280px] w-11/12 p-2.5 mx-auto border mt-20 mb-5z">
      <div className="container m-auto">
        <div id="weather-container"></div>
        <div id="salutation-date" className="flex justify-between items-center min-w-full mb-1.5 m-auto">
          <div id="salutation" className="text-black">
            <h1 className="text-[1.6rem] text-(--red)">Welcome to The Daily Gazette!</h1>
          </div>
          <div id="date-time" className="text-(--gray-50) flex gap-2.5">
            <span className="date-today">{dateToday}</span>
            <span className="time-now">{`${timer || formatter.format(new Date())}`}</span>
          </div>
        </div>
        <div id="head-news" className="text-black w-full h-full">
          <div className="grid grid-template grid-area-1 h-full w-full [&>*]:border">
            <div className=""></div>
            <div className="grid grid-template grid-area-2">
              <div className="w-full border h-full"></div>
              <div className="w-full border h-full"></div>
              <div className="w-full border h-full"></div>
              <div className="w-full border h-full"></div>
            </div>
          </div>
        </div>
        <div id="trending-news" className="text-black w-full h-full">
          <div className="section-title">
            <h2>Trending</h2>
          </div>
          <div className="grid grid-template grid-area-3 [&>*]:border">
            <div className="grid grid-template grid-area-4 min-h-[390px] [&>*]:border">
              <div className=""></div>
              <div className=""></div>
              <div className=""></div>
            </div>
            <div className=""></div>
          </div>
        </div>
      </div>
    </section>
  )
}