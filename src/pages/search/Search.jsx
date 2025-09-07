import { Form, NavLink, useLoaderData, useLocation, useNavigate, useNavigation } from "react-router-dom";
import { useState } from "react";
import Card from "../../components/card/Card";
import { FaList } from "react-icons/fa6";
import { IoGridOutline } from "react-icons/io5";
import { LuArrowLeftFromLine } from "react-icons/lu";
import Spinner from "../../components/spinner/Spinner";
import { useAppContext } from "../../hooks/UseContextProvider";

const LINK_LIST = [
  { id: 'home', name: 'Home', src: '/' },
  { id: 'finance', name: 'Finance', src: '/finance' },
  { id: 'entertainment', name: 'Entertainment', src: '/entertainment' },
  { id: 'scienceAndTechnology', name: 'Sci&Tech', src: '/scienceTechnology' },
  { id: 'sports', name: 'Sports', src: '/sports' }
]

export default function Search() {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const [view, setView] = useState('grid');
  const { result, query } = useLoaderData();
  const [searchTerm, setSearchTerm] = useState(query)
  const navigation = useNavigation();
  const { previousPath } = useAppContext()

  const slicedResult = result.articles.length > 24 ? result.articles.slice(0, 24) : result.articles.slice()

  return (
    <>
      {navigation.state === 'loading' && <Spinner />}
      <div id="search-page"
        className="w-full min-h-screen pb-10">
        <div className="container max-w-[1280px] mx-auto">
          <div id="search-container" className={`w-full mx-auto pt-20 flex flex-col justify-center items-center 
          sticky top-0 z-10 bg-[var(--light-navy)]`}>
            <GoBack previousPath={previousPath} />
            <SearchNavigation
              mobileMenuIsOpen={mobileMenuIsOpen} />
            <SearchMobileMenu
              mobileMenuIsOpen={mobileMenuIsOpen}
              setMobileMenuIsOpen={setMobileMenuIsOpen} />
            <h1 className="text-2xl p-2.5 text-center">Search for latest news</h1>
            <Form action="/search" method="get" role="search" className="w-full px-2.5 sm:p-0">
              <div className="form-group relative flex justify-center items-center">
                <input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="text"
                  name="q"
                  id="search"
                  placeholder="Search"
                  value={searchTerm}
                  className={`rounded-full pl-[15px] shadow-(--bs-lightBlue) w-full sm:w-8/12 h-9 
                transition-(--transition) focus:transition-(--transition) outline-0`}
                />
                <label htmlFor="search" className="absolute right-0 sm:right-[16.55%] 
              bg-(--light-navy) rounded-full">
                  <i className="fa-sharp fa-solid fa-magnifying-glass p-2.5 cursor-pointer  w-9 h-9"></i>
                </label>
              </div>
            </Form>

            <div id="list-grid-toggle" className="w-full sm:w-11/12 mx-auto p-2.5 mt-15 
          flex justify-between items-center text-[clamp(1.2rem,_2vw,_1.5rem)]">
              <div>
                <h2>Search Results for "{query}"</h2>
              </div>
              <div id="icon-toggle-container" className="flex gap-2.5  cursor-pointer">
                <FaList onClick={() => setView('list')} title="List view" />
                <IoGridOutline onClick={() => setView('grid')} title="Grid view" />
              </div>
            </div>
          </div>

          <div id="search-results" className="w-full sm:w-11/12 mx-auto max-w-[1272px] 
        m-auto bg-[var(--gray-10)] relative">
            {view === 'list' ? (
              <div className="aside-content h-auto text-black p-2.5">
                <ul>
                  {result && slicedResult.map((article, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2.5 shadow-(--bs-cards) 
                    [&:nth-child(even)]:bg-(--gray-10) [&:nth-child(odd)]:bg-(--gray-20)">

                      <span className="item-number basis-[45px] w-[45px] h-[60px] flex 
                    justify-center items-center text-white rounded-[50%] m-[5px] 
                    text-[clamp(1.2rem,_2vw,_1.5rem)] bg-(--navy)">{index + 1}</span>

                      <a href={article.url} target="_blank" className="text-black 
                    basis-[calc(100%-55px)] text-[clamp(.7rem,_1.5vw,_.8rem)] 
                    hover:underline">{article.title}</a>

                    </li>
                  ))}
                </ul>
              </div>
            ) : (

              <div id="search-card-container"
                className="p-2.5 flex flex-col grid-template-search sm:grid 
              sm:[&>*]:col-span-6 md:[&>*]:col-span-4 lg:[&>*]:col-span-3 gap-2.5">
                {
                  result && slicedResult.map((article, index) => (
                    <Card
                      key={index}
                      cardTitle={article.title}
                      cardImageSrc={article.urlToImage}
                      source={article.source}
                      link={article.url} />
                  ))
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export const SearchLoader = async ({ request }) => {
  const requestUrl = new URL(request.url);
  const query = requestUrl.searchParams.get("q");

  try {

    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${import.meta.env.VITE_NEWSAPIORG_API_KEY}`
    const response = await fetch(url)

    if (!response.ok) {
      const error = new Error('Fetch failed')
      error.statusCode = response.status
      throw error
    }
    const result = await response.json();
    return { result, query }
  } catch (error) {
    console.log(error)
  }
}

function SearchNavigation({ mobileMenuIsOpen }) {
  const linkClassess = "relative p-1"
  const navLinkBaseClasses = "navLink-hover text-[clamp(1.1rem,_2.5vw,1.3rem)] cursor-pointer"
  const menuActiveCloseClasses = `opacity-0 pointer-events-none h-0`
  const menuActiveOpenClasses = `opcaity-95 pointer-events-auto h-screen`

  return (
    <nav id="navigation" className={`${!mobileMenuIsOpen ?
      menuActiveCloseClasses : menuActiveOpenClasses} 
      transition-[var(--transition)] bg-(--light-navy) w-full
      absolute top-0 right-0 sm:w-1/2 md:w-2/5 lg:w-1/3 z-50`}>

      <ul className={`flex flex-col justify-start items-center gap-4 pt-25`}>
        {
          LINK_LIST.map((link) => (
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

function SearchMobileMenu({ mobileMenuIsOpen, setMobileMenuIsOpen }) {
  const handleClick = () => setMobileMenuIsOpen(!mobileMenuIsOpen)
  const spanClass = `block w-[30px] h-1 my-[5px] bg-(--red) shadow-(--bs-lightBlue) transition-(--transition) `

  return (
    <div id="mobile-menu" className={`absolute top-5 right-[1%] sm:right-[4.3%] z-50 ${mobileMenuIsOpen ? 'isOpen' : ''}`} title="Open menu">
      <button
        type="button"
        id="mobile-nav-btn"
        className={`nav-toggle p-2.5 w-full h-full cursor-pointer`}
        onClick={handleClick}
      >
        <span className={`mobile-btn ${spanClass} ${mobileMenuIsOpen ? 'close-btn' : ''}`}></span>
        <span className={`mobile-btn ${spanClass} ${mobileMenuIsOpen ? 'close-btn' : ''}`}></span>
        <span className={`mobile-btn ${spanClass} ${mobileMenuIsOpen ? 'close-btn' : ''}`}></span>
      </button>
    </div>
  )
}

function GoBack({ previousPath }) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      if (window.history.length > 1) {
        navigate(-1)
      } else if (previousPath) {
        navigate(previousPath)
      } else {
        navigate('/')
      }
    }
  }
  return (
    <div onClick={handleClick} className="absolute p-2.5 top-5 left-10 text-3xl flex items-center gap-2.5"
      title="Go back">
      <LuArrowLeftFromLine />
    </div>
  )
}