import { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import useWindowSize from "../../hooks/UseWindowSize";
import { ResponsivePie } from "@nivo/pie";

const navLinks = [
  { id: 1, name: 'The Daily Weather', to: 'weatherForecast' },
  { id: 2, name: 'Home', to: '/' },
]
const data = [
  { id: 'Rainy/Snowy Days', name: 'Rainy/Snowy Days', label: 'Rainy', value: 5, color: '#0575e6' },
  { id: 'Sunny/Cloudy Days', name: 'Sunny/Cloudy Days', label: 'Sunny', value: 20, color: 'hsl(39, 100%, 50%)' },
]
export default function WeatherForecastPage() {
  const windowSize = useWindowSize();
  const formatter = new Intl.DateTimeFormat('default', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
  const month = formatter.format(new Date())
  console.log(month.split(' ')[0])
  return (

    <div id="weather-forecast-page"
      className="w-full min-h-screen p-0">
      <div className="w-full p-0">
        <header className="w-full">
          <nav className="container w-full sm:w-11/12 max-w-[1280px] mx-auto h-auto text-white bg-transparent px-2.5 sm:px-0">
            <WeatherPageNavigation />
          </nav>
        </header>
        <main id="main" className="gap-4 mb-5 flex">
          <div className="w-full flex-col flex">

            <div id="weather-page-search-location"
              className="w-full px-2.5 py-5 backdrop-blur-lg bg-black/10 sm:px-0 border-b border-t mb-10 border-white/15">
              <div className="container w-11/12 max-w-[1280px] mx-auto flex flex-wrap flex-col sm:flex-row md:justify-start justify-center items-center gap-2.5">
                <div id="search-input-container" className="flex flex-nowrap">
                  <input id="weather-page-query"
                    name="q"
                    type="search"
                    placeholder="Search location"
                    className="border bg-white/10 border-white/30 border-r-0 outline-none rounded-l-full px-3 py-2 w-full min-w-[280px] max-w-[350px]" />
                  <button className="border border-white/30 px-3 py-2 rounded-r-full cursor-pointer bg-[var(--primary-color)]">
                    <i className="fas fa-search text-white/60"></i>
                  </button>
                </div>
                <div id="search-result-banner-container" className="flex justify-center flex-wrap text-white/40 gap-2.5">
                  <div className="border bg-white/10 border-white/30 inline-block px-3 py-2 rounded-lg cursor-pointer">
                    <span> location</span>
                    <span> img</span>
                    <span> temp</span>
                  </div>
                  <div className="border bg-white/10 border-white/30 inline-block px-3 py-2 rounded-lg cursor-pointer">
                    <span> location</span>
                    <span> img</span>
                    <span> temp</span>
                  </div>
                  <div className="border bg-white/10 border-white/30 inline-block px-3 py-2 rounded-lg cursor-pointer">
                    <span> location</span>
                    <span> img</span>
                    <span> temp</span>
                  </div>
                </div>
              </div>
            </div>
            <div id="weather-content-container"
              className="container  px-2.5 sm:px-0 w-full sm:w-11/12 max-w-[1280px]  mx-auto flex flex-col sm:flex-row gap-2.5">

              <div id="current-weather-conditions" className={`sidebar flex flex-col gap-2.5 text-white  ${windowSize.width < 640 ? 'rounded-t-xl' : ''} sm:rounded-l-xl`}>
                <div className="min-w-70 backdrop-blur-lg shadow-[var(--bs-banner-1)] rounded-xl h-auto px-2.5 p-5 flex flex-col gap-1.5">
                  <div className="location flex items-center gap-2">
                    <div className="location-icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="location-text">
                      <p id="location">location</p>
                    </div>
                  </div>
                  <div className="weather-icon max-w-[150px] self-center">
                    <img id="icon" className="w-full h-full object-cover" src="/images/icons/sun/sunny.png" alt="" />
                  </div>
                  <div className="temperature relative">
                    <h1 id="temp" className="text-5xl">30<span className="temp-unit text-xl absolute top-0">°C</span></h1>
                  </div>
                  <div className="date-time">
                    <p id="date-time">Monday, 12:00</p>
                  </div>
                  <div className="divider border-b border-white/30 my-4"></div>
                  <div className="condition-rain-container flex flex-col gap-2.5">
                    <div className="condition flex items-center gap-2">
                      <i className="fas fa-cloud"></i>
                      <p id="condition">condition</p>
                    </div>
                    <div className="precepetation flex items-center gap-2">
                      <i className="fas fa-tint"></i>
                      <p id="rain">perc - 0%</p>
                    </div>
                  </div>
                </div>
                <div id="weather-overview" className="relative min-w-70 backdrop-blur-lg shadow-[var(--bs-banner-1)] rounded-xl h-auto px-2.5 p-5 flex flex-col gap-1.5">
                  <div className="location flex items-center gap-2">
                    <div className="">
                      <p id="header-overview">15 Day Weather Overview</p>
                    </div>
                  </div>
                  <div className="weather-icon h-full w-full">
                    <div className="month-year flex flex-col items-center absolute w-full top-[32%] right-0">
                      <span className="text-[1rem]">{month.split(' ')[1]}</span>
                      <span className="text-[1.5rem] font-semibold">{month.split(' ')[0]}</span>
                    </div>

                    <MyPie data={data} />

                  </div>
                  <div id="overview-details" className="flex items-center w-full flex-col gap-2.5">
                    <div id="sunny-rainy" className="w-full flex gap-7 sm:gap-2.5 justify-center">

                      <div className="text-[.9rem] flex w-[130px]" id="sunny-cloudy">{data[1].name} <br />{data[1].value}</div>
                      <div className="text-[.9rem] flex w-[130px]" id="rainy-snowy">{data[0].name} <br />{data[0].value}</div>
                    </div>
                    <div id="high-low" className="flex w-full gap-7 sm:gap-2.5 justify-center">

                      <div className="text-[.9rem] w-[130px] flex" id="average-hightemp">Average High <br />30°C</div>
                      <div className="text-[.9rem] w-[130px] flex" id="average-lowtemp">Average Low <br />25°C</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`shadow-[var(--bs-banner-1)] backdrop-blur-lg overflow-hidden rounded-xl flex flex-col gap-2.5 p-2.5 w-full ${windowSize.width < 640 ? 'rounded-b-xl' : ''} sm:rounded-r-xl`}>
                <div className="w-full flex justify-between items-center pb-2.5 border-b border-white/20">
                  <div className="options text-white flex gap-2.5 text-xl">
                    <button className="hourly">Today</button>
                    <button className="week active">Week</button>
                  </div>
                  <div className="options units flex gap-2.5 text-xl">
                    <button className="celcius active w-10 aspect-square bg-[#0575e6] shadow-[var(--bs-banner-1-inset)] rounded-full">°C</button>
                    <button className="fahrenheit w-10 aspect-square bg-white text-[#0575e6] shadow-[var(--bs-banner-1-inset)] rounded-full">°F</button>
                  </div>
                </div>
                <div id="weather-cards"
                  className="cards flex justify-evenly items-center flex-wrap gap-2.5 py-2.5">
                  <WeatherPageCard />
                  <WeatherPageCard />
                  <WeatherPageCard />
                  <WeatherPageCard />
                  <WeatherPageCard />
                  <WeatherPageCard />
                  <WeatherPageCard />

                </div>
                <div className="highlights">
                  <div className="header pt-2.5 pb-4 border-b border-white/20">
                    <h2 className="heading text-xl">Today's Highlights</h2>
                  </div>
                  <div className="cards mt-5 flex flex-wrap justify-evenly gap-2.5 [&>*]:min-h-30 [&>*]:min-w-60 [&>*]:shadow-[var(--bs-banner-1)] [&>*]:rounded-xl">
                    <div className="card2 flex flex-col justify-center items-center">
                      <h4 className="card-heading">Wind Status</h4>
                      <div className="content">
                        <p className="wind-speed">0</p>
                        <p>km/h</p>
                      </div>
                    </div>
                    <div className="card2 flex flex-col justify-center items-center">
                      <h4 className="card-heading">Sunrise & Sunset</h4>
                      <div className="content">
                        <p className="sun-rise">0</p>
                        <p className="sun-set">0</p>
                      </div>
                    </div>
                    <div className="card2 flex flex-col justify-center items-center">
                      <h4 className="card-heading">Humidity</h4>
                      <div className="content">
                        <p className="humidity">0</p>
                        <p className="humidity-status">Normal</p>
                      </div>
                    </div>
                    <div className="card2 flex flex-col justify-center items-center">
                      <h4 className="card-heading">Visibility</h4>
                      <div className="content">
                        <p className="visibilty">0</p>
                        <p className="visibilty-status"> Normal</p>
                      </div>
                    </div>
                    <div className="card2 flex flex-col justify-center items-center">
                      <h4 className="card-heading">Pressure</h4>
                      <div className="content">
                        <p className="pressure">0</p>
                        <p className="pressure-status">Normal</p>
                      </div>
                    </div>
                    <div className="card2 flex flex-col justify-center items-center">
                      <h4 className="card-heading">Air Quality</h4>
                      <div className="content">
                        <p className="air-quality">0</p>
                        <p className="air-quality-status">Normal</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* <div className="sidebar-right text-white basis-4/12 border">
            <div className="border-b-2 pb-3">
              <h2 className="text-xl">Weather News Latest Updates</h2>
            </div>

          </div> */}
        </main>
        <div id="weather-news" className="container w-full sm:w-11/12 p-2.5 max-w-[1280px] mx-auto mt-10 rounded-xl backdrop-blur-lg shadow-[var(--bs-banner-1)]">
          <div className="weather-news-card">
            <div className="weather-heading ">
              <h2 className="text-white text-xl py-2.5 pb-5 border-b border-white/20">Weather News</h2>
            </div>
            <div className="weather-news-wrapper h-46 grid grid-rows-3">
              <div className="col-span-2 rounded-3xl"></div>
              <div className=""></div>
              <div className=""></div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

function WeatherPageNavigation() {
  const navLinkStyle = `w-full cursor-pointer text-3xl`

  return (
    <ul className="h-15 flex items-center justify-between">
      {navLinks.map(link => (
        <li key={link.id}>
          <NavLink to={link.to} className={navLinkStyle}>{link.name === 'Home' ? <FaHome title="Go back home" /> : link.name}</NavLink>
        </li>
      ))}
    </ul>
  )
}

function WeatherPageCard({ conditions, handleConditionsIcon, icon, tempConverter, temp, tempUnit }) {
  const [selectedMode, setSelectedMode] = useState('hourly');
  const [day, setDay] = useState(new Date().getHours())
  const days = useMemo(() => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], [])
  const hour = new Date().getHours();
  return (
    <div className="hourly-daily-forecast w-full md:max-w-[120px] backdrop-blur-lg flex flex-col grow sm:w-full items-center gap-1 sm:gap-2.5
      p-2.5 rounded-lg shadow-[var(--bs-banner-1)]">
      <span className="time whitespace-nowrap">
        {selectedMode === 'hourly' ? (
          hour === '00' || hour === '0' ?
            `12 AM` :
            hour < 12 ? `${hour} AM` : `${hour > 12 ? (hour - 12) : hour} PM`) :
          day === days[new Date().getDay()] ? 'Today' : day}
      </span>
      <span className="icon w-10 aspect-square">
        <img className="w-full h-full"
          src={'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/N210LightRainShowersV2.svg'}
        // alt={conditions}
        // title={conditions} 
        />
      </span>
      <span className="temp" title="Temperature">30&deg;C</span>
      <span className="precipitate flex flex-nowrap gap-[2px] items-center" title="Rain probability">
        <i className="fa-solid fa-droplet text-[.5rem]"></i>{'precipprob'}'%
      </span>
    </div>
  )
}
const MyPie = ({ data }) => {

  return (
    <div className="w-full h-50">
      <ResponsivePie
        data={data}
        innerRadius={0.6}
        padAngle={0.6}
        cornerRadius={2}
        sortByValue={true}
        enableArcLinkLabels={false}
        activeOuterRadiusOffset={8}
        colors={{ datum: 'data.color' }}
        margin={{ top: 10, right: 0, bottom: 10, left: 0 }}
        theme={{
          tooltip: {
            container: {
              background: '#222222d7',
              backdropFilter: 'blur(10px)',
              color: '#fff',
              fontSize: 14,
            },
          },
        }}
      />
    </div>
  )
}