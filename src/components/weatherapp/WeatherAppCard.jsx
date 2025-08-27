import tempConverter from "./tempConverter"

export default function WeatherAppCard({ dailyWeatherData, handleConditionsIcon, tempUnit }) {
  const { datetime, icon, temp, conditions, precipprob } = dailyWeatherData
  const time = datetime.split(':')[0]
  return (
    <div style={{
      flexBasis: '20%',
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 'var(--gap)',
      padding: '10px',
      borderRadius: '8px',
      backdropFilter: 'var(--filter)',
      boxShadow: 'var(--bs-banner-1)',
    }}
      className="hourly-item ">
      <span className="time whitespace-nowrap">{time < 12 ? `${time}AM` : `${time - 12}PM`}</span>
      <span className="icon w-10 aspect-square">
        <img
          className="w-full h-full"
          src={handleConditionsIcon(icon, time)} alt={conditions} title={conditions} />
      </span>
      <span className="hourly-temp">{tempConverter(temp, 'f', tempUnit)}&deg;{tempUnit}</span>
      <span className="precipitate flex flex-nowrap gap-[5px] items-center">{precipprob}%</span>
    </div>
  )
}