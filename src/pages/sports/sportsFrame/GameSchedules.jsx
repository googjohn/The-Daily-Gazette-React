import { useRef, useEffect, useCallback, useMemo } from "react";
import { formatDate } from "../../../hooks/UseFormatter";
import { mlbLogos } from "../../../data/mlbLogos";
import noImage from "/images/no-image/no-image-available.png"
import clsx from "clsx";
import { GameSchedulesSkeleton } from "../../../components/skeleton/Skeleton";

export default function GameSchedules({ framedata, sportsSelected }) {
  const elementToScroll = useRef([]);

  // helper function to timestamp
  const getTime = (dateStr) => {
    const time = new Date(dateStr).getTime()
    return Number.isNaN(time) ? 0 : time // fallback for invalid time
  }
  const today = useMemo(() => new Date().toLocaleDateString('en-US'), [])

  // helper function to compare datestr
  const compareDate = useCallback((dateStr) => {
    const parsedDate = new Date(dateStr)
    if (Number.isNaN(parsedDate.getTime())) return false;
    const derivedDate = parsedDate.toLocaleDateString('en-US')
    return derivedDate === today
  }, [today])

  useEffect(() => {
    if (framedata?.frameData?.GAMES) {

      const games = framedata.frameData.GAMES
      const scrollToIndex = (() => {
        if (!games || games?.length === 0) return 0;

        // get the index of the element with the same date as  and return
        let index = games.findIndex(({ date }) => {
          return compareDate(date)
        })

        if (index !== -1) return index

        // if we don't find the exact same date then let's go to the nearest
        index = games.findIndex(({ date }) => {
          return getTime(date) > getTime(today)
        })
        if (index !== -1) return index;

        return games.length - 1;
      })()

      if (scrollToIndex !== null && elementToScroll.current[scrollToIndex]) {
        elementToScroll.current[scrollToIndex].scrollIntoView({
          behavior: 'instant',
          block: 'start',
          inline: 'nearest'
        })
      }
    }
  }, [framedata?.frameData, today, compareDate]);

  const isMatch = framedata?.frameName === sportsSelected

  return (
    !framedata?.frameData.GAMES
      ? <GameSchedulesSkeleton />
      : framedata?.frameData?.GAMES?.map(({ date, gamesList }, index) => {
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
                gamesList && gamesList?.map(game => {

                  const getLogo = (gamedataId) => {

                    if (framedata?.frameName === 'MLB') {
                      return mlbLogos.find(({ teamId }) => teamId === gamedataId)?.logo
                    }

                    return gamedataId === game?.homeTeam_id ?
                      game?.homeTeam_logo :
                      game?.awayTeam_logo

                  }

                  const homeTeamLogo = getLogo(game?.homeTeam_id)
                  const awayTeamLogo = getLogo(game?.awayTeam_id)

                  const homeTeamWin = game.homeTeam_score > game.awayTeam_score;
                  const isTie = game.homeTeam_score === game.awayTeam_score

                  let gamestatus = game?.gamesStatus?.toLowerCase()
                  let isFinished = gamestatus === 'final' || gamestatus?.includes('f')

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
                                src={homeTeamLogo || noImage}
                                alt={game.homeTeam_name}
                                className="rounded-full w-6 aspect-square"
                              />
                              <span>{
                                framedata?.frameName !== sportsSelected
                                  ? game.homeTeam_key
                                  : game.homeTeam_clubname || game.homeTeam_name
                              }</span>
                            </div>
                            <div className="team-score">
                              <span>{game.homeTeam_score}</span>
                            </div>
                          </div>
                          <div className={`team-2 flex justify-between items-center ${isFinished && !homeTeamWin && !isTie ? 'font-bold' : 'font-normal'}`}>
                            <div className="team-data flex items-center gap-2.5">
                              <img
                                src={awayTeamLogo || noImage}
                                alt={game.awayTeam_name}
                                className="rounded-full w-6 aspect-square"
                              />
                              <span>{
                                framedata?.frameName !== sportsSelected
                                  ? game.awayTeam_key
                                  : game.awayTeam_clubname || game.awayTeam_name
                              }</span>
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
                              {formatDate(sportsSelected === 'MLB' ? game.gameDate : game.gameTimeUTC, {
                                hour: 'numeric',
                                minute: 'numeric'
                              })}
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
      })
  )
}