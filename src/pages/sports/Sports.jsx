import { useEffect, useState, useRef, useCallback } from "react";
import Card from "../../components/card/Card";
import useIpGetter from "../../hooks/UseIpGetter";
import Aside from "../../components/mainbody/Aside";
import Section from "../../components/mainbody/Section";
import { useFetchNews } from "../home/Home";
import { useFetchForAll } from "../../hooks/UseFetchForAll";
import { mlbOptions, nbaOptions } from "../../data/gnewsOptions";
import ErrorPage from "../../components/error/ErrorPage";
import Spinner from "../../components/spinner/Spinner";
import SportsFrame from "./sportsFrame/SportsFrame";

const framesData = [
  {
    "frameName": 'NBA',
    "frameTitle": "NBA Stats and Schedule",
    "frameLogo": "/images/sports-logo/nba-logo.png",
    "frameData": {
      "GAMES": null,
      "STANDINGS": null,
      "PLAYERS": null,
    },
  },
  {
    "frameName": 'MLB',
    "frameTitle": "MLB Stats and Schedule",
    "frameLogo": "/images/sports-logo/mlb-logo.png",
    "frameData": {
      "GAMES": null,
      "STANDINGS": null,
      "PLAYERS": null,
    },
  },
  {
    "frameName": 'SOCCER',
    "frameTitle": "Soccer Stats and Schedule",
    "frameLogo": "/images/sports-logo/premier-league-logo.png",
    "frameData": {
      "GAMES": null,
      "STANDINGS": null,
      "PLAYERS": null,
    },
  },
]

export default function Sports() {
  const [sportsSelected, setSportsSelected] = useState('NBA') // NBA | MLB | SOCCER
  const [categorySelected, setCategorySelected] = useState('GAMES') // GAMES | STANDINGS | PLAYERS
  const abortControl = useRef(null);
  const { ipdata, error: ipdataError } = useIpGetter();
  const nbaNewsData = useFetchNews(nbaOptions, ipdata?.country, 'nba')
  const mlbNewsData = useFetchNews(mlbOptions, ipdata?.country, 'mlb')

  // state manager for all sports frames
  const [frames, setFrames] = useState(framesData)

  // fetcher function
  const fetchSports = useCallback(async (signal) => {

    let selected;
    if (categorySelected === 'GAMES') {
      selected = 'schedules'
    } else if (categorySelected === 'STANDINGS') {
      selected = 'standings'
    } else if (categorySelected === 'PLAYERS') {
      selected = 'players'
    }

    const frameCurrent = frames.find(frame => frame.frameName === sportsSelected)
    // save api call by checking if data has already been fetched
    // return if did and is not error object otherwise run fetch in trycatch
    const data = frameCurrent.frameData[categorySelected]
    if (data !== null && !data.error) {
      console.log('Data already fetched! Call saved.')
      return;
    }

    try {
      const url = `http://localhost:8000/api/${sportsSelected.toLowerCase()}/${selected}`
      const response = await fetch(url, { signal })

      if (!response.ok) {
        throw new Error('Fetch failed.', response.statusText)
      }

      const result = await response.json();
      setFrames(prev => {
        const newFrames = [...prev]
        const frameToUpdate = newFrames.find(frame => frame.frameName === sportsSelected)
        frameToUpdate.frameData[categorySelected] = result
        return newFrames
      })
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Standard abort procedure')
        return;
      }
      console.error(err.name)
    }

  }, [sportsSelected, categorySelected, frames])

  // fetch sports data
  useEffect(() => {
    if (abortControl.current) abortControl.current = null;

    abortControl.current = new AbortController();
    const signal = abortControl.current.signal;

    fetchSports(signal)

    return () => {
      if (abortControl.current) abortControl.current.abort()
    }
  }, [fetchSports])

  const allError = ipdataError || nbaNewsData?.error || mlbNewsData?.error || frames[0].frameData[categorySelected]?.error
  const isLoading = !nbaNewsData?.articles && !mlbNewsData?.articles && frames[0].frameData[categorySelected] === null

  const sections = [
    {
      title: frames[0].frameTitle,
      content:
        <SportsFrame
          frames={frames}
          setFrames={setFrames}
          categorySelected={categorySelected}
          setCategorySelected={setCategorySelected}
          sportsSelected={sportsSelected}
          setSportsSelected={setSportsSelected}
        />
    }
  ]

  return (
    <>
      {allError && <ErrorPage />}
      {isLoading && <Spinner />}
      {<SportsForHome
        ipdata={ipdata}
        nbaNewsDAta={nbaNewsData?.articles}
        mlbNewsData={mlbNewsData?.articles}
      />}
      <Section
        id={'sports-page'}
        sectionData={sections}
      />
    </>
  )
}

export function SportsForHome({ ipdata, nbaNewsDAta, mlbNewsData }) {

  const NEWSDATAIO_URL = ipdata?.country
    ? `https://newsdata.io/api/1/latest?country=${ipdata?.country}&language=en&category=sports&q=sports&apikey=${import.meta.env.VITE_NEWSDATAIO_API_KEY_4}`
    : null
  const { data: sportsNews, error: sportsError } = useFetchForAll(NEWSDATAIO_URL)
  const sportsArticles = sportsNews?.results

  const sections = [
    {
      title: 'Latest in Sports',
      customGrid: 'grid-area-sports-container',
      content: (
        <>
          <div className="grid grid-template grid-area-sports">
            {sportsError
              ? (<div className="text-black">Error loading data.</div>)
              : sportsArticles && sportsArticles.slice(0, 9).map((article, index) => {
                const source = {
                  url: article.source_url,
                  name: article.source_name,
                }

                return (
                  <Card
                    key={article.article_id}
                    cardTitle={article.title}
                    cardDescription={index === 0 ? article.description : null}
                    cardImageSrc={article.image_url}
                    source={source}
                    link={article.link}
                  />
                )
              })
            }
          </div>
          <div className="aside">
            <Aside
              asideTitle={'NBA Sports Updates'}
              asideContent={nbaNewsDAta}
            />
            <Aside
              asideTitle={'MLB Sports Updates'}
              asideContent={mlbNewsData}
            />
          </div>
        </>
      )
    }
  ]
  return (
    <Section
      id={'sports-news'}
      sectionData={sections}
    />
  )
}