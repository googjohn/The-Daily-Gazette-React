import { useState, useEffect } from "react";
import { Form, NavLink, useActionData } from "react-router-dom";
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
import { FaCloudSunRain, FaWind, FaTemperatureHalf, FaTemperatureArrowDown, FaTemperatureArrowUp } from "react-icons/fa6";
import { FaHome, FaCloud, FaTint } from "react-icons/fa";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { WiBarometer, WiHumidity } from "react-icons/wi";
import { MdVisibility } from "react-icons/md";


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
  const [weather, setWeather] = useState(null);

  const { windowSize } = useWindowSize();
  const { weatherBackground } = useUpdateWeatherBackground();

  const { ipdata, error: ipdataError } = useIpGetter();
  const { latitude, longitude } = ipdata || {}

  const VISUALCROSSING_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/${WAPP.endpoint}/${latitude},${longitude}?&key=${WAPP.visualCrossingApikey}&iconSet=icons2`
  const { data: weatherData, error: weatherDataError } = useFetchForAll(VISUALCROSSING_URL)

  const actionData = useActionData() || {};
  const { result: weatherSearchData, location } = actionData;

  useEffect(() => {
    if (weatherSearchData) {
      setWeather(weatherSearchData)
    }
  }, [weatherSearchData])
  console.log(weather)

  const isIpdataLoading = !ipdata;
  const isWeatherDataLoading = ipdata && !weatherData;
  const isLoading = isWeatherDataLoading || isIpdataLoading;

  const forecastData = weather || weatherData;

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
              location={location}
              forecastData={forecastData} />
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
        <Form method="post">
          <div id="search-input-container" className="flex flex-nowrap">
            <input id="weather-page-query"
              required
              type="search"
              name="location"
              placeholder="Search location"
              className="border bg-white/10 border-white/30 border-r-0 outline-none rounded-l-full px-3 py-2 w-full min-w-[280px] max-w-[350px]" />
            <button type="submit" htmlFor="weather-page-query" className="border border-white/30 px-3 py-2 rounded-r-full cursor-pointer bg-[var(--primary-color)]">
              <i className="fas fa-search text-white/60"></i>
            </button>
          </div>
        </Form>
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

function WeatherPageContent({ windowSize, ipData, tempUnit, setTempUnit, location, forecastData }) {

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
          location={location}
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

function WeatherSideBar({ windowSize, ipData, tempUnit, location, forecastData }) {
  return (
    <div id="weather-sidebar"
      className={`sidebar flex flex-col gap-2.5 
        text-white  ${windowSize.width < 640 ? 'rounded-t-xl' : ''} sm:rounded-l-xl`}>
      <WeatherCurrentConditions
        ipData={ipData}
        tempUnit={tempUnit}
        location={location}
        forecastData={forecastData} />
      <WeatherOverview
        tempUnit={tempUnit}
        forecastData={forecastData} />
    </div>
  )
}

function WeatherCurrentConditions({ ipData, tempUnit, forecastData, location }) {
  const { city, region } = ipData || {};
  const { currentConditions, days } = forecastData || {};
  const { description } = days[0]
  const { dateToday, timer } = useClock();
  const hour = new Date().getHours();
  const address = location || `${city}, ${region}`
  return (
    <div className="min-w-70 backdrop-blur-lg shadow-[var(--bs-banner-1)] rounded-xl 
          h-auto px-2.5 p-5 flex flex-col gap-1.5">

      <div className="location flex items-center gap-2">
        <div className="location-icon">
          <i className="fas fa-map-marker-alt"></i>
        </div>
        <div className="location-text">
          <p id="location">{address}</p>
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
          <div className="icon w-5">
            <FaCloudSunRain />
          </div>
          <div className="description w-full">
            {description}
          </div>
        </div>
        <div id="feels-like" className="flex items-center gap-2">
          <div className="icon w-5">
            <FaTemperatureHalf />
          </div>
          <div>
            <span className="">Feels like: </span>
            <span>{tempConverter(currentConditions?.feelslike, 'f', tempUnit)}</span>
            <span className="text-[.6rem] align-super">&deg;{tempUnit.toUpperCase()}</span>
          </div>
        </div>
        <div className="condition flex items-center gap-2">
          <div className="icon w-5">
            <FaCloud />
          </div>
          <p id="condition">{currentConditions?.conditions}</p>
        </div>
        <div className="precepetation flex items-center gap-2">
          <div className="icon w-5">
            <FaTint />
          </div>
          <p id="rain">{currentConditions?.precipprob} %</p>
        </div>
      </div>
    </div>
  )
}

function WeatherOverview({ tempUnit, forecastData }) {
  const { days, description } = forecastData || {}
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
            className="text-[.9rem] w-[130px]" >
            <span className="icon flex items-center gap-2">
              <FaTemperatureArrowUp />
              Average High <br />
            </span>
            <span className="content">
              {tempConverter(averageTempHigh, 'f', tempUnit)}&deg;{tempUnit.toUpperCase()}
            </span>
          </div>
          <div id="average-lowtemp"
            className="text-[.9rem] w-[130px]" >
            <span className="icon flex items-center gap-2">
              <FaTemperatureArrowDown />
              Average Low
            </span>
            <span className="content">
              {tempConverter(averageTempLow, 'f', tempUnit)}&deg;{tempUnit.toUpperCase()}
            </span>
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
            key={forecast.datetimeEpoch || forecast.datetime}
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
  const { windspeed, visibility, sunset, sunrise, humidity, pressure, cloudcover } = currentConditions;
  const windStatus = toKm(windspeed) >= 118 ? 'Hurricane-Force' : updateWindspeedStatus(toKm(windspeed));
  const pressureStatus = updatePressureStatus(pressure);
  const humidityStatus = updateHumidityStatus(humidity);
  const visibilityStatus = toM(visibility) > 10000 ? 'Good' : updateVisibilityStatus(toM(visibility));
  const cloudcoverStatus = cloudcover > 90 ? 'Overcast' : updateCloudcoverStatus(cloudcover);

  const highlights = [
    { title: 'Wind Status', value: [toKm(windspeed)], unit: 'Km/h', status: windStatus, icon: [<FaWind />] },
    { title: 'Pressure', value: [pressure], unit: 'hPa', status: pressureStatus, icon: [<WiBarometer />] },
    { title: 'Humidity', value: [humidity], unit: '%', status: humidityStatus, icon: [<WiHumidity />] },
    { title: 'Visibility', value: [toKm(visibility)], unit: 'Km', status: visibilityStatus, icon: [<MdVisibility />] },
    { title: 'Sunrise & Sunset', value: [sunrise, sunset], unit: 'AM', status: 'Normal', icon: [<GiSunrise />, <GiSunset />] },
    { title: 'Cloudcover', value: [cloudcover], unit: '%', status: cloudcoverStatus, icon: [<FaCloud />] }
  ]

  return (
    <div className="highlights">
      <div className="header pt-2.5 pb-4 border-b border-white/20">
        <h2 className="heading text-xl">Today's Highlights</h2>
      </div>
      <div className="cards mt-5 flex flex-wrap justify-evenly gap-2.5 [&>*]:min-h-30 [&>*]:min-w-60 [&>*]:shadow-[var(--bs-banner-1)] [&>*]:rounded-xl">
        {currentConditions && highlights.map(highlight => (
          <div key={highlight.title} className="card p-2.5 flex flex-col justify-between items-center">
            <h4 className="card-heading">{highlight.title}</h4>
            <div className="content flex flex-col justify-center items-center gap-2">
              <p className="flex gap-2.5 items-center justify-center text-[1.5rem]">
                <span>{highlight.icon[0]}</span>
                <span>{highlight.value[0]} {highlight.unit}</span>
              </p>
              {highlight.title === 'Sunrise & Sunset' ? (
                <p className="flex items-center justify-center gap-2.5">
                  <span>{highlight.icon[1]}</span>
                  <span>{highlight.value[1]}</span>
                </p>
              ) : (
                <p className="">
                  <span>{highlight.status}</span>
                </p>
              )}
            </div>
          </div>
        ))}
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

function toKm(distance) {
  return Math.round((distance / 0.6213712) * 100) / 100;
}

function toM(distance) {
  return toKm(distance) * 1000
}

function updateWindspeedStatus(windspeed) {
  const windspeedStatus = [
    { speed: 2, status: 'Calm' },
    { speed: 5, status: 'Light Air' },
    { speed: 11, status: 'Light Breeze' },
    { speed: 19, status: 'Gentle Breeze' },
    { speed: 28, status: 'Moderate Breeze' },
    { speed: 38, status: 'Fresh Breeze' },
    { speed: 49, status: 'Strong Breeze' },
    { speed: 61, status: 'Neare/Moderate Gale' },
    { speed: 74, status: 'Gale/Fresh Gale' },
    { speed: 88, status: 'Strong/Severe Gale' },
    { speed: 102, status: 'Storm/Whole Gale' },
    { speed: 117, status: 'Violent Storm' },
  ]
  return windspeedStatus.filter(wind => windspeed < wind.speed)[0].status
}

function updatePressureStatus(pressure) {
  if (pressure < 1000) {
    return "Low";
  } else if (pressure <= 1013) {
    return "Moderate";
  } else {
    return "High";
  }
}

function updateHumidityStatus(humidity) {
  if (humidity <= 30) {
    return "Low";
  } else if (humidity <= 60) {
    return "Moderate";
  } else {
    return "High";
  }
}

function updateVisibilityStatus(distance) {
  const visibilityStatus = [
    { range: 200, status: 'Dense Fog' },
    { range: 500, status: 'Thick Fog' },
    { range: 1000, status: 'Fog' },
    { range: 5000, status: 'Mist/Haze' },
    { range: 10000, status: 'Moderate' },
  ]
  return visibilityStatus.filter(visibility => distance <= visibility.range)[0].status
}

function updateCloudcoverStatus(cloudcover) {
  const cloudcoverStatus = [
    { value: 12.5, status: 'Sky Clear' },
    { value: 25, status: 'Few Clouds' },
    { value: 50, status: 'Scattered' },
    { value: 90, status: 'Broken' },
  ]
  return cloudcoverStatus.filter(cloud => cloudcover <= cloud.value)[0].status
}

export const weatherSearchAction = async ({ request }) => {
  const formData = await request.formData();
  const location = formData.get('location')
  const VISUALCROSSING_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/${WAPP.endpoint}/${location}?&key=${WAPP.visualCrossingApikey}&iconSet=icons2`
  if (!location) return { error: 'Location is required' }
  try {
    const response = await fetch(VISUALCROSSING_URL)
    if (!response.ok) {
      const error = new Error('Search failed')
      error.status = response.status
      throw error
    }

    const result = await response.json();
    return { result, location }
  } catch (error) {
    if (error.name === 'AbortError') return;
    console.log(error)
    return { error: error.message }
  }
}