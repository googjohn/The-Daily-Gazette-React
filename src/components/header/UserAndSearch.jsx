import { Form } from "react-router-dom"
import MobileMenu from "../mobilemenu/MobileMenu"

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
  return (
    <div id="search-container" className={`w-full ${mobileActive && !mobileMenuIsOpen ? 'hidden' : mobileActive && mobileMenuIsOpen ? 'block' : ''}`}>
      <Form method="get">
        <div className="form-group relative mr-2 flex justify-end items-center flex-nowrap ">
          <input
            type="text"
            name="search"
            id="search"
            className={`rounded-full pl-[15px] shadow-(--bs-lightBlue) w-9 h-9  ${mobileMenuIsOpen ? 'hover:w-full  focus:w-full' : 'hover:w-11/12 focus:w-11/12'}  focus:transition-(--transition) transition-(--transition) outline-0`}
            placeholder="Search"
          />
          <label htmlFor="search" className="absolute bg-(--light-navy) rounded-full">
            <i className="fa-sharp fa-solid fa-magnifying-glass p-2.5 cursor-pointer  w-9 h-9"></i>
          </label>
        </div>
      </Form>
    </div>
  )
}

function User({ mobileActive, mobileMenuIsOpen }) {
  return (
    <div id="user-container" className={`${mobileActive && !mobileMenuIsOpen ? 'hidden' : mobileActive && mobileMenuIsOpen ? 'block' : ''}`}>
      <i className="fa-sharp fa-solid fa-user w-9 h-9 bg-(--red) shadow-(--bs-lightBlue) cursor-pointer rounded-full text-(--aqua) p-2.5"></i>
    </div>
  )
}