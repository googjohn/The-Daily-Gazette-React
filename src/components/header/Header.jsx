import AppLogo from "./AppLogo";
import Navigation from "../navigation/Navigation";
import UserSearch from "./UserAndSearch";

export default function Header() {
  return (
    <>
      <header className="fixed max-w-full top-0 left-0 z-10 w-full bg-(--light-navy)">
        <div id="nav" className="max-w-[1536px] w-11/12 h-20 m-auto flex [&>*]:basis-1/3 justify-between items-center ">
          <AppLogo />
          <Navigation />
          <UserSearch />
        </div>
      </header>
    </>
  )
}