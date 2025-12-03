import { mlbLogos } from "../../../data/mlbLogos"
import { mlbPlayers } from "../../../data/mlbPlayers"
import { nbaPlayers } from "../../../data/nbaPlayers"
import { soccerPlayers } from "../../../data/soccerPlayers"
import noImage from "/images/no-image/no-image-available.png"
import useWindowSize from "../../../hooks/UseWindowSize"

const playersMap = {
  'NBA': nbaPlayers,
  'MLB': mlbPlayers,
  'SOCCER': soccerPlayers
}

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

export default function PlayerList({ framedata, sportsSelected }) {
  const { windowSize } = useWindowSize()

  return (
    <div className="w-full h-auto flex justify-evenly flex-wrap gap-2.5 p-2.5">
      {framedata?.frameData?.PLAYERS &&
        framedata?.frameData?.PLAYERS?.map(player => {

          const playerImage = playersMap[sportsSelected].find(p => {
            if (p.Name === player?.player_name) return p

            let playerNameArr = player?.player_name.toLowerCase().split(' ')
            let plyrNameArr = p?.Name?.toLowerCase().split(' ')
            let playerFirstName = playerNameArr[0]
            let plyrFirstName = plyrNameArr[0]
            let playerLastName = playerNameArr[playerNameArr.length - 1]
            let plyrLastName = plyrNameArr[plyrNameArr.length - 1]

            if (playerLastName === plyrLastName && (plyrFirstName && playerFirstName[0] === plyrFirstName[0])) {
              return p
            }
          }).PreferredHostedHeadshotUrl

          const teamLogo = sportsSelected === 'MLB'
            ? mlbLogos.find(t => t.teamId === player?.team_id).logo
            : player?.team_logo

          const playerPosition = sportsSelected === 'NBA'
            ? nbaPositions.find((pos) => {
              for (const key in pos) {
                if (key === player.player_position) return pos
              }
            })[player.player_position]
            : player.player_position

          let teamName;
          if (windowSize.width < 640) {
            teamName = player.team_key
          } else {
            teamName = sportsSelected === 'NBA' ?
              player.team_name :
              player.team_clubname
          }

          return (
            <div key={player.player_id} className="w-28 h-40 shadow-[var(--bs-cards)] rounded-lg overflow-hidden">
              <div className="player-image h-1/2 overflow-hidden">
                <img
                  onError={(e) => e.target.src = noImage}
                  src={playerImage || noImage}
                  alt={player.player_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="player-info text-center flex flex-col h-1/2 justify-center">
                <span className="text-xs">{player.player_name}</span>
                <span className="text-xs">{playerPosition}</span>
                <span className="flex gap-1.5 items-center justify-center">
                  <img
                    onError={(e) => e.target.src = noImage}
                    src={teamLogo || noImage}
                    alt={teamName}
                    className="w-4 aspect-square"
                  />
                  <span className="text-xs">{teamName}</span>
                </span>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}