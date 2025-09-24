import { useState, useEffect } from "react";
import { NavLink, useActionData } from "react-router-dom";
import useUpdateWeatherBackground from "../../hooks/UseWeatherBackgroundUpdate";
import useWindowSize from "../../hooks/UseWindowSize";
import useIpGetter from "../../hooks/UseIpGetter";
import Error from "../../components/error/Error";
import Spinner from "../../components/spinner/Spinner";
import { useFetchForAll } from "../../hooks/UseFetchForAll";
import { FaHome } from "react-icons/fa";
import WeatherNews from "./WeatherNews";
import WeatherPageSearchLocation from "./WeatherPageSearchLocation";
import WeatherPageContent from "./WeatherPageContent";


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
  const [searchedWeather, setSearchedWeather] = useState(null);
  const [forecastDataToUse, setForecastDataToUse] = useState(null);
  const [locationToUse, setLocationToUse] = useState(null)

  const { windowSize } = useWindowSize();
  const { weatherBackground } = useUpdateWeatherBackground();

  const { ipdata, error: ipdataError } = useIpGetter();
  const { latitude, longitude } = ipdata || {}

  const VISUALCROSSING_URL = latitude && longitude ?
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?&key=${WAPP.visualCrossingApikey}&iconSet=icons2&elements=%2Baqius` : null
  const { data: weatherData, error: weatherDataError } = useFetchForAll(VISUALCROSSING_URL)

  const actionData = useActionData() || {};
  const { result: weatherSearchData, location: locationQuery } = actionData;

  useEffect(() => {
    if (weatherSearchData) {
      setSearchedWeather(weatherSearchData)
    } else {
      // maybe we can use the last data if seach fails
      setSearchedWeather(null)
    }
  }, [weatherSearchData])

  useEffect(() => {
    if (searchedWeather) {
      setForecastDataToUse(searchedWeather)
    } else {
      setForecastDataToUse(weatherData)
    }
  }, [searchedWeather, weatherData])

  useEffect(() => {
    if (locationQuery) {
      setLocationToUse(locationQuery)
    }
  }, [locationQuery, locationToUse])

  const isIpdataLoading = !ipdata;
  const isWeatherDataLoading = ipdata && !weatherData;
  const isLoading = isWeatherDataLoading || isIpdataLoading;

  return (
    <div id="weather-forecast-page"
      style={{ background: weatherBackground }}>

      {isLoading && (ipdataError || weatherDataError ? <Error /> : <Spinner />)}

      {forecastDataToUse && (
        <div id="weather-container"
          className="w-full p-0 pb-5">
          <WeatherPageNavigation />
          <WeatherPageMainContainer>
            <WeatherPageSearchLocation
              ipdata={ipdata}
              tempUnit={tempUnit}
              forecastData={forecastDataToUse}
              locationQuery={locationQuery}
              setForecastData={setForecastDataToUse}
              setLocationToUse={setLocationToUse}
            />
            <WeatherPageContent
              windowSize={windowSize}
              ipData={ipdata}
              tempUnit={tempUnit}
              setTempUnit={setTempUnit}
              locationToUse={locationToUse}
              forecastData={forecastDataToUse} />
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

export const weatherSearchAction = async ({ request }) => {
  const formData = await request.formData();
  const location = formData.get('location')
  const VISUALCROSSING_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?&key=${WAPP.visualCrossingApikey}&iconSet=icons2&elements=%2Baqius`
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