import { useState, useEffect, useRef } from "react"
import { Form, useLocation, useNavigation } from "react-router-dom"
import { useAppContext } from "../../hooks/UseContextProvider"
import MobileMenu from "../mobilemenu/MobileMenu"
import Spinner from "../spinner/Spinner"

export default function UserSearch({ mobileMenuIsOpen, setMobileMenuIsOpen, mobileActive }) {
  return (
    <div id="user-search-container" className={`flex items-center w-full justify-end ${mobileActive && mobileMenuIsOpen ? 'relative' : ''}`}>
      <div className={`user-search flex ${mobileActive && mobileMenuIsOpen ? 'absolute top-20 w-[80vw] sm:w-11/12' : 'w-11/12'}`}>
        <Search
          mobileActive={mobileActive}
          mobileMenuIsOpen={mobileMenuIsOpen}
        />
        <User
          mobileActive={mobileActive}
          mobileMenuIsOpen={mobileMenuIsOpen}
        />
      </div>
      <MobileMenu
        mobileMenuIsOpen={mobileMenuIsOpen}
        setMobileMenuIsOpen={setMobileMenuIsOpen}
        mobileActive={mobileActive}
      />
    </div>
  )
}

function Search({ mobileActive, mobileMenuIsOpen }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation();
  const location = useLocation();
  const previousPathRef = useRef(location.pathname)

  const { previousPath, savePrevPath } = useAppContext();

  useEffect(() => {
    if (navigation.state === 'idle' && previousPathRef.current !== previousPath) {
      savePrevPath(previousPathRef.current)
      previousPathRef.current = location.pathname
    }
  }, [location.pathname, previousPathRef.current])

  return (
    <>
      {navigation.state === 'loading' && <Spinner />}
      <div id="search-container" className={`w-full ${mobileActive && !mobileMenuIsOpen ?
        'hidden' :
        mobileActive && mobileMenuIsOpen ?
          'block' : ''}`
      }>
        <Form action="/search" method="get" role="search">
          <div className="form-group relative mr-2 flex justify-end items-center flex-nowrap ">
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              name="q"
              id="search"
              placeholder="Search"
              value={searchTerm}
              required
              className={`rounded-full pl-[15px] shadow-(--bs-lightBlue) w-9 h-9 transition-(--transition)
              ${mobileMenuIsOpen ? 'hover:w-full  focus:w-full' : 'hover:w-11/12 focus:w-11/12'} 
              focus:transition-(--transition) transition-(--transition) outline-0`}
            />
            <label htmlFor="search" className="absolute bg-(--light-navy) rounded-full">
              <i className="fa-sharp fa-solid fa-magnifying-glass p-2.5 cursor-pointer  w-9 h-9"></i>
            </label>
          </div>
        </Form>
      </div >
    </>
  )
}

function User({ mobileActive, mobileMenuIsOpen }) {
  return (
    <div id="user-container" className={`${mobileActive && !mobileMenuIsOpen ? 'hidden' : 'block'}`}>
      <i className="fa-sharp fa-solid fa-user w-9 h-9 bg-(--red) shadow-(--bs-lightBlue) cursor-pointer
       rounded-full text-(--aqua) p-2.5"></i>
    </div>
  )
}