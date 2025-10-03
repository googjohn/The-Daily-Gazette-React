import { useState, useEffect } from "react";
import { NavLink, useNavigation } from "react-router-dom";
import useUpdateWeatherBackground from "../../hooks/UseWeatherBackgroundUpdate";
import useWindowSize from "../../hooks/UseWindowSize";
import useIpGetter from "../../hooks/UseIpGetter";
import ErrorPage from "../../components/error/ErrorPage";
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
  const [forecastDataToUse, setForecastDataToUse] = useState(null);

  const { windowSize } = useWindowSize();
  const navigation = useNavigation();

  const { ipdata, error: ipdataError } = useIpGetter()
  const { latitude, longitude } = ipdata || {}

  const VISUALCROSSING_URL = latitude && longitude ?
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?&key=${WAPP.visualCrossingApikey}&iconSet=icons2&elements=%2Baqius` :
    null;
  const { data: weatherData, error: weatherDataError } = useFetchForAll(VISUALCROSSING_URL)

  const { weatherBackground } = useUpdateWeatherBackground(forecastDataToUse?.currentConditions?.icon);

  useEffect(() => {
    setForecastDataToUse(weatherData)
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
          {/* <WeatherNews ipdata={ipdata} /> */}
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
      const errorText = await response.text()
      const error = new Error('Search failed: location unknown', errorText)
      error.status = response.status
      throw error
    }

    const result = await response.json();
    return { result, location }
  } catch (error) {
    if (error.name === 'AbortError') return;
    console.log(error.message)
    return { result: error, location }
  }
}