import { useState, useEffect } from "react";
import { NavLink, useNavigation } from "react-router-dom";
import useUpdateWeatherBackground from "../../hooks/UseWeatherBackgroundUpdate";
import useWindowSize from "../../hooks/UseWindowSize";
import ErrorPage from "../../components/error/ErrorPage";
import Spinner from "../../components/spinner/Spinner";
import { useFetch } from "../../hooks/UseFetchForAll";
import { FaHome } from "react-icons/fa";
import WeatherNews from "./WeatherNews";
import WeatherPageSearchLocation from "./WeatherPageSearchLocation";
import WeatherPageContent from "./WeatherPageContent";
import { useMemo } from "react";

const WAPP = {
  endpoint: 'timeline',
  visualCrossingApikey: import.meta.env.VITE_VISUALCROSSING_API_KEY,
  ipinfoApikey: import.meta.env.VITE_IPINFO_API_KEY,
  openWeatherApikey: import.meta.env.VITE_OPENWEATHER_API_KEY,
}

const navLinks = [
  { id: 1, name: 'The Daily Weather', to: '/weather' },
  { id: 2, name: 'Home', to: '/' },
]

export default function WeatherPage() {
  const [tempUnit, setTempUnit] = useState('c');
  const [forecastDataToUse, setForecastDataToUse] = useState(null);

  const { windowSize } = useWindowSize();
  const navigation = useNavigation();

  const ipLookUpURL = '/api/ip/ipLookUp'
  const {
    data: ipdata,
    error: ipdataError,
    loading: ipdataLoading
  } = useFetch(ipLookUpURL)
  const { latitude, longitude } = ipdata?.data || {}

  const VISUALCROSSING_URL = useMemo(() => {
    return latitude && longitude
      ? `/api/weather/visualCrossing?latitude=${latitude}&longitude=${longitude}`
      : null;
  }, [latitude, longitude])

  const {
    data: weatherData,
    error: weatherDataError,
    loading: weatherDataLoading
  } = useFetch(VISUALCROSSING_URL)

  // backup if cors restricted during deployment
  // const { data: weatherData, error: weatherDataError } = useVisualCrossing(latitude, longitude);
  const { weatherBackground } = useUpdateWeatherBackground(forecastDataToUse?.currentConditions?.icon);

  useEffect(() => {
    if (weatherData) {
      setForecastDataToUse(weatherData.data)
    }
  }, [weatherData])

  const isIpdataLoading = !ipdata;
  const isWeatherDataLoading = ipdata && !weatherData;
  const isLoading = isWeatherDataLoading || isIpdataLoading;
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div id="weather-forecast-page"
      style={{ background: weatherBackground }}>

      {isSubmitting && <Spinner />}
      {isLoading && (ipdataError || weatherDataError ?
        <ErrorPage error={ipdataError || weatherDataError} /> :
        <Spinner />)
      }

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