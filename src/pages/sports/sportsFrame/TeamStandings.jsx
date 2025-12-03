import { useState, useEffect } from "react"
import { mlbLogos } from "../../../data/mlbLogos"
import useWindowSize from "../../../hooks/UseWindowSize"
import noImage from "/images/no-image/no-image-available.png"
import clsx from "clsx"
import { StandingsSkeleton } from "../../../components/skeleton/Skeleton"

export default function TeamStandings({ framedata, sportsSelected }) {
  const data = framedata?.frameData?.STANDINGS || {}
  const { windowSize } = useWindowSize();

  // for initial data
  const conferenceData = sportsSelected === "NBA"
    ? data?.west
    : data?.american_league

  const [selectedConference, setSelectedConference] = useState("western") // western/americanLeague | eastern/nationalLeague
  const [conferenceToShow, setConferenceToShow] = useState(conferenceData)

  useEffect(() => {
    if (sportsSelected === 'NBA') {
      if (selectedConference === 'western') {
        setConferenceToShow(data?.west)
      } else {
        setConferenceToShow(data?.east)
      }
    }

    if (sportsSelected === 'MLB') {
      if (selectedConference === 'western') {
        setConferenceToShow(data?.american_league)
      } else {
        setConferenceToShow(data?.national_league)
      }
    }
    if (sportsSelected === 'SOCCER') {
      setConferenceToShow(framedata?.frameData?.STANDINGS)
    }
  },
    [
      selectedConference,
      sportsSelected,
      data?.american_league,
      data?.national_league,
      data?.west,
      data?.east,
      framedata
    ])

  const handleClick = (conference) => setSelectedConference(conference)

  return (
    <div className="w-full h-full">
      {sportsSelected === 'SOCCER'
        ? <div className="header border-b border-black/15 font-semibold py-4">Table</div>
        : <div className="header border-b border-black/15 flex [&>*]:basis-1/2 items-center cursor-pointer font-semibold">
          <span
            onClick={() => handleClick('western')}
            className={clsx(
              `w-full border-b-2 py-4 text-center`,
              selectedConference === 'western' ? "border-[var(--light-navy)]" : "border-transparent"
            )}>
            {sportsSelected === 'NBA' ? 'Western Conference' : 'American League'}
          </span>
          <span
            onClick={() => handleClick('eastern')}
            className={clsx(
              `w-full border-b-2 py-4 text-center`,
              selectedConference === 'eastern' ? "border-[var(--light-navy)]" : "border-transparent"
            )}>
            {sportsSelected === 'NBA' ? "Eastern Conference" : "National League"}
          </span>
        </div>}
      {/* WINS, LOSSES, WinPCT,ConferenceGamesBack, ConferenceRecord, ROAD, HOME, L10, strCurrentStreak, PlayoffRank */}
      <div className="p-3 pt-0">
        <table className="custom-table w-full">
          <thead>
            <tr>
              <td>{sportsSelected === "SOCCER" ? 'Club' : 'Team'}</td>
              {sportsSelected === "SOCCER" && <td>MP</td>}
              <td>W</td>
              {sportsSelected === "SOCCER" && <td>D</td>}
              <td>L</td>
              {(windowSize.width < 1136 ? true : sportsSelected !== "SOCCER" && (windowSize.width >= 640 && <td>Pct</td>))}
              {(windowSize.width < 920 && sportsSelected === "SOCCER" ? true : sportsSelected === "SOCCER" ? <td>GT</td> : <td>GB</td>)}
              {(windowSize.width < 1024 ? true : sportsSelected === "SOCCER" ? <td>GA</td> : <td>Home</td>)}
              {(windowSize.width < 1024 ? true : sportsSelected === "SOCCER" ? <td>GD</td> : <td>Away</td>)}
              {(windowSize.width < 768 && sportsSelected === "SOCCER" ? true : sportsSelected === "SOCCER" ? <td>Last 5</td> : <td>L10</td>)}
              {sportsSelected !== "SOCCER" && <td>Strk</td>}
            </tr>
          </thead>
          <tbody>
            {
              !conferenceToShow
                ? (
                  <tr>
                    <td colSpan={9}>
                      <StandingsSkeleton />
                    </td>
                  </tr>
                )
                : conferenceToShow?.map(team => {

                  const teamLogo = sportsSelected === 'MLB'
                    ? mlbLogos.find(t => t.teamId === team?.team_id)?.logo
                    : team?.team_logo

                  const teamName = (() => {

                    return (sportsSelected === 'NBA') ?
                      team?.team_name :
                      team?.team_clubname
                  })()

                  return (
                    <tr key={team.team_id}>
                      <td>
                        <div className="flex items-center gap-2.5">
                          <img
                            onError={(e) => e.target.src = noImage}
                            src={teamLogo || noImage}
                            alt={teamName}
                            className="w-6 aspect-square"
                          />
                          <span className="">{teamName}</span>
                        </div>
                      </td>
                      {sportsSelected === "SOCCER" && <td>{team.played_games}</td>}
                      <td>{team.wins}</td>
                      {sportsSelected === "SOCCER" && <td>{team.ties}</td>}
                      <td>{team.losses}</td>
                      {(windowSize.width < 1136 ? true : sportsSelected !== "SOCCER" && (windowSize.width >= 640 && <td>{team.winpct}</td>))}
                      {(windowSize.width < 920 && sportsSelected === "SOCCER" ? true : sportsSelected === "SOCCER" ? <td>{team.goals_total}</td> : <td>{team.conferenceGamesBack}</td>)}
                      {(windowSize.width < 1024 ? true : sportsSelected === "SOCCER" ? <td>{team.goals_against}</td> : <td>{team.home}</td>)}
                      {(windowSize.width < 1024 ? true : sportsSelected === "SOCCER" ? <td>{team.goal_difference}</td> : <td>{team.road}</td>)}
                      {(windowSize.width < 768 && sportsSelected === 'SOCCER' ? true : sportsSelected === "SOCCER" ? <td className="whitespace-nowrap">{team?.last_five?.split(',').join(' ')}</td> : <td>{team.lastTen}</td>)}
                      {sportsSelected !== "SOCCER" && <td>{team.currentStreak}</td>}
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
              width: ${sportsSelected === "SOCCER" ? '37%' : '40%'};
            }
            .custom-table td:not(:first-child),
            .custom-table td:not(:first-child) {
              width: ${windowSize < 640 ? '10%' : '6.77%'};
              min-width: 32px;
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