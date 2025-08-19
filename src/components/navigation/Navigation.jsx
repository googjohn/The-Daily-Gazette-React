import { useState, useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom"

export default function Navigation({ mobileMenuIsOpen, setMobileMenuIsOpen, mobileActive, setMobileActive }) {
  const location = useLocation();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  const linkClassess = "relative p-1"
  const navLinkBaseClasses = "navLink-hover cursor-pointer"

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])


  const linkList = [
    { id: 'home', name: 'Home', src: '/' },
    { id: 'finance', name: 'Finance', src: '/finance' },
    { id: 'entertainment', name: 'Entertainment', src: '/entertainment' },
    { id: 'scienceAndTechnology', name: 'Sci&Tech', src: '/scienceTechnology' },
    { id: 'sports', name: 'Sports', src: '/sports' }
  ]
  let linkListToUse = linkList;

  const activeLink = linkList.find(list => list.src === location.pathname) || linkList[0]
  if (windowSize.width > 768) {
    setMobileActive(false)
  } else {
    setMobileActive(true)
  }

  if (windowSize.width <= 890) {
    const listToRemove = [];
    if (!mobileActive) {
      setMobileMenuIsOpen(false)
      if (!['home', 'finance', 'sports'].includes(activeLink.id)) {
        listToRemove.push('sports', ...['entertainment', 'scienceAndTechnology'].filter(list => list !== activeLink.id))
      } else {
        listToRemove.push('entertainment', 'scienceAndTechnology')
      }
    }

    linkListToUse = linkList.filter(list => !listToRemove.includes(list.id))
  } else if (windowSize.width <= 980) {
    const listToRemove = [];
    if (['home', 'finance', 'entertainment', 'sports'].includes(activeLink.id)) {
      listToRemove.push('scienceAndTechnology')
    } else {
      listToRemove.push('entertainment')
    }

    linkListToUse = linkList.filter(list => !listToRemove.includes(list.id))
  }

  const menuActiveCloseClasses = `relative hidden`
  const menuActiveOpenClasses = `absolute top-0 right-0 h-screen flex items-start justify-center`
  return (
    <nav id="navigation" className={`${mobileActive && !mobileMenuIsOpen ? menuActiveCloseClasses : mobileActive && mobileMenuIsOpen ? menuActiveOpenClasses : 'flex items-center justify-center'} bg-(--light-navy) w-full opacity-95 sm:w-1/2`}>
      <ul className={`flex ${mobileMenuIsOpen && mobileActive ? 'flex-col mt-40' : ''} justify-between items-center gap-4 md:pt-0 md:gap-2`}>
        {
          linkListToUse.map((link) => (
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