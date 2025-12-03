import { useState, useEffect, useRef, useMemo } from "react"
import clsx from "clsx"
import useWindowSize from "../../../hooks/UseWindowSize.js"
import { IoGrid, IoGridOutline } from "react-icons/io5";
import { MainFrameHeader, SubFrameHeader } from "./FrameHeader.jsx";
import { MainFrameContent, SubFrameContent } from "./FrameContent.jsx";
import { useSportsUrlBuilder } from "../../../hooks/useUrlBuilder.js";
import { useFetch } from "../../../hooks/UseFetchForAll.js";
import Spinner, { ScopedSpinner } from "../../../components/spinner/Spinner.jsx";

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
export default function SportsFrame({ categorySelected, setCategorySelected, sportsSelected, setSportsSelected }) {
  const [isSubframeMenuOpen, setIsSubframeMenuOpen] = useState(false);
  const { windowSize } = useWindowSize()
  // state manager for all sports frames
  const [frames, setFrames] = useState(framesData)
  const framesCache = useRef({})

  const sportsUrl = useSportsUrlBuilder(categorySelected, sportsSelected, framesCache.current)
  const {
    data: sportsDataToFrame,
    error: sportsDataToFrameError,
    loading: sportsDataToFrameLoading
  } = useFetch(sportsUrl)

  const mlbFrameUrl = useSportsUrlBuilder('GAMES', 'MLB', framesCache.current)
  const {
    data: mlbFrameData,
    error: mlbFrameDataError,
    loading: mlbFrameDataLoading
  } = useFetch(mlbFrameUrl)

  const soccerFrameUrl = useSportsUrlBuilder('GAMES', 'SOCCER', framesCache.current)
  const {
    data: soccerFrameData,
    error: soccerFrameDataError,
    loading: soccerFrameDataLoading
  } = useFetch(soccerFrameUrl)

  // initial data for subframes
  useEffect(() => {

    if (mlbFrameData?.data) {

      setFrames(prevFrames => {
        return prevFrames.map(frame => {

          if (frame.frameName !== 'MLB') {
            return frame
          }

          return {
            ...frame,
            frameData: {
              ...frame.frameData,
              [categorySelected]: mlbFrameData.data
            }
          }

        })
      })

      // for shallow caching, use the combination of
      // sports and category as key saved in framesCache ref
      const key = `${'MLB'}-${'GAMES'}`
      framesCache.current[key] = true

    }

    if (soccerFrameData?.data) {

      setFrames(prevFrames => {
        return prevFrames.map(frame => {

          if (frame.frameName !== 'SOCCER') {
            return frame
          }

          return {
            ...frame,
            frameData: {
              ...frame.frameData,
              [categorySelected]: soccerFrameData.data
            }
          }

        })
      })

      // for shallow caching, use the combination of
      // sports and category as key saved in framesCache ref
      const key = `${'SOCCER'}-${'GAMES'}`
      framesCache.current[key] = true

    }

  }, [mlbFrameData, soccerFrameData])

  // update frames
  useEffect(() => {

    if (sportsDataToFrame?.data) {
      setFrames(prevFrames => {
        return prevFrames.map(frame => {

          if (frame.frameName !== sportsSelected) {
            return frame
          }

          return {
            ...frame,
            frameData: {
              ...frame.frameData,
              [categorySelected]: sportsDataToFrame.data
            }
          }

        })
      })

      // for shallow caching, use the combination of
      // sports and category as key saved in framesCache ref
      const key = `${sportsSelected}-${categorySelected}`
      framesCache.current[key] = true

    }

    // only update/re-render during data fetch updated
    // can't include categorySelected and sportsSelected
    // it will result to stale data because it is also used by
    // url builder to render useFetch
  }, [sportsDataToFrame])


  useEffect(() => {
    if (windowSize.width > 768) {
      setIsSubframeMenuOpen(false)
    }
  }, [windowSize.width])

  const selectTabHandleClick = selection => setCategorySelected(selection)
  const selectFrameHandleCLick = selection => setSportsSelected(selection)

  return (
    <div className={`w-full h-full flex gap-2.5 text-black text-center relative`}>
      {windowSize.width <= 768 && (
        <div
          onClick={() => {
            setIsSubframeMenuOpen(!isSubframeMenuOpen)
          }}
          className="subframe-menu absolute z-20 -top-9 right-0 hover:text-[var(--lightest-navy)] cursor-pointer">
          {isSubframeMenuOpen ? <IoGridOutline className="text-2xl" /> : <IoGrid className="text-2xl" />}
        </div>
      )}

      <div className="main-frame w-full h-full shadow-[var(--bs-cards)] md:basis-2/3 rounded-lg overflow-hidden relative">
        <MainFrameHeader
          mainFrameData={frames[0]}
          categorySelected={categorySelected}
          sportsSelected={sportsSelected}
          handleClick={selectTabHandleClick}
        />

        {(sportsDataToFrameLoading) && <ScopedSpinner />}
        {
          sportsDataToFrameError
            ? <div className="h-[590px]">Error loading content. Select stats tab you want to check to confirm availability.</div>
            : <MainFrameContent
              mainFrameData={frames[0]}
              categorySelected={categorySelected}
              sportsSelected={sportsSelected}
            />
        }

      </div>

      <div className={clsx(
        `bg-[var(--gray-10)] h-full md:basis-1/3 var(--bs-cards)] 
        flex flex-col gap-2.5 [&>*]:basis-1/2 rounded-lg`,
        {
          "absolute right-0 w-full -z-10": windowSize.width <= 768,
          "z-10": isSubframeMenuOpen,
        },
      )}>
        {frames.slice(1).map(frame => (
          <div
            key={frame.frameName}
            onClick={() => {
              selectFrameHandleCLick(frame.frameName)
              const targetIndex = frames.findIndex(f => f.frameName === frame.frameName)
              setFrames(prevFrame => {
                const newFrame = [...prevFrame];
                [newFrame[targetIndex], newFrame[0]] = [newFrame[0], newFrame[targetIndex]]
                return newFrame
              })
              setIsSubframeMenuOpen(false)
            }}
            className="shadow-[var(--bs-cards)] h-full rounded-lg cursor-pointer realtive"
          >
            <SubFrameHeader subFrameData={frame} />

            {(mlbFrameDataLoading || soccerFrameDataLoading) && <div>Loading data...</div>}

            {
              (mlbFrameDataError || soccerFrameDataError)
                ? <div className="h-76">Error loading content. Click here or select stats tab you want to check to reload.</div>
                : <SubFrameContent
                  subFrameData={frame}
                  sportsSelected={sportsSelected}
                />
            }

          </div>
        ))}
      </div>
    </div>
  )
}