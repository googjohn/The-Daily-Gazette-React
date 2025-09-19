import { useEffect, useState } from "react";
import { FaTemperatureHalf } from "react-icons/fa6";
import { handleConditionsIcon, tempConverter } from "../../components/weatherapp/WeatherForecastUtility";

export function WeatherCard({ tempUnit, forecast, selectedMode, }) {
  const { conditions, icon, temp, datetime, precipprob } = forecast
  const [formattedDatetime, setFormattedDatetime] = useState(null)
  const hour = +datetime.split(':')[0];

  useEffect(() => {
    if (typeof formattedDatetime !== 'string') return;
    if (selectedMode === 'daily') {
      const dateToday = new Date(datetime);
      if (dateToday instanceof Date && !isNaN(dateToday.getTime())) {
        const formatter = new Intl.DateTimeFormat('default', {
          day: 'numeric',
          weekday: 'short',
          timeZone: 'UTC'
        })
        const formattedDate = formatter.format(dateToday)
        setFormattedDatetime(formattedDate)
      }
    }
  }, [selectedMode, datetime])

  return (
    <div id="content-container" className="basis-30 grow">
      <div className="hourly-daily-forecast flex flex-col items-center gap-1 sm:gap-2.5
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
          {tempConverter(temp, 'f', tempUnit)}&deg;{tempUnit.toUpperCase()}
        </div>
        <div className="precipitate flex flex-nowrap gap-1 items-center" title="Rain probability">
          <i className="fa-solid fa-droplet text-[.7rem]"></i>{precipprob}%
        </div>
      </div>
    </div>
  )
}

export function formatDateTime(datetime) {

}