import Navigation from "../navigation/Navigation";
import appLogo from '../../assets/images/tdg-logo.png'
import { Form, Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="footer" className="bg-(--light-navy) h-auto w-full pt-5">
      <div className="footer-container container w-11/12 max-w-[1536px] mx-auto relative">
        <div id="footer-content" className="flex flex-col [&>div:first-child]:order-last lg:flex-row lg:[&>div:first-child]:order-first gap-2.5">
          <FooterDescriptionAndSocials />
          <FooterResourcesAndNewsLetter />
        </div>
        <div id="footer-navigation" className="hidden mt-4 border-t-2 sm:flex justify-center items-center h-20">
          <Navigation />
        </div>
      </div>
    </footer>
  )
}

function FooterDescriptionAndSocials() {
  const siteDescription = `The Daily Gazette is a leading news source that delivers
    comprehensive and timely coverage of local, national, and
    international events.`
  const socialLinks = [
    { title: "Facebook", link: "https://facebook.com", iconClass: 'fab fa-facebook fa-2x' },
    { title: "Twitter", link: "https://twitter.com", iconClass: 'fab fa-twitter fa-2x' },
    { title: "Youtube", link: "https://youtube.com", iconClass: 'fab fa-youtube fa-2x' },
    { title: "Instagram", link: "https://instagram.com", iconClass: 'fab fa-instagram fa-2x' },
    { title: "Github", link: "https://github.com", iconClass: 'fab fa-github fa-2x' },
    { title: "Discord", link: "https://discord.com", iconClass: 'fab fa-discord fa-2x' },
  ]
  return (
    <div className="flex-item basis-2/5 flex flex-col max-w-[400px] xl:w-full mx-auto my-2.5 [&>div]:place-items-center justify-between gap-2.5">
      <div className="app-logo p-2.5 hidden sm:block">
        <img src={appLogo} alt="site logo" className="w-[250px]" />
      </div>
      <div className="site-description p-2.5 text-center">
        <div className="foot-about-header">
          <h4 className="py-2.5">About Us</h4>
        </div>
        <p className="text-(--text-lightDark) text-[.9rem]">{siteDescription}</p>
      </div>
      <div className="site-socialLinks p-2.5">
        <div className="site-socialLinks-header">
          <h4 className="py-2.5">Follow Us</h4>
        </div>
        <ul id="socialLinks-list" className="flex gap-5">
          {
            socialLinks.map(social => (
              <li key={social.title}>
                <Link to={social.link} target="_blank" rel="noopener noreferrer">
                  <i className={social.iconClass}></i>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
      <div className="copyrights p-2.5 border-t-2 sm:border-none">
        <h3 className="text-[1rem]">Copyright &copy; COGY&trade; | All Rights Reserved.</h3>
      </div>
    </div>
  )
}

function FooterResourcesAndNewsLetter() {
  const resources = [
    { title: 'Gnews', link: '' },
    { title: 'The News Api', link: '' },
    { title: 'NewsApi', link: '' },
    { title: 'ipinfo', link: '' },
    { title: 'Visual Crossing', link: '' },
    { title: 'Balldontlie', link: '' },
    { title: 'Fastforex', link: '' },
  ]

  const support = [
    { title: 'Documentation', link: '' },
    { title: 'Change Logs', link: '' },
    { title: 'Tools', link: '' },
  ]

  const careersAndUpdates = [
    { title: 'Advertise', link: '' },
    { title: 'Careers', link: '' },
    { title: 'Updates', link: '' },
  ]

  const legal = [
    { title: 'Privacy Policy', link: '' },
    { title: 'Terms of Use', link: '' },
    { title: 'License', link: '' },
  ]

  const mapHelper = (array) => {
    return (
      <ul className="list-none leading-7">
        {array.map(item => (
          <li key={item.title} className="pl-2.5">
            <Link to={item.link} className="text-[.8rem]">{item.title}</Link>
          </li>
        ))}
      </ul>
    )
  }
  return (
    <div className="flex-item basis-3/5">
      <div className="grid [&>div]:place-items-center grid-template-footer">
        <div className="grid-item">
          <div className="grid-item-header py-2.5">
            <h4>Resources</h4>
          </div>
          <div className="grid-item-content">
            {
              mapHelper(resources)
            }
          </div>
        </div>
        <div className="grid-item">
          <div className="grid-item-header py-2.5">
            <h4>Support</h4>
          </div>
          <div className="grid-item-content">
            {
              mapHelper(support)
            }
          </div>
        </div>
        <div className="grid-item">
          <div className="grid-item-header py-2.5">
            <h4>Work with Us</h4>
          </div>
          <div className="grid-item-content">
            {
              mapHelper(careersAndUpdates)
            }
          </div>
        </div>
        <div className="grid-item">
          <div className="grid-item-header py-2.5">
            <h4>Legal</h4>
          </div>
          <div className="grid-item-content">
            {
              mapHelper(legal)
            }
          </div>
        </div>
        <div className="grid-item">
          <div className="grid-item-header py-2.5">
            <h4 className="text-center">Subscribe to News Letter</h4>
          </div>
          <div className="grid-item-content w-full">
            <Form method="post">
              <input
                type="text"
                name="fullname"
                id="fullname"
                autoComplete="off"
                placeholder="Your name..."
                className="w-10/12 sm:w-2/3 md:w-1/2 py-2.5 px-[15px] block m-auto my-2.5 rounded-full border-0 outline-0 text-[.8rem] text-start bg-white text-black"
              />
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                placeholder="Your email..."
                className="w-10/12 sm:w-2/3 md:w-1/2 py-2.5 px-[15px] block m-auto my-2.5 rounded-full border-0 outline-0 text-[.8rem] text-start bg-white text-black"
              />
              <button
                type="submit"
                value="Subscribe"
                className="w-10/12 sm:w-2/3 md:w-1/2 py-2.5 px-[15px] block m-auto my-2.5 rounded-full border-0 outline-0 text-[.8rem] text-center bg-white text-black uppercase cursor-pointer"
              >
                Subscribe
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}