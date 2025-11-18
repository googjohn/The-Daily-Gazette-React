import clsx from "clsx";

export function MainFrameHeader({ mainFrameData, categorySelected, sportsSelected, handleClick }) {
  // bg-[#0c4f92], bg-[#073b70da]
  return (
    <div
      id="frame-header"
      className="bg-[var(--light-navy)] shadow-[var(--shadow-bottom)] rounded-t-lg">
      <div
        id="header-logo"
        className="flex items-center gap-2.5 py-2.5 pl-2.5"
      >
        <img
          src={mainFrameData.frameLogo}
          className="h-10"
          alt="League logo"
        />
        <span className="text-white font-bold">
          {
            sportsSelected === 'SOCCER' ? 'Premier League' : mainFrameData.frameName
          }
        </span>
      </div>

      <div
        id="header-navigation"
        className=""
      >
        <ul
          className="flex items-center justify-around w-full"
        >
          {
            ['GAMES', 'STANDINGS', 'PLAYERS'].map((selection, index) => (
              <li key={index}
                onClick={() => handleClick(selection)}
                className={clsx(
                  'text-white border-transparent border-b-2 py-2.5 basis-1/3 text-center cursor-default hover:bg-[var(--lightest-navy)]',
                  {
                    'bg-[var(--lightest-navy)] border-white font-bold': categorySelected.toLowerCase() === selection.toLowerCase(),
                  }
                )}
              >{selection}</li>
            ))
          }
        </ul>
      </div>

    </div>
  )
}

export function SubFrameHeader({ subFrameData }) {
  const title = subFrameData?.frameTitle.replace('Stats and', '')
  return (
    <div className="subframe-header">
      <div className="h-10 text-white flex items-center justify-start pl-2.5 bg-[var(--light-navy)] shadow-[var(--shadow-bottom)] rounded-t-lg">
        {title}
      </div>
    </div>
  )
}