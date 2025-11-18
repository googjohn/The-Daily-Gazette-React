import GameSchedules from "./GameSchedules.jsx";
import TeamStandings from "./TeamStandings.jsx";
import PlayerList from "./PlayerList.jsx";

export function MainFrameContent({ mainFrameData, categorySelected, sportsSelected }) {

  // const loading = !mainFrameData?.frameData[categorySelected]
  // && mainFrameData?.frameData[categorySelected]?.error
  return (
    <div id="frame-content" className="h-[590px] overflow-auto">
      {
        categorySelected === 'GAMES'
          ? (
            <div className="h-full">
              <GameSchedules
                framedata={mainFrameData}
                sportsSelected={sportsSelected}
                categorySelected={categorySelected}
              />
            </div>
          )
          : categorySelected === 'STANDINGS'
            ? (
              <div className="h-full">
                <TeamStandings
                  framedata={mainFrameData}
                  sportsSelected={sportsSelected}
                />
              </div>
            )
            : (
              <div className="h-full">
                <PlayerList
                  framedata={mainFrameData}
                  sportsSelected={sportsSelected}
                />
              </div>
            )
      }
    </div>
  )
}

export function SubFrameContent({ subFrameData, categorySelected, sportsSelected }) {
  return (
    <div className="h-74 overflow-auto cursor-pointer">
      <GameSchedules
        framedata={subFrameData}
        sportsSelected={sportsSelected}
        categorySelected={categorySelected}
      />
    </div>
  )
}