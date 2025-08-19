export default function MobileMenu({ mobileMenuIsOpen, setMobileMenuIsOpen }) {
  const handleClick = () => {
    setMobileMenuIsOpen(!mobileMenuIsOpen)
  }
  const spanClass = `block w-[30px] h-1 my-[5px] bg-(--red) shadow-(--bs-lightBlue) transition-(--transition) `

  return (
    <div id="mobile-menu" className={`relative md:hidden z-40 ${mobileMenuIsOpen ? 'isOpen' : ''}`}>
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