import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom";
import { useFetchForAll } from "../../hooks/UseFetchForAll";
import { FaTemperatureHalf } from "react-icons/fa6";
import {
  tempConverter,
  handleConditionsIcon,
} from "../../pages/weatherForecast/WeatherPageUtility.js";
import Spinner from "../spinner/Spinner";
import useUpdateWeatherBackground from "../../hooks/UseWeatherBackgroundUpdate";
import useIpGetter from "../../hooks/UseIpGetter.js";

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

export default function WeatherApp() {
  const [tempUnit, setTempUnit] = useState('c')
  const [isHovered, setIsHovered] = useState(false);
  const [hour, setHour] = useState(new Date().getHours());

  const { ipdata, error: ipdataError } = useIpGetter();
  const { city, region, latitude, longitude } = ipdata || {}

  const VISUALCROSSING_URL = latitude && longitude
    ? `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/${WAPP.endpoint}/${latitude},${longitude}?&key=${WAPP.visualCrossingApikey}&iconSet=icons2`
    : null;

  const { data: weatherData, error: weatherDataError } = useFetchForAll(VISUALCROSSING_URL)
  const { currentConditions } = weatherData || {};

  const { weatherBackground } = useUpdateWeatherBackground(currentConditions?.icon);

  // very important check to make sure both ipdata and weatherdata 
  // are fetched and has value before return jsx is rendered
  const isIpdataLoading = !ipdata;
  const isWeatherDataLoading = ipdata && !weatherData;
  const isLoading = isWeatherDataLoading || isIpdataLoading;

  return (
    <div id="weather-app" className="flex justify-end sticky top-20 w-full z-30">

      <WeatherBanner weatherBg={weatherBackground}>

        {ipdataError || weatherDataError ?

          (<div>Error loading data. {ipdataError?.message || weatherDataError?.message}</div>) :

          isLoading ? <Spinner /> :

            weatherData && isHovered ?
              "Weather Forecast Today" : (
                <>
                  <div id="current-location"
                    title="City, Region"
                    className="transition-[var(--transition)]">
                    {city}, {region}
                  </div>
                  <div className="current-condition-icon aspect-square h-[30px]">
                    <img src={handleConditionsIcon(currentConditions?.icon, hour)}
                      alt={currentConditions?.conditions}
                      title={currentConditions?.conditions}
                      className="w-full h-full" />
                  </div>
                  <div className="current-temp">{isHovered ? "" : <span title={'Temperature'}>
                    {tempConverter(currentConditions?.temp, 'f', tempUnit)}&deg;{tempUnit.toUpperCase()}</span>}
                  </div>
                </>)
        }
        {weatherData && (
          <div id="dropdown"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            tabIndex={0} >
            <div id="dropdown-icon-container"
              className="p-2">
              <i style={{
                transform: isHovered ? 'rotate(180deg)' : 'none',
                transition: 'var(--transition)',
              }}
                className="fa-solid fa-chevron-down"></i>
            </div>
            <WeatherAppDropdown
              hour={hour}
              isHovered={isHovered}
              weatherBg={weatherBackground}
              tempUnit={tempUnit}
              setTempUnit={setTempUnit}
              weatherData={weatherData}
              ipData={ipdata}
              isLoading={isLoading} />
          </div>)
        }
      </WeatherBanner>
    </div>
  )
}
function WeatherAppDropdown({
  hour,
  isHovered,
  weatherBg,
  tempUnit,
  setTempUnit,
  weatherData,
  ipData,
  isLoading
}) {
  const forecastContainerClasses = `w-full h-auto sm:min-w-min flex flex-col
    gap-2.5 py-2.5 px-5 rounded-lg absolute top-0 right-0 shadow-[var(--bs-banner-1)] -z-10`
  const navigate = useNavigate();
  const handleClick = () => navigate('/weather')

  return (
    <div id="forecast-container"
      style={{
        background: weatherBg,
        transition: 'var(--transition)',
        opacity: isHovered ? '1' : '0',
        pointerEvents: isHovered ? 'all' : 'none',
      }}
      className={isHovered ?
        `${forecastContainerClasses} translate-x-0 translate-y-[40px] sm:translate-x-[-10px]` :
        forecastContainerClasses
      }>

      <WeatherAppInnerDropdown
        ipData={ipData}
        setTempUnit={setTempUnit} />
      <WeatherAppCurrentConditions
        hour={hour}
        tempUnit={tempUnit}
        weatherData={weatherData}
        isLoading={isLoading} />
      <WeatherAppHourlyAndDailyCards
        hour={hour}
        tempUnit={tempUnit}
        weatherData={weatherData}
        isLoading={isLoading} />

      <div className="forecast-item p-2.5">
        <div onClick={handleClick}
          className="more-forecast text-center flex justify-center">
          <h3 className="backdrop-blur-lg shadow-(--bs-banner-1) py-1 px-3 
            rounded-full text-[1rem] hover:underline cursor-pointer">
            See full forecast
          </h3>
        </div>
      </div>
    </div>
  )
}

function WeatherAppInnerDropdown({ setTempUnit, ipData }) {
  const [isClickedToOpen, setIsClickedToOpen] = useState(false);
  const { country, city, region } = ipData
  return (
    <div className="forecast-item w-full flex justify-between items-center gap-2.5">
      <div className="current-location w-10/12 h-auto text-[1.3rem]">
        {city}, {region} {country}
      </div>
      <div id="inner-dropdown"
        onClick={() => setIsClickedToOpen(!isClickedToOpen)}
        onBlur={() => setIsClickedToOpen(false)}
        tabIndex={0}
        className="cursor-pointer absolute top-[13px] right-5">
        <div id="inner-dropdown-icon-container"
          className="px-2.5 bg-[rgba(var(--white-rgb),.3)] rounded-full 
          blur-[var(--filter)] hover:bg-[rgba(var(--white-rgb),.4)]">
          <i className="fa-solid fa-ellipsis"></i>
        </div>
        <InnerDropdown isClickedToOpen={isClickedToOpen} setTempUnit={setTempUnit} />
      </div>
    </div>
  )
}

function InnerDropdown({ isClickedToOpen, setTempUnit }) {
  const tempUnitsContainerClasses = `absolute top-0 right-0 p-[10px] rounded-lg 
    w-max transition-[var(--transition)] shadow-[var(--bs-banner-1)]`

  return (
    <ul id="temp-units-container"
      style={{
        backdropFilter: 'var(--filter)',
        opacity: isClickedToOpen ? '1' : '0',
        pointerEvents: isClickedToOpen ? 'all' : 'none',
      }}
      className={isClickedToOpen ?
        `${tempUnitsContainerClasses} translate-x-[-10px] translate-y-[30px]` :
        tempUnitsContainerClasses
      }>
      {Object.entries(tempUnits).map(unit => (
        <li key={unit[1]}
          onClick={() => setTempUnit(unit[1])}
          className="hover:text-[rgba(var(--white-rgb),.5)]">
          &deg;{unit[1].toUpperCase()} {unit[0]}
        </li>
      ))
      }
    </ul>
  )
}

function WeatherAppCurrentConditions({ hour, tempUnit, weatherData }) {
  const { currentConditions, description } = weatherData;

  return (
    <div className="forecast-item w-full">
      <div id="current-conditions-container"
        className="w-full f-full flex gap-2.5 justify-between items-center [&>*]:basis-1/3">
        <div id="current-condition-icon"
          className="max-w-20 aspect-square">
          <img src={handleConditionsIcon(currentConditions?.icon, hour)}
            alt={currentConditions?.conditions}
            title={currentConditions?.conditions} />
        </div>
        <div className="current-temp">
          <span className="text-[clamp(2rem,_5vw,_2.5rem)] text-center block" title="Temperature">
            {tempConverter(currentConditions?.temp, 'f', tempUnit)}&deg;{tempUnit.toUpperCase()}
          </span>
        </div>
        <div className="forecast-description text-[.8rem]" title="Forecast">
          <p>{description}</p>
        </div>
      </div>
    </div>
  )
}

function WeatherAppHourlyAndDailyCards({ hour, tempUnit, weatherData }) {
  const { days } = weatherData
  const [selectedMode, setSelectedMode] = useState('hourly') // hourly and daily
  const [hourlyForecast, setHourlyForecast] = useState([]);

  const forecast = selectedMode === 'hourly' ?
    hourlyForecast :
    days.slice(0, 5)

  useEffect(() => {
    const todayHours = days[0].hours.slice(hour, hour + 5)
    if (selectedMode === 'hourly') {
      if (todayHours.length < 5) {
        const addedHours = days[1].hours.slice(0, 5 - todayHours.length)
        setHourlyForecast(() => {
          return [...todayHours, ...addedHours]
        })
      } else {
        return setHourlyForecast(todayHours)
      }
    }
  }, [selectedMode, hour, days])
  return (
    <div className="forecast-item w-full">
      <div className="hour-day-forecast w-full min-h-50 flex flex-col gap-2.5">
        <div className="hour-day-selection-tabs flex items-center cursor-pointer 
          w-[150px] rounded-lg bg-[rgba(var(--white-rgb),.1)] text-center
          [&>*]:basis-1/2 [&>*]:px-[10px] [&>*]:py-[5px] text-[.8rem]
          [&>*]:hover:bg-[rgba(var(--white-rgb),.3)] overflow-hidden">

          <div className="hour-tab border-b-2 transition-[var(--transition)"
            onClick={() => {
              setSelectedMode('hourly')
            }}
            style={{
              borderRight: '1px solid rgba(var(--white-rgb),.1)',
              borderBottomColor: selectedMode === 'hourly' ? 'var(--aqua)' : 'transparent',
            }}>
            <span>Hourly</span>
          </div>
          <div className="day-tab border-b-2 transition-[var(--transition)"
            onClick={() => {
              setSelectedMode('daily')
            }}
            style={{
              borderBottomColor: selectedMode === 'daily' ? 'var(--aqua)' : 'transparent',
            }}>
            <span>Daily</span>
          </div>
        </div>
        <div className="hour-day-cards-container flex flex-wrap sm:flex-nowrap w-full gap-2.5">

          {
            forecast.map(forecast => (
              <WeatherAppCard
                key={forecast.datetimeEpoch}
                tempUnit={tempUnit}
                forecastData={forecast}
                selectedMode={selectedMode} />))
          }
        </div>
      </div>
    </div>
  )
}

export function WeatherAppCard({ tempUnit, forecastData, selectedMode }) {
  const { conditions, icon, temp, datetime, precipprob } = forecastData
  const hour = datetime.split(':')[0];
  const [day, setDay] = useState('today')
  const days = useMemo(() => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], [])
  useEffect(() => {
    if (selectedMode === 'daily') {
      const formatter = new Intl.DateTimeFormat('default', {
        weekday: 'short',
        timeZone: 'UTC'
      })
      setDay(formatter.format(new Date(datetime)))
    }

  }, [selectedMode, datetime])
  return (
    <div className="hourly-daily-forecast flex flex-col w-max grow sm:w-full items-center gap-1 sm:gap-2.5
      p-2.5 rounded-lg shadow-[var(--bs-banner-1)] backdrop-blur-sm">
      <span className="time whitespace-nowrap">
        {selectedMode === 'hourly' ? (
          hour === '00' || hour === '0' ?
            `12 AM` :
            hour < 12 ? `${hour} AM` : `${hour > 12 ? (hour - 12) : hour} PM`) :
          day === days[new Date().getDay()] ? 'Today' : day}
      </span>
      <span className="icon w-10 aspect-square">
        <img className="w-full h-full"
          src={handleConditionsIcon(icon, hour)}
          alt={conditions}
          title={conditions} />
      </span>
      <span className="temp flex items-center gap-1" title="Temperature"><FaTemperatureHalf className="text-[.7rem]" />{tempConverter(temp, 'f', tempUnit)}&deg;{tempUnit.toUpperCase()}</span>
      <span className="precipitate flex flex-nowrap gap-1 items-center" title="Rain probability">
        <i className="fa-solid fa-droplet text-[.7rem]"></i>{precipprob}%
      </span>
    </div>
  )
}


function WeatherBanner({ weatherBg, children }) {

  return (
    <div id="weather-banner"
      style={{
        background: weatherBg,
      }}
      className="w-full sm:max-w-max h-10 relative flex gap-2.5 justify-between 
        items-center text-[var(--white)] px-[10px] py-[5px] rounded-lg 
        transition-[var(--transition)] shadow-[var(--bs-banner-1)] 
        hover:shadow-[var(--bs-banner-1-inset)] z-50"
    >
      {children}
    </div>
  )
}