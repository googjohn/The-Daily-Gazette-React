const WEATHER_CONDITION_ICONS = {
  'sunny': 'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg',
  'partly-sunny': 'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/D200PartlySunnyV2.svg',
  'mostly-sunny': 'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg',
  'cloudy': 'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/CloudyV3.svg',
  'partly-cloudy-day': 'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/D200PartlySunnyV2.svg',
  'partly-cloudy-night': 'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/PartlyCloudyNightV2.svg',
  'mostly-cloudy-day': 'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyCloudyDayV2.svg',
  'mostly-cloudy-night': 'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyCloudyNightV2.svg',
  'clear-day': 'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg',
  'clear-night': 'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ClearNightV3.svg',
  'rain': 'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/HeavyDrizzle.svg',
  'showers-day': 'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/RainShowersDayV2.svg',
  'showers-night': 'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/RainShowersNightV2.svg',
  'thunder-rain': 'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ModerateRainV2.svg',
  'thunder-showers-day': 'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/RainShowersDayV2.svg',
  'thunder-showers-night': 'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/RainShowersNightV2.svg',
  'snow': 'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/LightSnowV2.svg',
  'snow-showers-day': 'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/LightSnowShowersDay.svg',
  'snow-showers-night': 'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/LightSnowShowersNight.svg',
  'windy': 'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/WindyV2.svg'
}

export function handleConditionsIcon(iconName) {
  switch (iconName) {
    case 'sunny':
      return WEATHER_CONDITION_ICONS.sunny
    case 'partly-sunny':
      return WEATHER_CONDITION_ICONS["partly-sunny"]
    case 'mostly-sunny':
      return WEATHER_CONDITION_ICONS["mostly-sunny"]
    case 'cloudy':
      return WEATHER_CONDITION_ICONS.cloudy
    case 'partly-cloudy-day':
      return WEATHER_CONDITION_ICONS["partly-cloudy-day"]
    case 'partly-cloudy-night':
      return WEATHER_CONDITION_ICONS["partly-cloudy-night"]
    case 'clear-day':
      return WEATHER_CONDITION_ICONS["clear-day"]
    case 'clear-night':
      return WEATHER_CONDITION_ICONS["clear-night"]
    case 'rain':
      return WEATHER_CONDITION_ICONS.rain
    case 'showers-day':
      return WEATHER_CONDITION_ICONS["showers-day"]
    case 'showers-night':
      return WEATHER_CONDITION_ICONS["showers-night"]
    case 'thunder-rain':
      return WEATHER_CONDITION_ICONS["thunder-rain"]
    case 'thunder-showers-day':
      return WEATHER_CONDITION_ICONS["thunder-showers-day"]
    case 'thunder-showers-night':
      return WEATHER_CONDITION_ICONS["thunder-showers-night"]
    case 'snow':
      return WEATHER_CONDITION_ICONS.snow
    case 'snow-showers-day':
      return WEATHER_CONDITION_ICONS["snow-showers-day"]
    case 'snow-showers-night':
      return WEATHER_CONDITION_ICONS["snow-showers-night"]
    case 'windy':
      return WEATHER_CONDITION_ICONS.windy
    default:
      return WEATHER_CONDITION_ICONS["partly-sunny"]
  }
}
/* 
  needs to be added

  snow-showers-day
  snow-showers-night
  snow
  thunder-showers-day
  thunder-showers-night
  thunder-rain
  showers-day
  showers-night
  rain/light/drizzle/moderate
  clear-day >> <20% clouds
  clear-night >> <20% clouds
  partly-cloudy-day >> >20% clouds
  partly-cloudy-night >> >20% clouds
  cloudy >> 90% clouds
  mostly-sunny
  partly-sunny/partly-couldy
  sunny
*/
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
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/HeavyDrizzle.svg',
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ModerateRainV2.svg',
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/RainShowersDayV2.svg', //showers-day
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/D310LightRainShowersV2.svg', //mostly-sunny/light-showers-day
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/D210LightRainShowersV2.svg', // parlty-cloudy/showers
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/D240TstormsV2.svg', // thunder-rain
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/N240TstormsV2.svg',
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/PartlyCloudyNightV2.svg', // partly-cloudy-night/partly-cloudy
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyCloudyNightV2.svg', // 
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/RainShowersNightV2.svg', // showers-night
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/N310LightRainShowersV2.svg', // light-showers-night/more-moon
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/N210LightRainShowersV2.svg',// ligth-showers-night/more-clouds
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyCloudyDayV2.svg', // mosty-cloudy
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/CloudyV3.svg', // cloudy
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlySunnyDay.svg', // mostly-sunny
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/D200PartlySunnyV2.svg', // partly-sunny/partly-cloudy
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/SunnyDayV3.svg', // sunny
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/ClearNightV3.svg', //clear-night
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/MostlyClearNight.svg', //mostly-clear-night
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/WindyV2.svg', //windy
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/RainShowersDayV2.svg', //rain-showers
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/D210LightRainShowersV2.svg', //light-rain-showers
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/D311LightRainSnowShowersV2.svg', //light-rain-snow-showers
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/LightSnowShowersDay.svg', // light-snow-showers-day
    'https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/LightSnowV2.svg', // light-snow
  ]
}