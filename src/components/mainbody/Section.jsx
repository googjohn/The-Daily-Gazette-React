import useClock from "../../hooks/useClock";
import Salutation from "../../routes/home/Salutation";
import WeatherApp from "../weatherapp/WeatherForecastApp";

export default function Section({ id, sectionData, salutation, weatherData }) {
  const sectionStyle = "h-full w-11/12 max-w-[1536px] bg-[var(--gray-10)] p-2.5 mx-auto mt-20 mb-5"
  const sectionContentStyle = 'grid grid-template';
  const { dateToday, timer, formatter } = useClock();
  return (
    <section id={id} className={sectionStyle}>
      <div className="container mx-auto">
        {weatherData && (
          <WeatherApp />
        )
        }
        {id === 'world-news' &&
          salutation &&
          <Salutation
            dateToday={dateToday}
            timer={timer}
            formatter={formatter}
          />
        }
        {sectionData.map((data, index) => (
          <div key={index} className="section-content-container">
            {data.title && (
              <div className="section-title">
                <h2>{data.title}</h2>
              </div>
            )}
            {data.content && (
              <div className={`section-content ${sectionContentStyle} ${data.customGrid}`}>
                {data.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}