import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useUpdateWeatherBackground from "../../hooks/UseWeatherBackgroundUpdate";
import useWindowSize from "../../hooks/UseWindowSize";
import OverviewChart from "./PieChart";
import useIpGetter from "../../hooks/UseIpGetter";
import useFormatter from "../../hooks/useFormatter";
import useClock from "../../hooks/useClock";
import Error from "../../components/error/Error";
import Spinner from "../../components/spinner/Spinner";
import { WeatherCard } from "./WeatherCard";
import { useFetchForAll } from "../../hooks/UseFetchForAll";
import { handleConditionsIcon, tempConverter } from "../../components/weatherapp/WeatherForecastUtility";
import { FaCloudSunRain } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";

const WAPP = {
  endpoint: 'timeline',
  visualCrossingApikey: import.meta.env.VITE_VISUALCROSSING_API_KEY,
  ipinfoApikey: import.meta.env.VITE_IPINFO_API_KEY,
  openWeatherApikey: import.meta.env.VITE_OPENWEATHER_API_KEY,
}

const tempUnits = {
  Celcius: 'c',
  Fahrenheit: 'f',
  Kelvin: 'k',
}

const navLinks = [
  { id: 1, name: 'The Daily Weather', to: '/weather' },
  { id: 2, name: 'Home', to: '/' },
]

export default function WeatherPage() {
  const [tempUnit, setTempUnit] = useState('c');

  const { windowSize } = useWindowSize();
  const { weatherBackground } = useUpdateWeatherBackground();

  const { ipdata, error: ipdataError } = useIpGetter();
  const { latitude, longitude } = ipdata || {}

  const VISUALCROSSING_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/${WAPP.endpoint}/${latitude},${longitude}?&key=${WAPP.visualCrossingApikey}&iconSet=icons2`
  const { data: weatherData, error: weatherDataError } = useFetchForAll(VISUALCROSSING_URL)

  const isIpdataLoading = !ipdata;
  const isWeatherDataLoading = ipdata && !weatherData;
  const isLoading = isWeatherDataLoading || isIpdataLoading;

  return (
    <div id="weather-forecast-page"
      style={{ background: weatherBackground }}>

      {isLoading && (ipdataError || weatherDataError ? <Error /> : <Spinner />)}

      {weatherData && (
        <div id="weather-container"
          className="w-full p-0">
          <WeatherPageNavigation />
          <WeatherPageMainContainer>
            <WeatherPageSearchLocation />
            <WeatherPageContent
              windowSize={windowSize}
              ipData={ipdata}
              tempUnit={tempUnit}
              setTempUnit={setTempUnit}
              forecastData={weatherData} />
          </WeatherPageMainContainer>
          <WeatherNews />
        </div>
      )}
    </div>
  )
}

// local function for navigation
function WeatherPageNavigation() {
  const navLinkStyle = `w-full cursor-pointer text-3xl`

  return (
    <header className="w-full">
      <nav className="container w-full sm:w-11/12 max-w-[1280px] mx-auto h-auto text-white bg-transparent px-2.5 sm:px-0">
        <ul className="h-15 flex items-center justify-between">
          {navLinks.map(link => (
            <li key={link.id}>
              <NavLink to={link.to} className={navLinkStyle}>{link.name === 'Home' ?
                <FaHome title="Go back home" /> :
                link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>

  )
}

function WeatherPageMainContainer({ children }) {
  return (
    <main id="main"
      className="gap-4 mb-5 flex">
      <div className="w-full flex-col flex">
        {children}
      </div>
    </main>
  )
}

function WeatherPageSearchLocation() {
  return (
    <div id="weather-page-search-location"
      className="w-full px-2.5 py-5 backdrop-blur-lg bg-black/10 sm:px-0 border-b border-t mb-10 border-white/15">
      <div className="container w-11/12 max-w-[1280px] mx-auto flex flex-wrap flex-col sm:flex-row md:justify-start justify-center items-center gap-2.5">
        <div id="search-input-container" className="flex flex-nowrap">
          <input id="weather-page-query"
            name="q"
            type="search"
            placeholder="Search location"
            className="border bg-white/10 border-white/30 border-r-0 outline-none rounded-l-full px-3 py-2 w-full min-w-[280px] max-w-[350px]" />
          <label htmlFor="weather-page-query" className="border border-white/30 px-3 py-2 rounded-r-full cursor-pointer bg-[var(--primary-color)]">
            <i className="fas fa-search text-white/60"></i>
          </label>
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
  )
}

function WeatherPageContent({ windowSize, ipData, tempUnit, setTempUnit, forecastData }) {

  return (
    <div id="weather-content-container"
      className="container px-2.5 sm:px-0 w-full sm:w-11/12 max-w-[1280px] 
      mx-auto flex flex-col sm:flex-row gap-2.5">
      <div id="current-weather-conditions" className={`sidebar flex flex-col sm:flex-row gap-2.5 
        text-white  ${windowSize.width < 640 ? 'rounded-t-xl' : ''} sm:rounded-l-xl`}>
        <WeatherSideBar
          windowSize={windowSize}
          ipData={ipData}
          tempUnit={tempUnit}
          forecastData={forecastData} />
        <WeatherForecastContent
          windowSize={windowSize}
          tempUnit={tempUnit}
          setTempUnit={setTempUnit}
          forecastData={forecastData}
        />
      </div>
    </div>
  )
}

function WeatherSideBar({ windowSize, ipData, tempUnit, forecastData }) {
  return (
    <div id="weather-sidebar"
      className={`sidebar flex flex-col gap-2.5 
        text-white  ${windowSize.width < 640 ? 'rounded-t-xl' : ''} sm:rounded-l-xl`}>
      <WeatherCurrentConditions
        ipData={ipData}
        tempUnit={tempUnit}
        forecastData={forecastData} />
      <WeatherOverview
        tempUnit={tempUnit}
        forecastData={forecastData} />
    </div>
  )
}

function WeatherCurrentConditions({ ipData, tempUnit, forecastData }) {
  const { city, region } = ipData || {};
  const { currentConditions, days } = forecastData || {};
  const { description } = days[0]
  const { dateToday, timer } = useClock();
  const hour = new Date().getHours();

  return (
    <div className="min-w-70 backdrop-blur-lg shadow-[var(--bs-banner-1)] rounded-xl 
          h-auto px-2.5 p-5 flex flex-col gap-1.5">

      <div className="location flex items-center gap-2">
        <div className="location-icon">
          <i className="fas fa-map-marker-alt"></i>
        </div>
        <div className="location-text">
          <p id="location">{city}, {region}</p>
        </div>
      </div>
      <div className="weather-icon h-24 self-center">
        <img id="icon"
          src={handleConditionsIcon(currentConditions?.icon, hour)}
          alt={currentConditions?.conditions}
          title={currentConditions?.conditions}
          className="w-full h-full object-cover" />
      </div>
      <div className="temperature relative">
        <h1 id="temp" className="text-5xl">
          <span className="temp-unit text-5xl" title="Temperature">
            {tempConverter(currentConditions?.temp, 'f', tempUnit)}</span>
          <span className="text-xl align-super">&deg;{tempUnit.toUpperCase()}</span>
        </h1>
      </div>
      <div className="date-time">
        <p id="date-time">{dateToday.split(' ')[0]}, {timer}</p>
      </div>
      <div className="divider border-b border-white/30 my-4"></div>
      <div className="condition-rain-container flex flex-col gap-2.5">
        <div className="description flex items-center gap-2">
          <FaCloudSunRain className="w-10" />
          {description}
        </div>
        <div className="condition flex items-center gap-2">
          <i className="fas fa-cloud w-6"></i>
          <p id="condition">{currentConditions?.conditions}</p>
        </div>
        <div className="precepetation flex items-center gap-2">
          <i className="fas fa-tint w-6"></i>
          <p id="rain">{currentConditions?.precipprob} %</p>
        </div>
      </div>
    </div>
  )
}

function WeatherOverview({ tempUnit, forecastData }) {
  const { currentConditions, days, description } = forecastData || {}
  const rainySnowyDays = days.filter(day => day.icon === 'rain' ||
    day.icon === 'thunder-rain' ||
    day.icon === 'thunder-showers-day' ||
    day.icon === 'showers-day' ||
    day.icon === 'snow')
  const averageTempHigh = Math.round(days.reduce((acc, curr) => acc + curr.tempmax, 0) / days.length * 100) / 100
  const averageTempLow = Math.round(days.reduce((acc, curr) => acc + curr.tempmin, 0) / days.length * 100) / 100

  const pieChartData = [
    { id: 'Rainy/Snowy Days', name: 'Rainy/Snowy Days', label: 'Rainy', value: rainySnowyDays.length, color: '#0575e6' },
    { id: 'Sunny/Cloudy Days', name: 'Sunny/Cloudy Days', label: 'Sunny', value: (days.length - rainySnowyDays.length), color: 'hsl(39, 100%, 50%)' },
  ]

  const formatterOptions = {
    year: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }
  const formattedDate = useFormatter(new Date(), formatterOptions)
  const dateArray = formattedDate.split(' ')
  const month = dateArray[0]
  const year = dateArray[dateArray.length - 1]

  return (
    <div id="weather-overview"
      className="relative min-w-70 backdrop-blur-lg shadow-[var(--bs-banner-1)] 
      rounded-xl h-auto px-2.5 p-5 flex flex-col gap-1.5">
      <div className="location flex items-center gap-2">
        <div className="w-full text-center">
          <p id="header-overview">15-Day Weather Overview</p>
        </div>
      </div>
      <div className="h-full w-full">
        <div className="month-year flex flex-col items-center absolute w-full top-[27%] right-0">
          <span className="text-[1rem]">{month}</span>
          <span className="text-[1.5rem] font-semibold">{year}</span>
        </div>

        <OverviewChart data={pieChartData} />

      </div>

      <div id="overview-details" className="flex items-center w-full flex-col gap-2.5">
        <div id="overview-description"
          className="p-2.5 text-center">
          <p>{description}</p>
        </div>
        <div id="sunny-rainy" className="w-full flex gap-7 sm:gap-2.5 justify-center">

          <div id="sunny-cloudy"
            className="text-[.9rem] flex w-[130px]">
            {pieChartData[1].name} <br />{pieChartData[1].value}
          </div>
          <div id="rainy-snowy"
            className="text-[.9rem] flex w-[130px]" >
            {pieChartData[0].name} <br />{pieChartData[0].value}
          </div>
        </div>
        <div id="high-low" className="flex w-full gap-7 sm:gap-2.5 justify-center">
          <div id="average-hightemp"
            className="text-[.9rem] w-[130px] flex" >
            Average High <br />
            {tempConverter(averageTempHigh, 'f', tempUnit)}&deg;{tempUnit.toUpperCase()}
          </div>
          <div id="average-lowtemp"
            className="text-[.9rem] w-[130px] flex" >
            Average Low <br />
            {tempConverter(averageTempLow, 'f', tempUnit)}&deg;{tempUnit.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  )
}

function WeatherForecastContent({ windowSize, tempUnit, setTempUnit, forecastData }) {
  const { currentConditions, days } = forecastData
  console.log(days)
  const [forecast, setForecast] = useState(null);
  const [selectedMode, setSelectedMode] = useState('hourly')

  useEffect(() => {
    if (selectedMode === 'hourly') {
      setForecast(days[0]?.hours)
    } else {
      setForecast(days)
    }
  }, [selectedMode, days])

  return (
    <div id="weather-forecast-content"
      className={`shadow-[var(--bs-banner-1)] w-full backdrop-blur-lg overflow-hidden rounded-xl flex flex-col 
      gap-2.5 p-2.5 ${windowSize.width < 640 ? 'rounded-b-xl' : ''} sm:rounded-r-xl`}>
      <div id="select-mode-container" className="w-full flex justify-between items-center pb-2.5 border-b border-white/20">
        <div className="options text-white h-full flex text-md w-[150px]
          rounded-lg bg-[rgba(var(--white-rgb),.1)] text-center
          [&>*]:basis-1/2 [&>*]:hover:bg-white/20 overflow-hidden">
          <div onClick={() => setSelectedMode('hourly')}
            className={`hourly px-2 py-1.5 h-full cursor-pointer border-r border-r-white/20 border-2 border-transparent 
            ${selectedMode === 'hourly' ? 'border-b-[#0575e6]' : 'border-transparent'}`}>Hourly</div>
          <div onClick={() => setSelectedMode('daily')}
            className={`week px-2 py-1.5 h-full cursor-pointer border-l border-2 border-transparent 
            ${selectedMode === 'daily' ? 'border-b-[#0575e6]' : 'border-transparent'}`}>Daily</div>
        </div>

        <div className="options units flex gap-2.5 text-md">
          <button onClick={() => { setTempUnit('c') }}
            className={`celcius w-10 aspect-square shadow-[var(--bs-banner-1-inset)] cursor-pointer
            rounded-full ${tempUnit === 'c' ? 'bg-[#0575e6]' : 'bg-white text-[#0575e6] '}`}>°C</button>

          <button onClick={() => { setTempUnit('f') }}
            className={`fahrenheit w-10 aspect-square cursor-pointer shadow-[var(--bs-banner-1-inset)] 
            rounded-full ${tempUnit === 'f' ? 'bg-[#0575e6]' : 'bg-white text-[#0575e6] '}`}>°F</button>

        </div>
      </div>
      <div id="weather-cards"
        className="w-full flex justify-evenly flex-wrap sm:flex-row gap-2.5 py-2.5">
        {forecast && forecast.map(forecast => (
          <WeatherCard
            key={forecast.datetimeEpoch}
            tempUnit={tempUnit}
            forecast={forecast}
            selectedMode={selectedMode} />
        ))}
      </div>
      <WeatherHighlights currentConditions={currentConditions} />
    </div>
  )
}

function WeatherHighlights({ currentConditions }) {
  console.log(currentConditions)
  return (
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
  )
}

function WeatherNews() {
  return (
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
  )
}