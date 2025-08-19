import AppLogo from "./AppLogo";
import Navigation from "../navigation/Navigation";
import UserSearch from "./UserAndSearch";
import { useState } from "react";

export default function Header() {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const [mobileActive, setMobileActive] = useState(false);

  return (
    <header className={`fixed max-w-full top-0 left-0 z-100 w-full bg-(--light-navy)`}>
      <div id="nav" className={`max-w-[1536px] w-11/12 h-20 m-auto flex [&>*]:basis-1/2 md:[&>*]:basis-1/3 justify-between items-center ${mobileMenuIsOpen ? '' : ''}`}>
        <AppLogo />
        <Navigation
          mobileMenuIsOpen={mobileMenuIsOpen}
          setMobileMenuIsOpen={setMobileMenuIsOpen}
          mobileActive={mobileActive}
          setMobileActive={setMobileActive}
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