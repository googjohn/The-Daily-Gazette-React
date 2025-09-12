export function handleConditionsIcon(currentCondition, currentTime) {
  switch (currentCondition) {
    case 'partly-cloudy-day':
      return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/PartlyCloudyDay.svg'
    case 'partly-cloudy-night':
      return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/PartlyCloudyNight.svg'
    case 'rain':
      return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/ModerateRain.svg'
    case 'clear-day':
      return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlySunnyDay.svg'
    case 'clear-night':
      return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlyClearNight.svg'
    case 'cloudy':
      if (currentTime <= 6) {
        return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlyCloudyNight.svg';
      } else if (currentTime <= 18) {
        return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlyCloudyDay.svg';
      } else if (currentTime <= 23) {
        return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/MostlyCloudyNight.svg';
      }
      break;
    default:
      return 'https://googjohn.github.io/hosted-assets/weather-icons/svg/PartlySunnyDay.svg'
  }
}

export function tempConverter(temp = 0, baseUnit, resultUnit) {
  const kelvinBase = 274.15;
  const toFahrenheitHandle = (temp) => Math.floor((temp * (1.8)) + 32); // base unit of fahrenheit
  const toCelciusHandle = (temp) => Math.floor((temp - 32) * (5 / 9)); // if base unit is celcius
  const toKelvinHandle = (temp) => Math.floor(toCelciusHandle(temp) + kelvinBase); // base unit of fahrenheit

  if (baseUnit === 'f' && resultUnit === 'c') {
    return toCelciusHandle(temp)
  } else if (baseUnit === 'f' && resultUnit === 'k') {
    return toKelvinHandle(temp)
  } else if (baseUnit === 'c' && resultUnit === 'f') {
    return toFahrenheitHandle(temp)
  } else if (baseUnit === 'c' && resultUnit === 'k') {
    return Math.floor(temp + kelvinBase)
  } else if (baseUnit === 'k' && resultUnit === 'c') {
    return Math.floor(temp - kelvinBase)
  } else if (baseUnit === 'k' && resultUnit === 'f') {
    return Math.floor(toFahrenheitHandle(temp - kelvinBase))
  } else {
    return temp
  }
}

export function ConditionsIcon(condition, time) {
  const conditions = [
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/Icons/taskbar_v10/Condition_Card/HeavyDrizzle.svg',
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ModerateRainV2.svg',
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/RainShowersDayV2.svg',
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/D310LightRainShowersV2.svg',
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyCloudyDayV2.svg',
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/D200PartlySunnyV2.svg',
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/D210LightRainShowersV2.svg',
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/D240TstormsV2.svg',
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/CloudyV3.svg',
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/PartlyCloudyNightV2.svg',
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg',
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyCloudyNightV2.svg',
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/N310LightRainShowersV2.svg',
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/RainShowersNightV2.svg',
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/N210LightRainShowersV2.svg'

  ]
}