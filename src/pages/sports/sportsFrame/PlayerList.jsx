import { useMemo } from "react"
import { mlbLogos } from "../../../data/mlbLogos"
import { mlbPlayers } from "../../../data/mlbPlayers"
import { nbaLogos } from "../../../data/nbaLogos"
import { nbaPlayers } from "../../../data/nbaPlayers"
import { soccerPlayers } from "../../../data/soccerPlayers"
import noImage from "/images/no-image/no-image-available.png"

export default function PlayerList({ framedata, sportsSelected }) {
  const nbaPositions = [
    { "G": "Guard" },
    { "F": "Forward" },
    { "SF": "Small Forward" },
    { "PF": "Power Forward" },
    { "C": "Center" },
    { "PG": "Point Guard" },
    { "SG": "Shooting Guard" },
    { "FG": "Forward-Guard" },
    { "GF": "Guard-Forward" },
    { "CF": "Center-Forward" },
    { "FC": "Forward-Center" },
  ]

  const sportsPlayers = useMemo(() => {
    return sportsSelected === 'NBA'
      ? nbaPlayers
      : sportsSelected === "MLB"
        ? mlbPlayers
        : soccerPlayers
  }, [sportsSelected])

  const sportsLogos = useMemo(() => {
    return sportsSelected === 'NBA'
      ? nbaLogos
      : mlbLogos
  }, [sportsSelected])

  return (
    <div className="w-full h-auto flex justify-evenly flex-wrap gap-2.5 p-2.5">
      {framedata?.frameData?.PLAYERS &&
        framedata?.frameData?.PLAYERS?.map(player => {
          const playerHeadshot = sportsPlayers?.find(plyr => {
            if (player?.player_name === plyr?.Name) {
              return plyr
            }

            let playerNameArr = player?.player_name?.toLowerCase().split(' ')
            let plyrNameArr = plyr?.Name?.toLowerCase().split(' ')
            let playerFirstName = playerNameArr[0]
            let plyrFirstName = plyrNameArr[0]
            let playerLastName = playerNameArr[playerNameArr.length - 1]
            let plyrLastName = plyrNameArr[plyrNameArr.length - 1]

            if (playerLastName === plyrLastName && (plyrFirstName && playerFirstName[0] === plyrFirstName[0])) {
              return plyr
            }

          })

          const teamLogo = sportsSelected === 'SOCCER'
            ? player?.team_crest
            : sportsLogos.find(logo => logo.teamId === player.team_id).logo

          const player_position = sportsSelected === 'NBA'
            ? nbaPositions.find((pos) => {
              for (const key in pos) {
                if (key === player.player_position) return pos
              }
            })[player.player_position]
            : player.player_position

          return (
            <div key={player.player_id} className="w-28 h-40 shadow-[var(--bs-cards)] rounded-lg overflow-hidden">
              <div className="player-image h-1/2 overflow-hidden">
                <img
                  onError={(e) => e.target.src = noImage}
                  src={playerHeadshot?.PreferredHostedHeadshotUrl || noImage}
                  alt={player.player_name}
                  className="w-full h-full object-cover" />
              </div>
              <div className="player-info text-center flex flex-col h-1/2 justify-center">
                <span className="text-xs">{player.player_name}</span>
                <span className="text-xs">{player_position}</span>
                <span className="flex gap-1.5 items-center justify-center">
                  <img src={teamLogo} alt={player.team_name} className="w-4 aspect-square" />
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