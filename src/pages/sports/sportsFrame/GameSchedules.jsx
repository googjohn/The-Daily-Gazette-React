import { nbaLogos } from "../../../data/nbaLogos";
import { mlbLogos } from "../../../data/mlbLogos";
import { formatDate } from "../../../hooks/UseFormatter";
import Spinner from "../../../components/spinner/Spinner";
import clsx from "clsx";
import { useRef, useEffect, useCallback } from "react";
import ErrorPage from "../../../components/error/ErrorPage";

export default function GameSchedules({ framedata, sportsSelected, categorySelected }) {
  const elementToScroll = useRef([]);

  // helper function to timestamp
  const getTime = (dateStr) => {
    const time = new Date(dateStr).getTime()
    return Number.isNaN(time) ? 0 : time // fallback for invalid time
  }
  const today = new Date().toLocaleDateString('en-US')

  // helper function to compare datestr
  const compareDate = useCallback((dateStr) => {
    const parsedDate = new Date(dateStr)
    if (Number.isNaN(parsedDate.getTime())) return false;
    const derivedDate = parsedDate.toLocaleDateString('en-US')
    return derivedDate === today
  }, [today])

  useEffect(() => {
    const data = framedata?.frameData[categorySelected]
    const scrollToIndex = (() => {
      if (!data || data?.length === 0) return 0;
      // get the index of the element with the same date as  and return
      let index = data?.findIndex(({ date }) => {
        // const derivedDate = date?.split(' ')[0] || date?.split('T')[0]
        return compareDate(date)
      })
      if (index !== -1) return index

      // if we don't find the exact same date then let's go to the nearest
      index = data?.findIndex(({ date }) => {
        // const derivedDate = date?.split(' ')[0] || date?.split('T')[0]
        return getTime(date) > getTime(today)
      })
      if (index !== -1) return index;

      return data.length - 1;
    })()

    if (scrollToIndex !== null && elementToScroll.current[scrollToIndex]) {
      elementToScroll.current[scrollToIndex].scrollIntoView({
        behavior: 'instant',
        block: 'nearest',
        inline: 'nearest'
      })
    }
  }, [framedata?.frameData, categorySelected, today, compareDate]);

  const sportLogos = framedata?.frameName === 'NBA'
    ? nbaLogos
    : mlbLogos

  const isMatch = framedata?.frameName === sportsSelected
  const loading = !framedata?.frameData[categorySelected]

  const isError = framedata?.frameData[categorySelected]?.error

  // if (isError) return (<ErrorPage error={framedata?.frameData[categorySelected]?.error} />)

  return (
    <>

      {/* {loading && <div>Loading data...</div>  */}
      {framedata?.frameData?.GAMES?.map(({ date, gamesList }, index) => {
        const derivedDate = sportsSelected === "NBA"
          ? date?.split(' ')[0]
          : date

        return (
          <div
            key={date}
            ref={(el) => elementToScroll.current[index] = el}
            className={`w-full h-auto`}
          >
            {isMatch && (
              <div className="date-schedule bg-[var(--gray-10)] w-full">
                <span className="px-3 h-8 flex items-center">
                  {
                    formatDate(derivedDate, {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })
                  }
                </span>
              </div>
            )}

            <div className={clsx(
              "games-schedule bg-white/50 flex flex-col w-full [&>*]:border-[1px] [&>*]:border-black/10",
              isMatch
                ? 'sm:grid sm:grid-cols-2'
                : ''
            )}>
              {/* need to fix for visible games only to improve performance */}
              {(
                gamesList?.map(game => {

                  const homeTeamLogo = sportLogos.find(sportTeam => sportTeam.teamId == game.homeTeam_id)?.logo
                  const awayTeamLogo = sportLogos.find(sportTeam => sportTeam.teamId == game.awayTeam_id)?.logo
                  const homeTeamWin = game.homeTeam_score > game.awayTeam_score;
                  const isTie = game.homeTeam_score === game.awayTeam_score

                  let isFinished;
                  if (sportsSelected === 'NBA') {
                    isFinished = game?.gameStatus?.toLowerCase() === 'final'
                  } else if (sportsSelected === "MLB") {
                    isFinished = game?.gameStatus?.toLowerCase() === 'final'
                  } else {
                    isFinished = game?.gameStatus?.toLowerCase() === 'final' || game?.gameStatus?.toLowerCase() === 'finished'
                  }

                  return (
                    <div
                      key={game.gameId}
                      className={`${isMatch ? 'p-3' : 'py-1 px-1.5'}`}
                    >
                      {(
                        <div className="season-type text-xs">
                          {game.gameLabel || 'Regular Season'}
                        </div>
                      )}

                      <div className="game-schedule-content h-20 w-full flex items-center text-xs">
                        <div className="teams pr-2.5 basis-2/3 border-r border-black/10 flex flex-col gap-0.5">
                          <div className={`team-1 flex justify-between items-center ${isFinished && homeTeamWin && !isTie ? 'font-bold' : 'font-normal'}`}>
                            <div className="team-data flex items-center gap-2.5">
                              <img
                                src={
                                  sportsSelected === 'SOCCER' && framedata?.frameName === sportsSelected
                                    ? game.homeTeam_crest
                                    : sportsSelected === 'SOCCER' && framedata?.frameName !== sportsSelected
                                      ? homeTeamLogo
                                      : sportsSelected !== 'SOCCER' && framedata?.frameName !== 'SOCCER'
                                        ? homeTeamLogo
                                        : game.homeTeam_crest
                                }
                                alt={game.homeTeam_name}
                                className="rounded-full w-6 aspect-square"
                              />
                              <span>{game.homeTeam_name}</span>
                            </div>
                            <div className="team-score">
                              <span>{game.homeTeam_score}</span>
                            </div>
                          </div>
                          <div className={`team-2 flex justify-between items-center ${isFinished && !homeTeamWin && !isTie ? 'font-bold' : 'font-normal'}`}>
                            <div className="team-data flex items-center gap-2.5">
                              <img
                                src={
                                  sportsSelected === 'SOCCER' && framedata?.frameName === sportsSelected
                                    ? game.awayTeam_crest
                                    : sportsSelected === 'SOCCER' && framedata?.frameName !== sportsSelected
                                      ? awayTeamLogo
                                      : sportsSelected !== 'SOCCER' && framedata?.frameName !== 'SOCCER'
                                        ? awayTeamLogo
                                        : game.awayTeam_crest
                                }
                                alt={game.awayTeam_name}
                                className="rounded-full w-6 aspect-square"
                              />
                              <span>{game.awayTeam_name}</span>
                            </div>
                            <div className="team-score">
                              <span>{game.awayTeam_score}</span>
                            </div>
                          </div>
                        </div>
                        <div className="schedule pl-2.5 basis-1/3 text-xs text-center">
                          {isFinished
                            ? <span>{"Final"} <br />
                              {formatDate(game.gameDate, {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                            : <span>
                              {formatDate(game.gameDate, {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                              })} <br />
                              {game.gameStatus}
                            </span>
                          }
                        </div>
                      </div>
                    </div>
                  )
                })

              )}
            </div>

          </div>
        )
      })}
    </>
  )
}