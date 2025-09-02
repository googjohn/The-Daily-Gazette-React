import { NavLink, useLocation } from "react-router-dom"
import { useMemo } from "react";

const BREAKPOINTS = {
  MINI: 640,
  MOBILE: 768,
  TABLET: 890,
  DESKTOP: 980
}
const LINK_LIST = [
  { id: 'home', name: 'Home', src: '/' },
  { id: 'finance', name: 'Finance', src: '/finance' },
  { id: 'entertainment', name: 'Entertainment', src: '/entertainment' },
  { id: 'scienceAndTechnology', name: 'Sci&Tech', src: '/scienceTechnology' },
  { id: 'sports', name: 'Sports', src: '/sports' }
]

const getFilteredLinks = (mobileActive, activeLink, windowSize) => {
  if (windowSize.width <= BREAKPOINTS.TABLET) {
    if (!mobileActive) {
      const listToRemove = ['home', 'finance', 'sports'].includes(activeLink.id) ?
        ['entertainment', 'scienceAndTechnology'] :
        ['sports', activeLink.id === 'entertainment' ? 'scienceAndTechnology' : 'entertainment']

      return LINK_LIST.filter(list => !listToRemove.includes(list.id))
    }
  } else if (windowSize.width <= BREAKPOINTS.DESKTOP) {
    const activeId = activeLink.id;
    const listToRemove = ['home', 'finance', 'entertainment', 'sports'].includes(activeId) ?
      ['scienceAndTechnology'] :
      ['entertainment']

    return LINK_LIST.filter(list => !listToRemove.includes(list.id))
  }

  return LINK_LIST
}

export default function Navigation({ mobileMenuIsOpen, mobileActive, windowSize }) {
  const location = useLocation();

  const linkClassess = "relative p-1"
  const navLinkBaseClasses = "navLink-hover cursor-pointer"

  const activeLink = useMemo(() => {
    return LINK_LIST.find(list => list.src === location.pathname) || LINK_LIST[0]
  }, [location.pathname])

  const filteredLinkList = useMemo(() => {
    return getFilteredLinks(mobileActive, activeLink, windowSize)
  }, [mobileActive, activeLink, windowSize]);

  const menuActiveCloseClasses = `relative hidden`
  const menuActiveOpenClasses = `absolute top-0 right-0 h-screen flex items-start justify-center`
  return (
    <nav id="navigation" className={`${mobileActive && !mobileMenuIsOpen ?
      menuActiveCloseClasses :
      mobileActive && mobileMenuIsOpen ?
        menuActiveOpenClasses :
        'flex items-center justify-center'} 
        transition-[var(--transition)] bg-(--light-navy) w-full opacity-95 sm:w-1/2`}>
      <ul className={`flex ${mobileMenuIsOpen && mobileActive ? 'flex-col mt-40' : ''} transition-(--transition) justify-between items-center gap-4 md:pt-0 md:gap-2`}>
        {
          filteredLinkList.map((link) => (
            <li key={link.id} className={linkClassess}>
              <NavLink
                id={link.id}
                to={link.src}
                style={({ isActive }) => ({
                  color: isActive ? 'var(--red)' : '',
                  fontWeight: isActive ? '600' : ''
                })}
                className={navLinkBaseClasses}
              >
                {link.name}
              </NavLink>
            </li>
          ))
        }
      </ul>
    </nav >
  )
}