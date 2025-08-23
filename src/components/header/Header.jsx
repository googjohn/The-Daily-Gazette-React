import AppLogo from "./AppLogo";
import Navigation from "../navigation/Navigation";
import UserSearch from "./UserAndSearch";
import { useState, useEffect } from "react";
import useWindowSize from "../../hooks/UseWindowSize";

const BREAKPOINTS = {
  MINI: 640,
  MOBILE: 768,
  TABLET: 890,
  DESKTOP: 980
}

export default function Header() {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const [mobileActive, setMobileActive] = useState(false);
  const windowSize = useWindowSize();

  useEffect(() => {
    const isMobile = windowSize.width <= BREAKPOINTS.MOBILE
    setMobileActive(isMobile)

    if (!mobileActive && mobileMenuIsOpen) {
      setMobileMenuIsOpen(false)
    }

  }, [windowSize.width])

  return (
    <header className={`fixed max-w-full top-0 left-0 z-100 w-full bg-(--light-navy)`}>
      <div id="nav" className={`max-w-[1536px] w-11/12 h-20 m-auto flex [&>*]:basis-1/2 md:[&>*]:basis-1/3 justify-between items-center ${mobileMenuIsOpen ? '' : ''}`}>
        <AppLogo />
        <Navigation
          mobileMenuIsOpen={mobileMenuIsOpen}
          mobileActive={mobileActive}
          windowSize={windowSize}
        />
        <UserSearch
          mobileMenuIsOpen={mobileMenuIsOpen}
          setMobileMenuIsOpen={setMobileMenuIsOpen}
          mobileActive={mobileActive}
          setMobileActive={setMobileActive}
        />
      </div>
    </header>
  )
}