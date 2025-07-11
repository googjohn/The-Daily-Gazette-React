import { NavLink } from "react-router-dom"
export default function Navigation() {
  const linkList = [
    { name: 'Home', src: '/' },
    { name: 'Finance', src: '/finance' },
    { name: 'Entertainment', src: '/entertainment' },
    { name: 'Sci&Tech', src: '/scienceTechnology' },
    { name: 'Sports', src: '/sports' }
  ]

  const linkClassess = "p-1 border-b-2 border"
  return (
    <>
      <nav
        id="navigation"
        className=""
      >
        <ul className="flex gap-2">
          {
            linkList.map((link, i) => (
              <li key={i} className={linkClassess}>
                <NavLink to={link.src} className="p-2.5 cursor-pointer border">{link.name}</NavLink>
              </li>
            ))
          }
        </ul>
      </nav>
    </>
  )
}