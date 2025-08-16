import { Form } from "react-router-dom"
import MobileMenu from "../mobilemenu/MobileMenu"

export default function UserSearch() {
  return (
    <>
      <div id="user-search-container" className="flex items-center justify-end">
        <Search />
        <User />
        <MobileMenu />
      </div>
    </>
  )
}

function Search() {
  return (
    <>
      <div id="search-container" className="w-full ">
        <Form method="get">
          <div className="form-group relative mr-2 flex justify-end items-center flex-nowrap ">
            <input
              type="text"
              name="search"
              id="search"
              className="rounded-full pl-[15px] shadow-(--bs-lightBlue) w-9 h-9  hover:w-11/12 focus:w-11/12 focus:transition-(--transition) transition-(--transition) outline-0"
              placeholder="Search"
            />
            <label htmlFor="search" className="absolute bg-(--light-navy) rounded-full">
              <i className="fa-sharp fa-solid fa-magnifying-glass p-2.5 cursor-pointer  w-9 h-9"></i>
            </label>
          </div>
        </Form>
      </div>
    </>
  )
}

function User() {
  return (
    <>
      <div id="user-container">
        <i className="fa-sharp fa-solid fa-user w-9 h-9 bg-(--red) shadow-(--bs-lightBlue) cursor-pointer rounded-full text-(--aqua) p-2.5"></i>
      </div>
    </>
  )
}