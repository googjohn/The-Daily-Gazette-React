import { Link } from 'react-router-dom'
import appLogo from '../../assets/images/tdg-logo.png'

export default function AppLogo() {
  return (
    <>
      <div id="app-logo" className='relative z-10'>
        <div className="spin-overlay">
          <div className="spinner">
            <Link to="/">
              <img
                src={appLogo}
                alt="app-logo"
                className='h-[70px] align-middle'
              />
            </Link>
          </div>
        </div>
      </div >
    </>
  )
}