import { useEffect, useState, } from "react";
import { FaTemperatureHalf } from "react-icons/fa6";
import { handleConditionsIcon, tempConverter } from "../../components/weatherapp/WeatherForecastUtility";
import { formatDate } from "./WeatherPageUtility";

export default function WeatherCard({ tempUnit, forecast, selectedMode, setSelectedMode, setDayToFocus }) {
  const { conditions, icon, temp, datetime, precipprob } = forecast
  const [formattedDatetime, setFormattedDatetime] = useState(null)
  const hour = Number(datetime.split(':')[0]) || 0;

  useEffect(() => {
    if (selectedMode === 'daily') {
      const dateToday = new Date(datetime);
      if (dateToday instanceof Date && !isNaN(dateToday)) {
        const formattedDate = formatDate(dateToday, {
          day: 'numeric',
          weekday: 'short',
        })
        setFormattedDatetime(formattedDate)
      }
    }
  }, [selectedMode, datetime, formattedDatetime])

  const handleDailyCardOnClick = () => {
    if (selectedMode === 'daily') {
      setDayToFocus(forecast.datetimeEpoch)
      setSelectedMode('hourly')
    }
  }

  return (
    <div
      style={{
        cursor: selectedMode === 'daily' ? 'pointer' : 'default'
      }}
      onClick={handleDailyCardOnClick}
      className="basis-30 grow">
      <div className="hourly-daily-forecast flex flex-col items-center gap-2.5
      p-2.5 rounded-lg shadow-[var(--bs-banner-1)] backdrop-blur-sm">
        {selectedMode === 'hourly' ? (
          <div className="time">{
            hour === 0 ? '12 AM' :
              hour < 12 ? `${hour} AM` :
                `${hour > 12 ? (hour - 12) : hour} PM`}
          </div>) : (
          <div className="dates w-20 flex justify-around">
            <span className="date">{formattedDatetime?.split(' ')[0]}</span>
            <span className="weekday">{formattedDatetime?.split(' ')[1]}</span>
          </div>)
        }
        <div className="icon">
          <img className="w-12 aspect-square"
            src={handleConditionsIcon(icon, new Date().getHours())}
            alt={conditions}
            title={conditions} />
        </div>
        <div className="temp flex items-center gap-1" title="Temperature">
          <FaTemperatureHalf className="text-[.7rem]" />
          {tempConverter(temp, 'f', tempUnit)}<span className="text-[.6rem]">&deg;{tempUnit.toUpperCase()}</span>
        </div>
        <div className="precipitate flex flex-nowrap gap-1 items-center" title="Rain probability">
          <i className="fa-solid fa-droplet text-[.7rem]"></i>{precipprob}%
        </div>
      </div>
    </div>
  )
}