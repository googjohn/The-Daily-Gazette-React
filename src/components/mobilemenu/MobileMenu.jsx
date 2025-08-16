import { useState } from "react";

export default function MobileMenu() {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive)
  }
  const spanClass = `block w-[30px] h-1 my-[5px] bg-(--red) shadow-(--bs-lightBlue) transition-(--transition) `

  return (
    <>
      <div id="mobile-menu" className="md:hidden">
        <button
          type="button"
          id="mobile-nav-btn"
          className="nav-toggle relative p-2.5 w-full h-full cursor-pointer z-10"
          onClick={handleClick}
        >
          <span className={`mobile-btn ${spanClass} ${isActive ? 'close-btn' : ''}`}></span>
          <span className={`mobile-btn ${spanClass} ${isActive ? 'close-btn' : ''}`}></span>
          <span className={`mobile-btn ${spanClass} ${isActive ? 'close-btn' : ''}`}></span>
        </button>
      </div>
    </>
  )
}