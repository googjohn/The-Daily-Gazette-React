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
      <div id="search-container">
        <Form>

        </Form>
      </div>
    </>
  )
}

function User() {
  return (
    <>
      <div id="user-container">
        <i className="fa-sharp fa-solid fa-user"></i>
      </div>
    </>
  )
}