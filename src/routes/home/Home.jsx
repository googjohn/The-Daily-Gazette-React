import { useState, useEffect } from "react";
import LocalNews from "./LocalNews";
import TrendingNews from "./TrendingNews";
import HeadNews from "./HeadNews";
import Salutation from "./Salutation";
import Section from "../../components/mainbody/Section";
import BusinessFinance from "./BusinessFinance";
import Card from "../../components/card/Card";
import Entertainment from "../entertainment/Entertainment";

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
    <>
      <section id="world-news" className="h-full w-11/12 p-2.5 mx-auto mt-20 mb-5">
        <div id="weather-container"></div>
        <Salutation
          dateToday={dateToday}
          timer={timer}
          formatter={formatter}
        />
        <HeadNews />
        <TrendingNews />
      </section>
      <LocalNews />
      <BusinessFinance />
      <Entertainment />
    </>
  )
}