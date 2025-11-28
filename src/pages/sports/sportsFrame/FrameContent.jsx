import GameSchedules from "./GameSchedules.jsx";
import TeamStandings from "./TeamStandings.jsx";
import PlayerList from "./PlayerList.jsx";

export function MainFrameContent({ mainFrameData, categorySelected, sportsSelected }) {

  return (
    <div id="frame-content" className="h-[590px] overflow-auto">
      {
        categorySelected === 'GAMES'
          ? (
            <GameSchedules
              framedata={mainFrameData}
              sportsSelected={sportsSelected}
            />
          )
          : categorySelected === 'STANDINGS'
            ? (
              <TeamStandings
                framedata={mainFrameData}
                sportsSelected={sportsSelected}
              />

            )
            : (
              <PlayerList
                framedata={mainFrameData}
                sportsSelected={sportsSelected}
              />

            )
      }
    </div>
  )
}

export function SubFrameContent({ subFrameData, sportsSelected }) {
  return (
    <div className={`h-76 overflow-auto`}>
      <GameSchedules
        framedata={subFrameData}
        sportsSelected={sportsSelected}
      />
    </div>
  )
}