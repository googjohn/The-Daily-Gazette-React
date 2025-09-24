import { useState, useEffect, useRef } from "react";
import { Form } from "react-router-dom";
import { handleConditionsIcon, tempConverter } from "../../components/weatherapp/WeatherForecastUtility";
import { IoIosClose } from "react-icons/io";

export default function WeatherPageSearchLocation({ ipdata, forecastData, locationQuery, tempUnit, setForecastData, setLocationToUse }) {
  const { city, region } = ipdata || {}
  const initialLocation = `${city}, ${region}`

  const [inputValue, setInputValue] = useState('');
  const lastSearched = useRef('')
  const uniqueId = crypto.randomUUID()
  const [locationsArray, setLocationsArray] = useState(() => {
    return [{
      data: forecastData,
      location: initialLocation,
      index: uniqueId,
    }]
  });

  useEffect(() => {

    if (forecastData && locationQuery) {
      setLocationsArray((prev) => {

        const locationExist = prev.some(loc => loc.location.toLowerCase() === locationQuery.toLowerCase());
        if (locationExist) return prev

        const uniqueId = crypto.randomUUID()
        return [
          ...prev,
          {
            data: forecastData,
            location: locationQuery,
            index: uniqueId
          }
        ]
      })
    }
  }, [forecastData])
  console.log(locationsArray)

  const handleClickToRemove = (targetIndex, targetLocation) => {
    if (targetLocation === initialLocation) {
      alert('cant remove your default location')
      return;
    }
    setLocationsArray(prev => prev.filter(loc => loc.index !== targetIndex))
  }

  const handleClickToChoose = (targetData, targetLocation) => {
    if (forecastData !== targetData) {
      setForecastData(targetData)
    }
    if (targetLocation !== locationQuery) {
      setLocationToUse(targetLocation)
    }
    if (targetLocation === lastSearched.current) {
      lastSearched.current = ''
    }
  }

  const handleSubmitCheck = (e) => {
    if (inputValue.trim().toLowerCase() === lastSearched.current.trim().toLowerCase()) {
      e.preventDefault();
      return;
    }
    lastSearched.current = inputValue
  }
  console.log(lastSearched.current)
  console.log(inputValue)

  return (
    <div id="weather-page-search-location"
      className="w-full px-2.5 py-5 backdrop-blur-lg bg-black/10 sm:px-0 border-b border-t mb-10 border-white/15">
      <div className="container w-11/12 max-w-[1280px] mx-auto flex flex-wrap flex-col sm:flex-row md:justify-start justify-center items-center gap-2.5">
        <Form method="post" onSubmit={handleSubmitCheck}>
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
          {locationsArray && locationsArray.map((loc) => (

            <div key={`${loc?.location}-${loc?.index}`}
              onClick={() => handleClickToChoose(loc?.data, loc?.location)}
              className="border bg-white/10 border-white/30 flex gap-2.5 justify-center items-center px-2.5 py-1 rounded-lg cursor-pointer">
              <span>{loc?.location}</span>
              <span><img
                src={handleConditionsIcon(loc?.data?.currentConditions?.icon) || null}
                className="w-9 aspect-square" />
              </span>
              <span>{tempConverter(loc?.data?.currentConditions?.temp, 'f', tempUnit)}
                <span className="align-super text-[.6rem]">&deg;{tempUnit.toUpperCase()}</span>
              </span>
              <span
                onClick={() => handleClickToRemove(loc.index, loc.location)}
                title="Remove location"
                className="close p-1.5 border border-white/20 rounded-lg">
                <IoIosClose className="text-red-700 text-[1.2rem] hover:scale-150" />
              </span>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}
