import { useState, useEffect, useRef, useMemo } from "react"
import { useVirtualizer } from "@tanstack/react-virtual";
import { formatDate } from "../../../hooks/UseFormatter.js"
import { nbaLogos } from "../../../data/nbaLogos.js"
import { nbaPlayers } from "../../../data/nbaPlayers.js";
import clsx from "clsx"
import { useMultiIntersection } from "../../../hooks/useIntersection.js";
import useWindowSize from "../../../hooks/UseWindowSize.js"
import { IoGrid, IoGridOutline } from "react-icons/io5";
import { MainFrameHeader, SubFrameHeader } from "./FrameHeader.jsx";
import { MainFrameContent, SubFrameContent } from "./FrameContent.jsx";

export default function SportsFrame({ frames, setFrames, categorySelected, setCategorySelected, sportsSelected, setSportsSelected }) {

  const [isSubframeMenuOpen, setIsSubframeMenuOpen] = useState(false);
  const { windowSize } = useWindowSize()

  // const game_date = new Date().toLocaleDateString('en-US')
  // const upcoming_game_index = nbaData?.findIndex(({ date }) =>
  // date.split(' ')[0] === game_date || new Date(date.split(' ')[0]).getTime() > new Date(game_date).getTime())
  // const games_list = nbaData && nbaData[upcoming_game_index]
  // console.log(games_list)
  // const { gamesList } = games_list || {}

  const selectTabHandleClick = selection => setCategorySelected(selection)
  const selectFrameHandleCLick = selection => setSportsSelected(selection)

  const isLoading = !frames[0].frameData[categorySelected]
  return (
    <div className={`w-full h-full flex gap-2.5 text-black text-center relative`}>
      <div className="main-frame w-full min-h-[590px] shadow-[var(--bs-cards)] md:basis-2/3 rounded-lg overflow-hidden">

        <MainFrameHeader
          mainFrameData={frames[0]}
          categorySelected={categorySelected}
          sportsSelected={sportsSelected}
          handleClick={selectTabHandleClick}
        />

        {
          isLoading ? <div>Loading data...</div> :

            <MainFrameContent
              mainFrameData={frames[0]}
              categorySelected={categorySelected}
              sportsSelected={sportsSelected}
            />
        }

      </div>

      {windowSize.width <= 768 ? (
        <div onClick={() => setIsSubframeMenuOpen(!isSubframeMenuOpen)} className="absolute w-full h-full">
          {isSubframeMenuOpen ? (
            <div className="">
              <div className="subframe-menu absolute -top-9 right-0 hover:text-[var(--lightest-navy)] cursor-pointer">
                <IoGridOutline className="text-2xl" />
              </div>
              <div className="sub-frames bg-[var(--gray-10)] h-full min-h-[550px] min-w-90  md:basis-1/3 var(--bs-cards)] flex flex-col gap-2.5 [&>*]:basis-1/2">
                {frames.slice(1).map(frame => (
                  <div
                    key={frame.frameName}
                    onClick={() => {
                      selectFrameHandleCLick(frame.frameName)
                      const targetIndex = frames.findIndex(f => f.frameName === frame.frameName)
                      setFrames((prev) => {
                        const newFrames = [...prev];
                        [newFrames[targetIndex], newFrames[0]] = [newFrames[0], newFrames[targetIndex]]
                        return newFrames
                      })
                    }} className="sub-frame shadow-[var(--bs-cards)] rounded-lg"
                  >
                    <SubFrameHeader subFrameData={frame} />
                    {isLoading ? <div>Loading data...</div> :
                      <SubFrameContent
                        subFrameData={frame}
                        mainFrameData={frames[0]}
                        categorySelected={categorySelected}
                        sportsSelected={sportsSelected}
                      />}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="subframe-menu absolute -top-9 right-0 cursor-pointer hover:text-[var(--lightest-navy)] text-[var(--light-navy)]">
              <IoGrid className="text-2xl" />
            </div>
          )}
        </div>
      ) : (
        <div className="sub-frames w-full md:basis-1/3 flex flex-col gap-2.5 [&>*]:basis-1/2">
          {frames.slice(1).map(frame => (
            <div
              key={frame.frameName}
              onClick={() => {
                setSportsSelected(frame.frameName)
                const targetIndex = frames.findIndex(f => f.frameName === frame.frameName)
                setFrames((prev) => {
                  const newFrames = [...prev];
                  [newFrames[targetIndex], newFrames[0]] = [newFrames[0], newFrames[targetIndex]]
                  return newFrames
                })
              }} className="sub-frame shadow-[var(--bs-cards)] rounded-lg"
            >
              <SubFrameHeader subFrameData={frame} />
              {isLoading ? <div>Loading data...</div> :
                <SubFrameContent
                  subFrameData={frame}
                  mainframeData={frames[0]}
                  categorySelected={categorySelected}
                  sportsSelected={sportsSelected}
                />}

            </div>
          ))}
        </div>
      )
      }
    </div>
  )
}

function NbaCardContent({ nbaData }) {
  const scrollRef = useRef([]);
  const today = new Date().toLocaleDateString('en-US')

  const getTime = (dateStr) => new Date(dateStr).getTime()
  const scrollIndex = (() => {
    if (!nbaData || nbaData.length === 0) return null;

    let index = nbaData.findIndex(({ date }) => {
      const derivedDate = date.split(' ')[0];
      return today === derivedDate
    })

    if (index !== -1) return index;

    index = nbaData.findIndex(({ date }) => {
      const derivedDate = date.split(' ')[0];
      return getTime(derivedDate) > getTime(today)
    })

    if (index !== -1) return index;

    return nbaData.length - 1
  })();

  useEffect(() => {
    if (scrollIndex !== null && scrollRef.current[scrollIndex]) {
      scrollRef.current[scrollIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      })
    }
  }, [scrollIndex])


  return (
    <>
      {!nbaData && <div>Loading data...</div>}
      {nbaData && nbaData?.map(({ date, gamesList }, index) => {
        const derivedDate = date?.split(' ')[0]
        // const isToday = derivedDate === today
        return (
          <div
            key={date}
            className="w-full h-auto">
            <div
              id="date-schedule"
              ref={(el) => (scrollRef.current[index] = el)}
              className="py-2.5 px-4 bg-[var(--gray-10)]">
              <span>{formatDate(derivedDate, {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}</span>
            </div>
            <div
              id="game-schedule-container"
              className={`bg-white/50 flex flex-col sm:grid sm:grid-cols-2 w-full [&>*]:border-[1px] [&>*]:border-black/10`}>
              {gamesList?.map(game => {
                const homeTeamLogo = nbaLogos.filter(team => team.teamId === game.homeTeam_id)[0]?.logo
                const awayTeamLogo = nbaLogos.filter(team => team.teamId === game.awayTeam_id)[0]?.logo
                const homeTeamWin = game.homeTeam_score > game.awayTeam_score
                const isFinished = game.gameStatus === 3 || game.gameStatusText.toLowerCase() === 'final'
                return (

                  <div key={game.gameId} className="p-3">
                    <div className="text-xs">
                      {game.gameLabel || 'Regular Season'}
                    </div>
                    <div className="h-20 w-full flex items-center text-xs">
                      <div id="teams" className="pr-2.5 basis-2/3 border-r border-black/10">
                        <div id="team1" className={`flex justify-between items-center ${isFinished && homeTeamWin ? 'font-bold' : 'font-normal'}`}>
                          <div className="team-data flex items-center gap-2.5">
                            <img src={homeTeamLogo} alt={game.homeTeam_name} className="rounded-full w-6 aspect-square" />
                            <span>{game.homeTeam_name}</span>
                          </div>
                          <div className="team-score">
                            <span>{game.homeTeam_score}</span>
                          </div>
                        </div>
                        <div id="team2" className={`flex justify-between items-center ${isFinished && !homeTeamWin ? 'font-bold' : 'font-normal'}`}>
                          <div className="team-data flex items-center gap-2.5">
                            <img src={awayTeamLogo} alt={game.awayTeam_name} className="rounded-full w-6 aspect-square" />
                            <span>{game.awayTeam_name}</span>
                          </div>
                          <div className="team-score">
                            <span>{game.awayTeam_score}</span>
                          </div>
                        </div>
                      </div>
                      <div id="schedule" className="pl-2.5 basis-1/3 text-xs text-center">
                        {isFinished
                          ? <span>{"Final"} <br /> {formatDate(game.gameDate, {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                          })}</span>
                          : (<span>{formatDate(game.gameDate, {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                          })} <br /> {game.gameStatusText} </span>)
                        }
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </>
  )
}

function VirtualScheduleList({ nbaData }) {
  const parentRef = useRef(null);

  const today = new Date().toLocaleDateString('en-US')
  const getTime = (dateStr) => new Date(dateStr).getTime()

  const scrollIndex = useMemo(() => {
    if (!nbaData || nbaData?.length === 0) return 0;

    let index = nbaData?.findIndex(({ date }) => {
      const derivedDate = date.split(' ')[0];
      return derivedDate === today
    })

    if (index !== -1) return index

    index = nbaData?.findIndex(({ date }) => {
      const derivedDate = date.split(' ')[0];
      return getTime(derivedDate) > getTime(today)
    })

    if (index !== -1) return index;

    return nbaData?.length - 1;

  }, [nbaData])

  const rowVirtualizer = useVirtualizer({
    count: nbaData?.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 150,
    overscan: 5,
    measureElement: (el) => el.getBoundingClientRect().height,
  })

  const virtualItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    rowVirtualizer.scrollToIndex(scrollIndex, { align: 'start' })
  }, [scrollIndex])

  if (!nbaData) return (<div>Loading data...</div>)
  return (
    <div
      ref={parentRef}
      style={{
        height: '500px',
        overflow: 'auto'
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: 'relative'
        }}>
        {
          virtualItems?.map(virtualRow => {
            const item = nbaData[virtualRow.index];
            const { date, gamesList } = item;
            const derivedDate = date.split(' ')[0]
            return (
              <div
                key={date}
                id="date-schedule"
                data-index={virtualRow.index}
                ref={(el) => {
                  rowVirtualizer.measureElement(el);
                }}
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className="bg-[var(--gray-10)] w-full">
                <span className="px-3 h-10 flex items-center">{formatDate(derivedDate, {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}</span>

                <div
                  id="game-schedule-container"
                  className={`bg-white/50 flex flex-col sm:grid sm:grid-cols-2 w-full [&>*]:border-[1px] [&>*]:border-black/10`}>
                  {gamesList?.map(game => {
                    const homeTeamLogo = nbaLogos.find(team => team.teamId === game.homeTeam_id)
                    const awayTeamLogo = nbaLogos.find(team => team.teamId === game.awayTeam_id)
                    const homeTeamWin = game.homeTeam_score > game.awayTeam_score
                    const isFinished = game.gameStatus === 3 || game.gameStatusText.toLowerCase() === 'final'
                    return (

                      <div key={game.gameId} className="p-3">
                        <div className="text-xs">
                          {game.gameLabel || 'Regular Season'}
                        </div>
                        <div className="h-20 w-full flex items-center text-xs">
                          <div id="teams" className="pr-2.5 basis-2/3 border-r border-black/10">
                            <div id="team1" className={`flex justify-between items-center ${isFinished && homeTeamWin ? 'font-bold' : 'font-normal'}`}>
                              <div className="team-data flex items-center gap-2.5">
                                <img src={homeTeamLogo?.logo} alt={game.homeTeam_name} className="rounded-full w-6 aspect-square" />
                                <span>{game.homeTeam_name}</span>
                              </div>
                              <div className="team-score">
                                <span>{game.homeTeam_score}</span>
                              </div>
                            </div>
                            <div id="team2" className={`flex justify-between items-center ${isFinished && !homeTeamWin ? 'font-bold' : 'font-normal'}`}>
                              <div className="team-data flex items-center gap-2.5">
                                <img src={awayTeamLogo?.logo} alt={game.awayTeam_name} className="rounded-full w-6 aspect-square" />
                                <span>{game.awayTeam_name}</span>
                              </div>
                              <div className="team-score">
                                <span>{game.awayTeam_score}</span>
                              </div>
                            </div>
                          </div>
                          <div id="schedule" className="pl-2.5 basis-1/3 text-xs text-center">
                            {isFinished
                              ? <span>{"Final"} <br /> {formatDate(game.gameDate, {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                              })}</span>
                              : (<span>{formatDate(game.gameDate, {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                              })} <br /> {game.gameStatusText} </span>)
                            }
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div >
            )
          })
        }
      </div>
    </div>
  )
}

function VirtualStandingList({ nbaData }) {
  const [selectedConference, setSelectedConference] = useState("eastern") // eastern | western
  const [conferenceToShow, setConferenceToShow] = useState(null)
  const { east, west } = nbaData || {}

  useEffect(() => {
    if (selectedConference === 'eastern') {
      setConferenceToShow(east)
    } else {
      setConferenceToShow(west)
    }
  }, [selectedConference, east, west])

  const handleClick = (conference) => setSelectedConference(conference)
  return (
    <div className="">
      <div className="header border-b border-black/15 flex [&>*]:basis-1/2 items-center cursor-pointer font-semibold">
        <span
          onClick={() => handleClick('eastern')}
          className={clsx(
            `w-full border-b-2 py-4 text-center`,
            selectedConference === 'eastern' ? "border-[var(--light-navy)]" : "border-transparent"
          )}>Eastern Conference</span>
        <span
          onClick={() => handleClick('western')}
          className={clsx(
            `w-full border-b-2 py-4 text-center`,
            selectedConference === 'western' ? "border-[var(--light-navy)]" : "border-transparent"
          )}>Western Conference</span>
      </div>
      {/* WINS, LOSSES, WinPCT,ConferenceGamesBack, ConferenceRecord, ROAD, HOME, L10, strCurrentStreak, PlayoffRank */}
      <div className="p-3 pt-0">
        <table className="custom-table w-full">
          <thead>
            <tr>
              <td>Team</td>
              <td>W</td>
              <td>L</td>
              <td>Pct</td>
              <td>GB</td>
              <td>Conf</td>
              <td>Home</td>
              <td>Away</td>
              <td>L10</td>
              <td>Strk</td>
            </tr>
          </thead>
          <tbody>
            {
              conferenceToShow && conferenceToShow.map(team => {
                const teamLogo = nbaLogos.filter(tm => tm.teamId === team.TeamID)[0].logo
                return (
                  <tr key={team.TeamID}>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <img src={teamLogo} alt={team.TeamName} className="w-6 aspect-square" />
                        <span className="">{team.TeamName}</span>
                      </div>
                    </td>
                    <td>{team.WINS}</td>
                    <td>{team.LOSSES}</td>
                    <td>{team.WinPCT}</td>
                    <td>{team.ConferenceGamesBack}</td>
                    <td>{team.ConferenceRecord}</td>
                    <td>{team.HOME}</td>
                    <td>{team.ROAD}</td>
                    <td>{team.L10}</td>
                    <td>{team.strCurrentStreak}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <style>
        {
          `.custom-table {
              width: '100%';
              border-collapse: collapse;
            }
            .custom-table thead {
              font-size: 12px;
            }
            .custom-table tbody {
              font-size: 14px;
            }
            .custom-table th:first-child,
            .custom-table td:first-child {
              width: 48%;
            }
            .custom-table td:not(:first-child),
            .custom-table td:not(:first-child) {
              width: 5.77%;
              text-align: center;
            }
            .custom-table, 
            .custom-table th, 
            .custom-table td {
              border-bottom: 1px solid #0000002d;
              padding: 10px 2px;
            }
          `
        }
      </style>
    </div>
  )
}

function VirtualPlayersList({ nbaData }) {
  const positions = [
    { "G": "Guard" },
    { "F": "Forward" },
    { "C": "Center" },
    { "P-G": "Point Guard" },
    { "S-G": "Shooting Guard" },
    { "F-G": "Forward-Guard" },
    { "G-F": "Guard-Forward" },
    { "C-F": "Center-Forward" },
    { "F-C": "Forward-Center" },
  ]
  return (
    <div className="w-full h-auto flex justify-evenly flex-wrap gap-2.5 p-2.5">
      {!nbaData && (<div>Loading data...</div>)}
      {
        nbaData && nbaData?.map(player => {
          const playerIndex = nbaPlayers.findIndex(plyr => plyr.Name.toLowerCase() === player.player_name.toLowerCase())
          const playerPosition = positions.find(pos => {
            if (Object.keys(pos)[0].toLowerCase() === player.player_position.toLowerCase()) {
              return pos
            }
          })
          return (
            <div key={player.player_id} className="w-28 h-40 shadow-[var(--bs-cards)] rounded-lg overflow-hidden">
              <div className="player-image h-1/2 overflow-hidden">
                <img
                  onError={(e) => e.target.src = "/images/no-image/no-image-available.png"}
                  src={nbaPlayers[playerIndex]?.PreferredHostedHeadshotUrl}
                  alt={player.player_name}
                  className="w-full h-full object-cover" />
              </div>
              <div className="player-info pl-2.5 flex flex-col h-1/2 justify-center">
                <span className="text-xs">{player.player_name}</span>
                <span className="text-xs">{playerPosition[player.player_position]}</span>
                <span className="flex gap-1.5 items-center">
                  <img src={nbaLogos.filter(logo => logo.teamId === player.team_id)[0].logo} alt={player.team_name} className="w-4 aspect-square" />
                  <span className="text-xs">{player.team_name.length > 12 ? player.team_name.slice(0, 9) + "..." : player.team_name}</span>
                </span>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}