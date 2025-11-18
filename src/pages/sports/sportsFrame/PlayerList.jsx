import ErrorPage from "../../../components/error/ErrorPage"
import Spinner from "../../../components/spinner/Spinner"
import { mlbLogos } from "../../../data/mlbLogos"
import { mlbPlayers } from "../../../data/mlbPlayers"
import { nbaLogos } from "../../../data/nbaLogos"
import { nbaPlayers } from "../../../data/nbaPlayers"
import { soccerPlayers } from "../../../data/soccerPlayers"
import noImage from "/images/no-image/no-image-available.png"

export default function PlayerList({ framedata, sportsSelected, categorySelected }) {
  const nbaPositions = [
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
  const sportsPlayers = sportsSelected === 'NBA'
    ? nbaPlayers
    : sportsSelected === "MLB"
      ? mlbPlayers
      : soccerPlayers

  const sportsLogos = sportsSelected === 'NBA'
    ? nbaLogos
    : mlbLogos

  const loading = !framedata?.frameData[categorySelected]
  const isError = framedata?.frameData[categorySelected]?.error

  if (isError) return (<ErrorPage error={framedata?.frameData[categorySelected]?.error} />)

  return (
    <div className="w-full h-auto flex justify-evenly flex-wrap gap-2.5 p-2.5">
      {/* {loading ** <div>Loading data...</div> } */}
      {framedata?.frameData?.PLAYERS?.map(player => {
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

        const teamLogo = sportsSelected === 'SOCCER' ? player?.team_crest : sportsLogos.find(logo => logo.teamId === player.team_id).logo
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
              <span className="text-xs">{player.player_position}</span>
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