import { useState, useEffect, useMemo, } from "react";
import { useActionData, useSubmit } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import AlertModal from "../../components/alert/AlertModal";
import { handleConditionsIcon, tempConverter } from "./WeatherPageUtility.js";

export default function WeatherPageSearchLocation({ ipdata, forecastData, tempUnit, setForecastData }) {
  const { city, region } = ipdata?.data || {}
  const initialLocation = city && region ? `${city}, ${region}` : 'Home address'
  const initialWeather = useMemo(() => {
    const uniqueId = crypto.randomUUID();
    return {
      id: uniqueId,
      data: forecastData,
      location: initialLocation,
    }
  }, []);

  const [alert, setAlert] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'warning'
  })
  const [inputValue, setInputValue] = useState('');
  const [currentActiveLocation, setCurrentActiveLocation] = useState(initialLocation);
  const [locationsDataArray, setLocationsDataArray] = useState([initialWeather]);

  // handles the data fetched after searching location. initial value of undefined
  const submit = useSubmit();
  const actionData = useActionData();
  const { result: weatherSearchData, location: locationQuery } = actionData || {};

  useEffect(() => {
    if (!locationQuery) return;

    const hasLocation = locationsDataArray.some(weather => weather.location.toLowerCase() === locationQuery.toLowerCase())
    if (hasLocation) return

    if (weatherSearchData.message) {
      handleError();
      return;
    }

    const uniqueId = crypto.randomUUID();
    const newWeather = {
      id: uniqueId,
      data: weatherSearchData,
      location: locationQuery,
    }
    setLocationsDataArray(prev => [...prev, newWeather])

    const currentWeather = locationsDataArray.find(weather => weather.location.toLowerCase() === currentActiveLocation.toLowerCase())
    if (currentWeather) {
      setForecastData(newWeather.data)
      setCurrentActiveLocation(newWeather.location)
      handleAddSuccess();
    }
    setInputValue('')
  }, [weatherSearchData, locationQuery])

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
    handleRemoveSuccess();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    const hasLocation = locationsDataArray.some(weather => weather.location.toLowerCase() === trimmedInput.toLowerCase())

    if (hasLocation) {
      handleDuplicateSearch();
      return;
    }

    const formData = new FormData();
    formData.append('location', trimmedInput)

    submit(formData, { method: 'post' })
    setInputValue('')
  }

  const showAlert = (title, message, type) => {
    setAlert({
      isOpen: true,
      title,
      message,
      type
    });
  }
  const closeAlert = () => {
    setAlert({ ...alert, isOpen: false })
  }
  const handleDuplicateSearch = () => {
    showAlert(
      'Location Already Added',
      'This location is already added in your search list.',
      'warning')
  }
  const handleAddSuccess = () => {
    showAlert(
      'Location Added',
      'Location successfully added.',
      'success',
    )
  }
  const handleRemoveSuccess = () => {
    showAlert(
      'Location Removed',
      'Location successfully removed.',
      'success',
    )
  }
  const handleError = () => {
    showAlert(
      'Error Occurred',
      'Failed to fetch weather data. Please try again.',
      'error'
    )
  }
  return (
    <div id="weather-page-search-location"
      className="w-full px-2.5 py-5 backdrop-blur-lg bg-black/10 sm:px-0 border-b border-t mb-10 border-white/15">
      <div className="container w-11/12 max-w-[1280px] mx-auto flex flex-wrap flex-col sm:flex-row md:justify-start justify-center items-center gap-2.5">
        <AlertModal
          isOpen={alert.isOpen}
          onClose={closeAlert}
          title={alert.title}
          message={alert.message}
          type={alert.type} />
        <form onSubmit={handleSubmit}>
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
        </form>
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
                onClick={(e) => {
                  e.stopPropagation()
                  handleClickRemove(loc?.id, loc?.location)
                }}
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
