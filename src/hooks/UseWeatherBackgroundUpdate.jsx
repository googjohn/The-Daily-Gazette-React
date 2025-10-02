import { useState, useEffect } from "react";

// needs to be updated for condition rain at day and night
export default function useUpdateWeatherBackground(condition) {
  const [hour, setHour] = useState(new Date().getHours());
  const [weatherBackground, setWeatherBackground] = useState("url('/images/icons/weather_backgrounds/sunny-day.jpg') no-repeat center / cover");

  const rainConditions = ['showers', 'rain', 'thunder', 'storm']
  const cloudyConditions = ['overcast', 'cloudy']

  useEffect(() => {
    const currentHour = new Date().getHours();
    setHour(currentHour);

    const conditionArray = condition?.split('-') || []
    const isRainy = rainConditions.some(cond => conditionArray.includes(cond))
    const isCloudy = cloudyConditions.some(cond => conditionArray.includes(cond) && !conditionArray.includes('partly'))

    if (isRainy) {
      hour <= 6 ?
        setWeatherBackground("url('/images/icons/weather_backgrounds/rain-night.jpg') no-repeat center / cover") :
        hour >= 18 ?
          setWeatherBackground("url('/images/icons/weather_backgrounds/rain-night.jpg') no-repeat center / cover") :
          setWeatherBackground("url('/images/icons/weather_backgrounds/rain-day.jpg') no-repeat center / cover")
    } else if (isCloudy) {
      hour <= 6 ?
        setWeatherBackground("url('/images/icons/weather_backgrounds/cloudy-night-2.jpg') no-repeat center / cover") :
        hour >= 18 ?
          setWeatherBackground("url('/images/icons/weather_backgrounds/cloudy-night-2.jpg') no-repeat center / cover") :
          setWeatherBackground("url('/images/icons/weather_backgrounds/cloudy-day.jpg') no-repeat center / cover")
    } else {
      hour <= 6 ?
        setWeatherBackground("url('/images/icons/weather_backgrounds/starry-night.png') no-repeat center / cover") :
        hour >= 18 ?
          setWeatherBackground("url('/images/icons/weather_backgrounds/clear-night.jpg') no-repeat center / cover") :
          setWeatherBackground("url('/images/icons/weather_backgrounds/sunny-day.jpg') no-repeat center / cover")
    }

  }, [hour, condition])

  return { weatherBackground }
}