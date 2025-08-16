import { useState, useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom"

export default function Navigation() {
  const location = useLocation();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  const linkClassess = "p-1 border-b-2"
  const navLinkBaseClasses = "p-2.5 cursor-pointer"

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

  if (windowSize.width <= 890) {
    const listToRemove = [];
    if (['home', 'finance', 'sports'].includes(activeLink.id)) {
      listToRemove.push('entertainment', 'scienceAndTechnology')
    } else if (['entertainment', 'scienceAndTechnology'].includes(activeLink.id)) {
      listToRemove.push('sports', ...['entertainment', 'scienceAndTechnology'].filter(list => list !== activeLink.id))
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
  return (
    <>
      <nav id="navigation" className="hidden md:block">
        <ul className="flex gap-2">
          {
            linkListToUse.map((link) => (
              <li key={link.id} className={linkClassess}>
                <NavLink
                  id={link.id}
                  to={link.src}
                  style={({ isActive }) => ({ color: isActive ? 'var(--red)' : '' })}
                  className={navLinkBaseClasses}
                >
                  {link.name}
                </NavLink>
              </li>
            ))
          }
        </ul>
      </nav >
    </>
  )
}