import { useState, useEffect } from "react";

// needs to be updated for condition rain at day and night
export default function useUpdateWeatherBackground() {
  const [hour, setHour] = useState(new Date().getHours());
  const [weatherBackground, setWeatherBackground] = useState("url('/images/icons/weather_backgrounds/bright-sun-in-blue-sky.jpg') no-repeat center / cover");

  useEffect(() => {
    const currentHour = new Date().getHours()
    setHour(currentHour);
    hour <= 6 ?
      setWeatherBackground("url('/images/icons/weather_backgrounds/starry-night-sky.png') no-repeat center / cover") :
      hour >= 18 ?
        setWeatherBackground("url('/images/icons/weather_backgrounds/sky-clear-night.jpg') no-repeat center / cover") :
        setWeatherBackground("url('/images/icons/weather_backgrounds/bright-sun-in-blue-sky.jpg') no-repeat center / cover")

  }, [hour])

  return { weatherBackground }
}