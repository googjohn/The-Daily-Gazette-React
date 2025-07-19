import { useState, useEffect } from "react";
import LocalNews from "./LocalNews";
import TrendingNews from "./TrendingNews";
import HeadNews from "./HeadNews";
import Salutation from "./Salutation";
import Section from "../../components/mainbody/Section";
import BusinessFinance from "./BusinessFinance";

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
      <Section id={'world-news'}>
        <div id="weather-container"></div>
        <Salutation
          dateToday={dateToday}
          timer={timer}
          formatter={formatter}
        />
        <HeadNews />
        <TrendingNews />
      </Section>
      <LocalNews />
      <BusinessFinance />
    </>
  )
}