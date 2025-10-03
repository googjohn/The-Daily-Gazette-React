import useClock from "../../hooks/useClock";
import { FaCloud, FaCloudSunRain, FaFan, FaTemperatureArrowDown, FaTemperatureArrowUp, FaTemperatureHalf, FaWind } from "react-icons/fa6";
import { FaTint } from "react-icons/fa";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { LuWindArrowDown } from "react-icons/lu";
import { MdVisibility } from "react-icons/md";
import { TbUvIndex } from "react-icons/tb";
import { WiBarometer, WiHumidity } from "react-icons/wi";
import { useEffect, useState } from "react";
import { handleConditionsIcon, tempConverter } from "../../components/weatherapp/WeatherForecastUtility";
import { useFetchForAll } from "../../hooks/UseFetchForAll";
import {
  toKm,
  toM,
  updateUVIndex,
  updateWindDirection,
  updateHumidityStatus,
  updatePressureStatus,
  updateWindspeedStatus,
  updateAirQualityIndex,
  updateCloudcoverStatus,
  updateVisibilityStatus,
} from "./WeatherPageUtility";
import OverviewChart from "./PieChart";
import WeatherCard from "./WeatherCard";
import { formatDate } from "./WeatherPageUtility";

export default function WeatherPageContent({ windowSize, ipData, tempUnit, setTempUnit, forecastData }) {

  return (
    <div id="weather-content-container"
      className="container px-2.5 sm:px-0 w-full sm:w-11/12 max-w-[1280px] 
      mx-auto flex flex-col sm:flex-row gap-2.5">
      <div id="current-weather-conditions" className={`flex flex-col sm:flex-row gap-2.5 
        text-white  ${windowSize.width < 640 ? 'rounded-t-xl' : ''} sm:rounded-l-xl`}>
        <WeatherSideBar
          windowSize={windowSize}
          ipData={ipData}
          tempUnit={tempUnit}
          forecastData={forecastData} />
        <WeatherForecastContent
          windowSize={windowSize}
          tempUnit={tempUnit}
          setTempUnit={setTempUnit}
          forecastData={forecastData} />
      </div>
    </div>
  )
}

export function WeatherSideBar({ windowSize, ipData, tempUnit, forecastData }) {
  return (
    <div id="weather-sidebar"
      className={`flex flex-col basis-lg gap-2.5 text-white 
      ${windowSize.width < 640 ? 'rounded-t-xl' : ''} sm:rounded-l-xl`}>
      <WeatherCurrentConditions
        ipData={ipData}
        tempUnit={tempUnit}
        forecastData={forecastData} />
      <WeatherOverview
        tempUnit={tempUnit}
        forecastData={forecastData} />
      {/* <WeatherNewsLocal
        windowSize={windowSize}
        ipdata={ipData} /> */}
    </div>
  )
}

export function WeatherCurrentConditions({ ipData, tempUnit, forecastData }) {
  const { city, region } = ipData || {};
  const { currentConditions, days, resolvedAddress } = forecastData || {};
  const { description } = days[0] || []
  const { dateToday, timer } = useClock();
  const hour = new Date().getHours();
  const resolvedAdressLen = resolvedAddress?.split(',').length
  const addressToUse = resolvedAdressLen === 2 ? `${city}, ${region}` : resolvedAddress

  return (
    <div className="min-w-80 backdrop-blur-lg shadow-[var(--bs-banner-1)] rounded-xl 
          h-auto px-2.5 p-5 flex flex-col gap-1.5">

      <div className="location flex items-center gap-2">
        <div className="location-icon">
          <i className="fas fa-map-marker-alt"></i>
        </div>
        <div className="location-text">
          <p id="location">{addressToUse}</p>
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

export function WeatherOverview({ tempUnit, forecastData }) {
  const { days, description } = forecastData || {}
  const rainySnowyDays = days.filter(day => day.icon === 'rain' ||
    day.icon === 'thunder-rain' ||
    day.icon === 'thunder-showers-day' ||
    day.icon === 'showers-day' ||
    day.icon === 'snow')
  const averageTempHigh = days?.length ? Math.round(days.reduce((acc, curr) => acc + curr.tempmax, 0) / days.length * 100) / 100 : 0
  const averageTempLow = days?.length ? Math.round(days.reduce((acc, curr) => acc + curr.tempmin, 0) / days.length * 100) / 100 : 0

  const pieChartData = [
    { id: 'Rainy/Snowy Days', name: 'Rainy/Snowy Days', label: 'Rainy', value: rainySnowyDays.length, color: '#0575e6' },
    { id: 'Sunny/Cloudy Days', name: 'Sunny/Cloudy Days', label: 'Sunny', value: (days.length - rainySnowyDays.length), color: 'hsl(39, 100%, 50%)' },
  ]

  const formattedDate = formatDate(new Date(), {
    year: 'numeric',
    month: 'short',
  })
  const dateArray = formattedDate.split(' ')
  const month = dateArray[0]
  const year = dateArray[dateArray.length - 1]

  return (
    <div id="weather-overview"
      className="relative min-w-80 backdrop-blur-lg shadow-[var(--bs-banner-1)] 
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

export function WeatherNewsLocal({ ipdata, windowSize }) {

  const NEWSDATAIO_URL = ipdata?.country ? `https://newsdata.io/api/1/latest?q=weather&country=${ipdata?.country}&language=en&apikey=${import.meta.env.VITE_NEWSDATAIO_API_KEY}` : null
  const { data: localWeatherNews, error } = useFetchForAll(NEWSDATAIO_URL)

  return (
    <div id="local-weather-news"
      className={`${windowSize.width < 1280 ? 'h-auto' : 'h-[600px]'} relative min-w-80 
      backdrop-blur-lg shadow-[var(--bs-banner-1)] rounded-xl px-2.5 p-5 flex flex-col gap-1.5`}>
      <div className="header pb-4 border-b border-white/20">
        <h2 className="heading text-xl">Local Weather News</h2>
      </div>
      <div className="mt-4 h-auto text-black overflow-auto">
        {error && (<div>No available data.</div>)}
        {!localWeatherNews && (<div>Loading data...</div>)}
        <ul>
          {localWeatherNews && localWeatherNews?.results?.map((article, index) => (
            <li
              key={article.article_id}
              className="flex items-center gap-2.5 [&:nth-child(even)]:bg-transparent
            [&:nth-child(even)]:text-white [&:nth-child(odd)]:bg-(--gray-20)">

              <span className="item-number basis-[45px] w-[45px] h-[60px] flex 
              justify-center items-center text-white rounded-[50%] m-[5px] 
              text-[clamp(1.2rem,_2vw,_1.5rem)] bg-(--navy)">{index + 1}</span>

              <a href={article.link} target="_blank" className=" 
              basis-[calc(100%-55px)] text-[clamp(.7rem,_1.5vw,_.8rem)] 
              hover:underline">{article.title}</a>

            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function WeatherForecastContent({ windowSize, tempUnit, setTempUnit, forecastData }) {
  const { currentConditions, days } = forecastData
  const [forecastDate, setForecastDate] = useState(null);
  const [dayToFocus, setDayToFocus] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [selectedMode, setSelectedMode] = useState('hourly')

  const formatterOptions = {
    month: 'short',
    day: 'numeric',
  }
  const today = formatDate(new Date(), formatterOptions)

  useEffect(() => {
    if (selectedMode === 'hourly') {
      setForecast(days[0]?.hours)
    } else {
      setForecast(days)
    }
  }, [selectedMode, days])

  // changes hourly data depending on clicked daily forecast
  useEffect(() => {
    if (dayToFocus) {
      const filterDays = days.filter(day => day.datetimeEpoch === dayToFocus)
      setForecast(filterDays[0]?.hours)

      const date = new Date(dayToFocus * 1000);
      const formattedDate = formatDate(date, formatterOptions)
      setForecastDate(formattedDate)
    }
  }, [dayToFocus, days])
  return (
    <div id="weather-forecast-content"
      className={`shadow-[var(--bs-banner-1)] w-full max-h-max backdrop-blur-lg overflow-hidden rounded-xl flex flex-col 
      gap-2.5 p-2.5 pb-5 ${windowSize.width < 640 ? 'rounded-b-xl' : ''} sm:rounded-r-xl`}>
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

        <div className="hourly-header">
          <h2 className="text-center">{forecastDate || today}</h2>
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
            id={forecast.datetimeEpoch}
            key={forecast.datetimeEpoch || forecast.datetime}
            tempUnit={tempUnit}
            forecast={forecast}
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
            setDayToFocus={setDayToFocus} />
        ))}
      </div>
      <WeatherHighlights currentConditions={currentConditions} />
    </div>
  )
}

export function WeatherHighlights({ currentConditions }) {
  const { windspeed, visibility, sunset, sunrise, humidity, pressure, cloudcover, aqius, uvindex, winddir } = currentConditions;
  const windStatus = updateWindspeedStatus(toKm(windspeed));
  const pressureStatus = updatePressureStatus(pressure);
  const humidityStatus = updateHumidityStatus(humidity);
  const visibilityStatus = updateVisibilityStatus(toM(visibility));
  const cloudcoverStatus = updateCloudcoverStatus(cloudcover);
  const aqiStatus = updateAirQualityIndex(aqius);
  const uvindexStatus = updateUVIndex(uvindex);
  const winddirStatus = updateWindDirection(winddir);

  const highlights = [
    { title: 'Wind Status', value: [toKm(windspeed)], unit: 'Km/h', status: windStatus, icon: [<FaWind />] },
    { title: 'Wind Direction', value: [winddir], unit: '°', status: winddirStatus, icon: [<FaFan />] },
    { title: 'Pressure', value: [pressure], unit: 'hPa', status: pressureStatus, icon: [<WiBarometer />] },
    { title: 'Humidity', value: [humidity], unit: '%', status: humidityStatus, icon: [<WiHumidity />] },
    { title: 'Visibility', value: [toKm(visibility)], unit: 'Km', status: visibilityStatus, icon: [<MdVisibility />] },
    { title: 'Sunrise & Sunset', value: [sunrise, sunset], unit: 'AM', status: 'Normal', icon: [<GiSunrise />, <GiSunset />] },
    { title: 'Cloudcover', value: [cloudcover], unit: '%', status: cloudcoverStatus, icon: [<FaCloud />] },
    { title: 'Air Quality Index', value: [aqius], unit: '', status: aqiStatus, icon: [<LuWindArrowDown />] },
    { title: 'UV Index', value: [uvindex], unit: '', status: uvindexStatus, icon: [<TbUvIndex />] },
  ]

  return (
    <div className="highlights">
      <div className="header pt-2.5 pb-4 border-b border-white/20">
        <h2 className="heading text-xl">Today's Highlights</h2>
      </div>
      <div className="cards mt-5 flex flex-wrap gap-2.5 justify-evenly [&>*]:min-h-30 [&>*]:basis-1/4 [&>*]:grow 
        [&>*]:min-w-60 [&>*]:shadow-[var(--bs-banner-1)] [&>*]:rounded-xl">
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