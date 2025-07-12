import { NavLink } from "react-router-dom"
export default function Navigation() {
  const linkList = [
    { id: 0, name: 'Home', src: '/' },
    { id: 1, name: 'Finance', src: '/finance' },
    { id: 2, name: 'Entertainment', src: '/entertainment' },
    { id: 3, name: 'Sci&Tech', src: '/scienceTechnology' },
    { id: 4, name: 'Sports', src: '/sports' }
  ]

  const linkClassess = "p-1 border-b-2"
  return (
    <>
      <nav id="navigation">
        <ul className="flex gap-2">
          {
            linkList.map((link) => (
              <li key={link.id} className={linkClassess}>
                <NavLink to={link.src} style={() => {
                  if (location.pathname === link.src) {
                    return {
                      color: 'var(--red)'
                    }
                  }
                }} className="p-2.5 cursor-pointer">{link.name}</NavLink>
              </li>
            ))
          }
        </ul>
      </nav >
    </>
  )
}