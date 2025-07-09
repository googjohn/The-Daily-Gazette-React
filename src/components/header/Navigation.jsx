export default function Navigation() {
  const linkList = [
    { name: 'Home', src: '/' },
    { name: 'Finance', src: '/finance-news' },
    { name: 'Entertainment', src: '/entertainment-news' },
    { name: 'Sci&Tech', src: '/sci&tech-news' },
    { name: 'Sports', src: '/sports-news' }
  ]

  const linkClassess = "p-1 border-b-2 cursor-pointer"
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
                <a href={link.src} className="p-2.5">{link.name}</a>
              </li>
            ))
          }
        </ul>
      </nav>
    </>
  )
}