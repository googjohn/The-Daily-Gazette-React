import { useState, useEffect, useMemo, useRef } from "react";
import { Form, useActionData } from "react-router-dom";
import { handleConditionsIcon, tempConverter } from "../../components/weatherapp/WeatherForecastUtility";
import { IoIosClose } from "react-icons/io";

export default function WeatherPageSearchLocation({ ipdata, forecastData, tempUnit, setForecastData }) {
  const { city, region } = ipdata || {}
  const initialLocation = city && region ? `${city}, ${region}` : 'Home address'
  const initialWeather = useMemo(() => {
    const uniqueId = crypto.randomUUID();
    return {
      id: uniqueId,
      data: forecastData,
      location: initialLocation,
    }
  }, []);
  const [inputValue, setInputValue] = useState('');
  const [currentActiveLocation, setCurrentActiveLocation] = useState(initialLocation);
  const [locationsDataArray, setLocationsDataArray] = useState([initialWeather]);
  const lastRemoved = useRef('');

  // handles the data fetched after searching location. initial value of undefined
  const actionData = useActionData();
  const { result: weatherSearchData, location: locationQuery } = actionData || {};

  console.log(locationsDataArray)
  console.log(currentActiveLocation)
  console.log('this is the searched data', weatherSearchData)
  useEffect(() => {
    if (!locationQuery) return;
    const hasLocation = locationsDataArray.some(weather => weather.location.toLowerCase() === locationQuery.toLowerCase())
    if (hasLocation) return;

    if (weatherSearchData.message) {
      alert(weatherSearchData.message)
      return;
    }

    const uniqueId = crypto.randomUUID();
    const newWeather = {
      id: uniqueId,
      data: weatherSearchData,
      location: locationQuery,
    }
    setLocationsDataArray(prev => [...prev, newWeather])

    setInputValue('')
  }, [weatherSearchData, locationQuery])

  // update forecastData to always be the latest
  useEffect(() => {
    if (lastRemoved.current) {
      if (currentActiveLocation.toLowerCase() !== lastRemoved.current.toLowerCase()) {

        const currentWeather = locationsDataArray.filter(weather => weather.location.toLowerCase() === currentActiveLocation.toLowerCase())
        setForecastData(currentWeather.data)
        setCurrentActiveLocation(currentWeather.location)
      }
    }

    const lastWeather = locationsDataArray[locationsDataArray.length - 1]
    setCurrentActiveLocation(lastWeather.location)
    setForecastData(lastWeather.data)
  }, [locationsDataArray])

  const handleClickBanner = (targetData, targetLocation) => {
    setForecastData(targetData)
    setCurrentActiveLocation(targetLocation);
  }

  const handleClickRemove = (weatherId, weatherToRemove) => {
    if (weatherId === initialWeather.id) return;
    const newLocationsArray = locationsDataArray.filter(weather => weather.location.toLowerCase() !== weatherToRemove.toLowerCase())
    setLocationsDataArray(newLocationsArray)

    if (currentActiveLocation.toLowerCase() === weatherToRemove.toLowerCase()) {
      const lastWeather = newLocationsArray[newLocationsArray.length - 1]
      setForecastData(lastWeather.data)
      setCurrentActiveLocation(lastWeather.location)
    }
    lastRemoved.current = weatherToRemove
  }
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
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search location"
              className="border bg-white/10 border-white/30 border-r-0 outline-none rounded-l-full px-3 py-2 w-full min-w-[280px] max-w-[350px]" />
            <button type="submit" className="border border-white/30 px-3 py-2 rounded-r-full cursor-pointer bg-[var(--primary-color)]">
              <i className="fas fa-search text-white/60"></i>
            </button>
          </div>
        </Form>
        <div id="search-result-banner-container"
          className="flex justify-center flex-wrap text-white gap-2.5">
          {locationsDataArray && locationsDataArray.map((loc) => (

            <div key={loc?.id}
              onClick={() => handleClickBanner(loc?.data, loc?.location)}
              className="border bg-white/10 border-white/30 flex gap-2.5 justify-center items-center px-2.5 py-1 rounded-lg cursor-pointer">
              <span>{loc?.location}</span>
              <span><img
                src={handleConditionsIcon(loc?.data?.currentConditions?.icon) || null}
                className="w-9 aspect-square" />
              </span>
              <span>{tempConverter(loc?.data?.currentConditions?.temp, 'f', tempUnit)}
                <span className="align-super text-[.6rem]">&deg;{tempUnit.toUpperCase()}</span>
              </span>
              {loc?.location.toLowerCase() !== initialLocation.toLowerCase() && (<span
                onClick={() => handleClickRemove(loc?.id, loc?.location)}
                title="Remove location"
                className="close p-1.5 border border-white/20 rounded-lg">
                <IoIosClose className="text-red-700 text-[1.2rem] hover:scale-150" />
              </span>
              )}
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}
