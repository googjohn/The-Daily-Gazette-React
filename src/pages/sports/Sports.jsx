import { useState } from "react";
import Card from "../../components/card/Card";
import Aside from "../../components/mainbody/Aside";
import Section from "../../components/mainbody/Section";
import { useFetch, useIplookup } from "../../hooks/UseFetchForAll";
import { mlbOptions, nbaOptions } from "../../data/gnewsOptions";
import ErrorPage from "../../components/error/ErrorPage";
import Spinner from "../../components/spinner/Spinner";
import SportsFrame from "./sportsFrame/SportsFrame";
import { Skeleton } from "@heroui/skeleton";
import { useNewsdataUrlBuilder } from "../../hooks/useUrlBuilder";

export default function Sports() {
  const [sportsSelected, setSportsSelected] = useState('NBA') // NBA | MLB | SOCCER
  const [categorySelected, setCategorySelected] = useState('GAMES') // GAMES | STANDINGS | PLAYERS

  const {
    data: ipdata,
    error: ipdataError,
    loading: ipdataLoading
  } = useIplookup()

  const nbaUrl = useNewsdataUrlBuilder(ipdata, nbaOptions)
  const {
    data: nbanewsData,
    error: nbanewsError,
    loading: nbanewsLoading
  } = useFetch(nbaUrl)

  const mlbUrl = useNewsdataUrlBuilder(ipdata, mlbOptions)
  const {
    data: mlbnewsData,
    error: mlbnewsError,
    loading: mlbnewsLoading
  } = useFetch(mlbUrl)

  const NEWSDATAIO_URL = useNewsdataUrlBuilder(ipdata, {
    'max': 10,
    'endpoint': '',
    'country': '',
    'language': 'en',
    'category': 'sports',
    'searchTerm': 'sports',
    'source': 'newsdataio'
  })

  const {
    data: sportsdata,
    error: sportsdataError,
    loading: sportsdataLoading
  } = useFetch(NEWSDATAIO_URL)

  const isLoading = sportsdataLoading || nbanewsLoading || mlbnewsLoading

  const sportsMap = {
    NBA: 'NBA Stats and Schedules',
    MLB: 'MLB Stats and Schedules',
    SOCCER: 'SOCCER Stats and Schedules',
  }

  const frameTitle = sportsMap[sportsSelected]
  const sections = [
    {
      title: frameTitle,
      content:
        <SportsFrame
          categorySelected={categorySelected}
          setCategorySelected={setCategorySelected}
          sportsSelected={sportsSelected}
          setSportsSelected={setSportsSelected}
        />
    }
  ]

  return (
    <>
      {(ipdataError && nbanewsError && mlbnewsError && sportsdataError) && <ErrorPage error={
        (ipdataError || nbanewsError || mlbnewsError || sportsdataError)
      } />}
      {isLoading && <Spinner />}
      <Section
        id={'sports-page'}
        sectionData={sections}
      />
      <SportsForHome
        nbanewsData={nbanewsData}
        mlbnewsData={mlbnewsData}
        sportsnewsData={sportsdata}
      />
    </>
  )
}

export function SportsForHome({ nbanewsData, mlbnewsData, sportsnewsData }) {

  const sections = [
    {
      title: 'Latest in Sports',
      customGrid: 'grid-area-sports-container',
      content: (
        <>
          <div className="grid grid-template grid-area-sports relative">
            {!sportsnewsData ? (
              <>
                <div className="w-full flex flex-col items-center gap-2.5 p-2.5 shadow-(--bs-cards) relative">
                  <div className="block w-full h-full">
                    <Skeleton className="rounded-lg min-w-full w-full h-full bg-[var(--gray-30)]" />
                  </div>
                  <div className="block w-full absolute bottom-5 px-5">
                    <div className="w-full flex flex-col gap-2" >
                      <Skeleton className="h-3 w-6/12 rounded-lg bg-[var(--gray-20)]" />
                      <Skeleton className="h-3 w-10/12 rounded-lg bg-[var(--gray-20)]" />
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center gap-2.5 p-2.5 shadow-(--bs-cards) relative">
                  <div className="block w-full h-full">
                    <Skeleton className="rounded-lg min-w-full w-full h-full bg-[var(--gray-30)]" />
                  </div>
                  <div className="block w-full absolute bottom-5 px-5">
                    <div className="w-full flex flex-col gap-2" >
                      <Skeleton className="h-3 w-11/12 rounded-lg bg-[var(--gray-20)]" />
                      <Skeleton className="h-3 w-10/12 rounded-lg bg-[var(--gray-20)]" />
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center gap-2.5 p-2.5 shadow-(--bs-cards) relative">
                  <div className="block w-full h-full">
                    <Skeleton className="rounded-lg min-w-full w-full h-full bg-[var(--gray-30)]" />
                  </div>
                  <div className="block w-full absolute bottom-5 px-5">
                    <div className="w-full flex flex-col gap-2" >
                      <Skeleton className="h-3 w-11/12 rounded-lg bg-[var(--gray-20)]" />
                      <Skeleton className="h-3 w-10/12 rounded-lg bg-[var(--gray-20)]" />
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center gap-2.5 p-2.5 shadow-(--bs-cards) relative">
                  <div className="block w-full h-full">
                    <Skeleton className="rounded-lg min-w-full w-full h-full bg-[var(--gray-30)]" />
                  </div>
                  <div className="block w-full absolute bottom-5 px-5">
                    <div className="w-full flex flex-col gap-2" >
                      <Skeleton className="h-3 w-11/12 rounded-lg bg-[var(--gray-20)]" />
                      <Skeleton className="h-3 w-10/12 rounded-lg bg-[var(--gray-20)]" />
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center gap-2.5 p-2.5 shadow-(--bs-cards) relative">
                  <div className="block w-full h-full">
                    <Skeleton className="rounded-lg min-w-full w-full h-full bg-[var(--gray-30)]" />
                  </div>
                  <div className="block w-full absolute bottom-5 px-5">
                    <div className="w-full flex flex-col gap-2" >
                      <Skeleton className="h-3 w-11/12 rounded-lg bg-[var(--gray-20)]" />
                      <Skeleton className="h-3 w-10/12 rounded-lg bg-[var(--gray-20)]" />
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center gap-2.5 p-2.5 shadow-(--bs-cards) relative">
                  <div className="block w-full h-full">
                    <Skeleton className="rounded-lg min-w-full w-full h-full bg-[var(--gray-30)]" />
                  </div>
                  <div className="block w-full absolute bottom-5 px-5">
                    <div className="w-full flex flex-col gap-2" >
                      <Skeleton className="h-3 w-11/12 rounded-lg bg-[var(--gray-20)]" />
                      <Skeleton className="h-3 w-10/12 rounded-lg bg-[var(--gray-20)]" />
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center gap-2.5 p-2.5 shadow-(--bs-cards) relative">
                  <div className="block w-full h-full">
                    <Skeleton className="rounded-lg min-w-full w-full h-full bg-[var(--gray-30)]" />
                  </div>
                  <div className="block w-full absolute bottom-5 px-5">
                    <div className="w-full flex flex-col gap-2" >
                      <Skeleton className="h-3 w-11/12 rounded-lg bg-[var(--gray-20)]" />
                      <Skeleton className="h-3 w-10/12 rounded-lg bg-[var(--gray-20)]" />
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center gap-2.5 p-2.5 shadow-(--bs-cards) relative">
                  <div className="block w-full h-full">
                    <Skeleton className="rounded-lg min-w-full w-full h-full bg-[var(--gray-30)]" />
                  </div>
                  <div className="block w-full absolute bottom-5 px-5">
                    <div className="w-full flex flex-col gap-2" >
                      <Skeleton className="h-3 w-11/12 rounded-lg bg-[var(--gray-20)]" />
                      <Skeleton className="h-3 w-10/12 rounded-lg bg-[var(--gray-20)]" />
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center gap-2.5 p-2.5 shadow-(--bs-cards) relative">
                  <div className="block w-full h-full">
                    <Skeleton className="rounded-lg min-w-full w-full h-full bg-[var(--gray-30)]" />
                  </div>
                  <div className="block w-full absolute bottom-5 px-5">
                    <div className="w-full flex flex-col gap-2" >
                      <Skeleton className="h-3 w-11/12 rounded-lg bg-[var(--gray-20)]" />
                      <Skeleton className="h-3 w-10/12 rounded-lg bg-[var(--gray-20)]" />
                    </div>
                  </div>
                </div>


              </>
            )
              : sportsnewsData && sportsnewsData.data.slice(0, 9).map((article, index) => {
                const source = {
                  url: article.source_url || article.source.url,
                  name: article.source_name || article.source.name,
                }

                return (
                  <Card
                    key={article.article_id || article.id}
                    cardTitle={article.title}
                    cardDescription={index === 0 ? article.description : null}
                    cardImageSrc={article.image_url || article.image}
                    source={source}
                    link={article.link || article.url}
                  />
                )
              })
            }
          </div>
          <div className="aside flex flex-col gap-2.5">
            <Aside
              asideTitle={'NBA Sports Updates'}
              asideContent={nbanewsData}
            />
            <Aside
              asideTitle={'MLB Sports Updates'}
              asideContent={mlbnewsData}
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