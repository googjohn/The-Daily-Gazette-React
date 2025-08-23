import { useState, useEffect, useRef } from "react"
import WeatherAppCard from "./WeatherAppCard";
import tempConverter from "./tempConverter";
import { useFetchForAll } from "../../hooks/UseFetchForAll";

const WAPP = {
  endpoint: 'timeline',
  visualCrossingApikey: import.meta.env.VITE_VISUALCROSSING_API_KEY,
  ipinfoApikey: import.meta.env.VITE_IPINFO_API_KEY
}

export default function WeatherApp() {
  const IPINFO_URL = `https://ipinfo.io/json?token=${WAPP.ipinfoApikey}`;
  const { data: { country, city, loc, region } } = useFetchForAll(IPINFO_URL)
  const lat = loc?.split(',')[0]
  const lon = loc?.split(',')[1]
  const VISUALCROSSING_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/${WAPP.endpoint}/${lat},${lon}?&key=${WAPP.visualCrossingApikey}&iconSet=icons1`
  const { data: weatherData } = useFetchForAll(VISUALCROSSING_URL)
  const { currentConditions } = weatherData;

  const [tempUnit, setTempUnit] = useState('c');
  const [currentTempUnit, setCurrentTempUnit] = useState('f')
  const [isHovered, setIsHovered] = useState(false);
  const [hour, setHour] = useState(new Date().getHours())
  const [bg, setBg] = useState("url('/images/icons/weather_backgrounds/bright-sun-in-blue-sky.jpg') no-repeat center / cover")

  useEffect(() => {
    setHour(new Date().getHours())
    hour <= 6 ?
      setBg("url('/images/icons/weather_backgrounds/starry-night-sky.png') no-repeat center / cover") :
      hour >= 18 ?
        setBg("url('/images/icons/weather_backgrounds/sky-clear-night.jpg') no-repeat center / cover") :
        setBg("url('/images/icons/weather_backgrounds/bright-sun-in-blue-sky.jpg') no-repeat center / cover")
  }, [hour])

  return (
    <>
      <div id="weather-app" className="flex justify-end sticky top-20 z-30 w-full">
        <div
          id="weather-banner"
          style={{
            gap: '10px',
            height: '40px',
            color: 'white',
            display: 'flex',
            borderRadius: '8px',
            padding: '5px 10px',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'var(--transition)',
            background: bg,
          }}
          className="sm:max-w-max w-full shadow-[var(--bs-banner-1)] hover:shadow-[var(--bs-banner-1-inset)]">
          <div className="current-location transition-[var(--transition)]" title="City, Region">{isHovered ? "Weather Forecast Today" : `${city}, ${region}`}</div>
          <div className="current-condition-icon aspect-square h-[30px]">{
            isHovered ? '' :
              <img src={handleConditionsIcon(currentConditions?.icon, hour)} className="w-full h-full" alt={currentConditions?.conditions} title={currentConditions?.conditions} />
          }
          </div>
          <div className="current-temp">{isHovered ? "" : <span title={'Temperature'}>{
            tempConverter(currentConditions?.temp, 'f', tempUnit)
          }&deg;{tempUnit.toUpperCase()}</span>}</div>
          <WeatherAppDropdown
            isHovered={isHovered}
            setIsHovered={setIsHovered}
            background={bg}
            tempUnit={tempUnit}
            setTempUnit={setTempUnit}
            setCurrentTempUnit={setCurrentTempUnit}
            weatherData={weatherData}
            city={city}
            region={region}
            country={country}
          />

        </div>
      </div >
    </>
  )
}

function WeatherAppDropdown({ isHovered, setIsHovered, background, tempUnit, setTempUnit, setCurrentTempUnit, weatherData, city, region, country }) {
  const [isInnerDropdownHovered, setIsInnerDropdownHovered] = useState(false);
  const { currentConditions, description, days } = weatherData

  return (
    <div id="dropdown"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // onFocus={() => setIsHovered(true)}
      // onBlur={() => setIsHovered(false)}
      tabIndex={0}

      className=""
    >
      <div
        id="dropdown-icon-container"
        style={{
          padding: '8px',
        }}>
        <i
          style={{
            transform: isHovered ? 'rotate(180deg)' : 'none',
            transition: 'var(--transition)',
          }}
          className="fa-solid fa-chevron-down"></i>
      </div>
      <div
        id="forecast-container"
        style={{
          top: '0',
          right: '0',
          gap: 'var(--gap)',
          display: 'flex',
          padding: '10px 20px',
          borderRadius: '8px',
          position: 'absolute',
          flexDirection: 'column',
          justifyContent: 'start',
          boxShadow: 'var(--bs-banner-1)',
          transition: 'var(--transition)',
          background: background,
          pointerEvents: isHovered ? 'all' : 'none'
        }}
        className={` w-full h-auto sm:min-w-[390px]
          ${isHovered ?
            'sm:translate-x-[-10px] sm:w-full translate-x-0 translate-y-[40px] opacity-100'
            : 'opacity-0'}`}>
        <div className="forecast-item flex justify-between items-center gap-2.5 w-full">
          <div className="current-location w-10/12 h-auto text-[1.2rem]">{`${city}, ${region} ${country}`}</div>
          <div className="dropdown-inner absolute top-[13px] right-[20px]">
            <div
              onMouseDown={() => setIsInnerDropdownHovered(true)}
              onMouseUp={() => setIsInnerDropdownHovered(false)}
              // onFocus={() => setIsInnerDropdownHovered(true)}
              // onBlur={() => setIsInnerDropdownHovered(false)}
              tabIndex={0}
              className="ellipsis-container px-2.5 bg-[rgba(var(--white-rgb),.3)] 
              rounded-full blur-[var(--filter)] hover:bg-[rgba(var(--white-rgb),.4)] 
              cursor-pointer">
              <i className="fa-solid fa-ellipsis"></i>
            </div>
            <ul
              style={{
                top: '0',
                right: '0',
                padding: '5px',
                cursor: 'pointer',
                borderRadius: '8px',
                position: 'absolute',
                width: 'max-content',
                backdropFilter: 'var(--filter)',
                transition: 'var(--transition)',
                boxShadow: 'var(--bs-banner-1)',
                transform: isInnerDropdownHovered ? 'translateX(-10px) translateY(30px)' : 'none',
                opacity: isInnerDropdownHovered ? '1' : '0',
                pointerEvents: isInnerDropdownHovered ? 'all' : 'none',

              }}
              className="unit-container [&>*]:hover:text-[rgba(var(--white-rgb),.5)]">
              <li onClick={() => {
                setCurrentTempUnit(tempUnit)
                setTempUnit('c')
              }} className="celcius">&deg;C Celcius</li>
              <li onClick={() => {
                setCurrentTempUnit(tempUnit)
                setTempUnit('f')
              }} className="fahrenheit">&deg;F Fahrenheit</li>
              <li onClick={() => {
                setCurrentTempUnit(tempUnit)
                setTempUnit('k')
              }} className="kelvin">&deg;K Kelvin</li>
            </ul>
          </div>
        </div>
        <div className="forecast-item">
          <div className="icon-temp-container w-full h-full flex gap-2.5 justify-between items-center
            [&>*]:basis-1/3">
            <div className="current-condition-icon  max-w-[80px] aspect-square">
              <img
                src={handleConditionsIcon(currentConditions?.icon)}
                className="h-full w-full" alt={currentConditions?.condition} title={currentConditions?.condition} />
            </div>
            <div className="current-temp">
              <span className="text-[clamp(2rem,_5vw,_2.5rem)]">{tempConverter(currentConditions?.temp, 'f', tempUnit)}&deg;{tempUnit.toUpperCase()}</span>
            </div>
            <div className="weather-description text-[.8rem]">{description}</div>
          </div>
        </div>
        <div className="forecast-item flex flex-col gap-2.5">
          <div className="hour-day-forecast min-h-[200px] flex flex-col gap-2.5">
            <div
              style={{
                textAlign: "center",
                display: 'flex',
                alignItems: 'center',
                borderRadius: '8px',
                border: 'solid rgba(var(--text-white-rgb),.1) 1px',
                backdropFilter: 'var(--filter)',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              className="hour-day-selection w-[150px] bg-[rgba(var(--white-rgb),.1)] border-b-[2px] border-transparent
                [&>*]:basis-1/2 [&>*]:px-[10px] [&>*]:py-[5px] text-[.8rem] [&>*]:hover:bg-[rgba(var(--white-rgb),.3)]">
              <div
                style={{
                  borderRight: '1px solid rgba(var(--white-rgb),.1)',
                }}

                className="hour-tab">
                <span>Hourly</span>
              </div>
              <div className="day-tab">
                <span>Daily</span>
              </div>
            </div>

            {/* cards here */}
            <div className="hour-day-cards flex w-full gap-2.5">
              {

                days[0].hours.slice(new Date().getHours(), new Date().getHours() + 5).map(forecast => (
                  <WeatherAppCard key={forecast.datetimeEpoch} dailyWeatherData={forecast} handleConditionsIcon={handleConditionsIcon} tempUnit={tempUnit} />
                ))

              }
            </div>

          </div>
        </div>
        <div className="forecast-item p-2.5">
          <div className="more-forecast text-center ">
            <h3 className="backdrop-blur-(--filter) shadow-(--bs-banner-1) inline py-1 px-3 rounded-full text-[1rem] hover:underline cursor-pointer">See full forecast</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

function handleConditionsIcon(conditionIcon, currentTime) {
  switch (conditionIcon) {
    case 'partly-cloudy-day':
      return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/PartlyCloudyDay.svg'
    case 'partly-cloudy-night':
      return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/PartlyCloudyNight.svg'
    case 'rain':
      return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/ModerateRain.svg'
    case 'clear-day':
      return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlySunnyDay.svg'
    case 'clear-night':
      return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlyClearNight.svg'
    case 'cloudy':
      if (currentTime <= 6) {
        return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlyCloudyNight.svg';
      } else if (currentTime <= 18) {
        return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlyCloudyDay.svg';
      } else if (currentTime <= 23) {
        return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlyCloudyNight.svg';
      }
      break;
    default:
      return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/PartlySunnyDay.svg'
  }
}
