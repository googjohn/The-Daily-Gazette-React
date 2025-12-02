import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { NavLink, useNavigation } from "react-router-dom";
import useUpdateWeatherBackground from "../../hooks/UseWeatherBackgroundUpdate";
import useWindowSize from "../../hooks/UseWindowSize";
import ErrorPage from "../../components/error/ErrorPage";
import Spinner from "../../components/spinner/Spinner";
import { useFetch, useIplookup } from "../../hooks/UseFetchForAll";
import { FaHome } from "react-icons/fa";
import WeatherNews from "./WeatherNews";
import WeatherPageSearchLocation from "./WeatherPageSearchLocation";
import WeatherPageContent from "./WeatherPageContent";

const navLinks = [
  { id: 1, name: 'The Daily Weather', to: '/weather' },
  { id: 2, name: 'Home', to: '/' },
]

export default function WeatherPage() {
  const [tempUnit, setTempUnit] = useState('c');
  const [forecastDataToUse, setForecastDataToUse] = useState(null);

  const { windowSize } = useWindowSize();
  const navigation = useNavigation();

  const {
    data: ipdata,
    error: ipdataError,
    loading: ipdataLoading
  } = useIplookup()

  const VISUALCROSSING_URL = useMemo(() => {
    let url = null
    if (ipdata) {
      const { latitude, longitude } = ipdata.data
      url = `/api/weather/visualCrossing?latitude=${latitude}&longitude=${longitude}`
    }
    return url
  }, [ipdata])

  const {
    data: weatherData,
    error: weatherDataError,
    loading: weatherDataLoading
  } = useFetch(VISUALCROSSING_URL)

  const { weatherBackground } = useUpdateWeatherBackground(forecastDataToUse?.currentConditions?.icon);

  useEffect(() => {
    if (weatherData) {
      setForecastDataToUse(weatherData.data)
    }
  }, [weatherData])

  const isLoading = ipdataLoading || weatherDataLoading
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div id="weather-forecast-page"
      style={{ background: weatherBackground }}>

      {isSubmitting || isLoading && <Spinner />}
      {/* {isLoading && (ipdataError || weatherDataError ?
        <ErrorPage error={ipdataError || weatherDataError} /> :
        <Spinner />)
      } */}

      {forecastDataToUse && (
        <div id="weather-container"
          className="w-full p-0 pb-5">
          <WeatherPageNavigation />
          <WeatherPageMainContainer>
            <WeatherPageSearchLocation
              ipdata={ipdata}
              tempUnit={tempUnit}
              forecastData={forecastDataToUse}
              setForecastData={setForecastDataToUse}
            />
            <WeatherPageContent
              windowSize={windowSize}
              ipData={ipdata}
              tempUnit={tempUnit}
              setTempUnit={setTempUnit}
              forecastData={forecastDataToUse} />
          </WeatherPageMainContainer>
          <WeatherNews ipdata={ipdata} />
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