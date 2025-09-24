export function toKm(distance) {
  return Math.round((distance / 0.6213712) * 100) / 100;
}

export function toM(distance) {
  return toKm(distance) * 1000
}

export function updateWindspeedStatus(windspeed) {
  const windspeedStatus = [
    { speed: 2, status: 'Calm' },
    { speed: 5, status: 'Light Air' },
    { speed: 11, status: 'Light Breeze' },
    { speed: 19, status: 'Gentle Breeze' },
    { speed: 28, status: 'Moderate Breeze' },
    { speed: 38, status: 'Fresh Breeze' },
    { speed: 49, status: 'Strong Breeze' },
    { speed: 61, status: 'Neare/Moderate Gale' },
    { speed: 74, status: 'Gale/Fresh Gale' },
    { speed: 88, status: 'Strong/Severe Gale' },
    { speed: 102, status: 'Storm/Whole Gale' },
    { speed: 117, status: 'Violent Storm' },
  ]
  return toKm(windspeed) >= 118 ? 'Hurricane-Force' : windspeedStatus.filter(wind => windspeed < wind.speed)[0].status
}

export function updatePressureStatus(pressure) {
  if (pressure < 1000) {
    return "Low";
  } else if (pressure <= 1013) {
    return "Moderate";
  } else {
    return "High";
  }
}

export function updateHumidityStatus(humidity) {
  if (humidity <= 30) {
    return "Low";
  } else if (humidity <= 60) {
    return "Moderate";
  } else {
    return "High";
  }
}

export function updateVisibilityStatus(distance) {
  const visibilityStatus = [
    { range: 200, status: 'Dense Fog' },
    { range: 500, status: 'Thick Fog' },
    { range: 1000, status: 'Fog' },
    { range: 5000, status: 'Mist/Haze' },
    { range: 10000, status: 'Moderate' },
  ]
  return toM(distance) > 10000 ? 'Good' : visibilityStatus.filter(visibility => distance <= visibility.range)[0].status
}

export function updateCloudcoverStatus(cloudcover) {
  const cloudcoverStatus = [
    { value: 12.5, status: 'Sky Clear' },
    { value: 25, status: 'Few Clouds' },
    { value: 50, status: 'Scattered' },
    { value: 90, status: 'Broken' },
  ]
  return cloudcover > 90 ? 'Overcast' : cloudcoverStatus.filter(cloud => cloudcover <= cloud.value)[0].status
}

export function updateAirQualityIndex(aqi) {
  const airQualityIndex = [
    { value: 50, status: 'Good' },
    { value: 100, status: 'Moderate' },
    { value: 150, status: 'Unhealthy for Sensetive Groups' },
    { value: 200, status: 'Unhealthy' },
    { value: 300, status: 'Very Unhealthy' },
  ]
  return aqi > 300 ? 'Hazardous' : airQualityIndex.filter(air => aqi <= air.value)[0].status
}

export function updateUVIndex(uvindex) {
  const uvIndex = [
    { value: 2, status: 'Low risk' },
    { value: 5, status: 'Moderate risk' },
    { value: 7, status: 'High risk' },
    { value: 10, status: 'Very High risk' },
  ]
  return uvindex > 10 ? 'Extreme risk' : uvIndex.filter(uv => uvindex <= uv.value)[0].status
}

export function updateWindDirection(winddir) {
  const winddirStatus = [
    { value: 22.5, status: 'North (N)' },
    { value: 67.5, status: 'Northeast (NE)' },
    { value: 112.5, status: 'East (E)' },
    { value: 157.5, status: 'Southeast (SE)' },
    { value: 202.5, status: 'South (S)' },
    { value: 247.5, status: 'Southwest (SW)' },
    { value: 292.5, status: 'West (W)' },
    { value: 337.5, status: 'Northwest (NW)' },
    { value: 360, status: 'North (N)' },
  ]

  return winddirStatus.filter(wind => winddir <= wind.value)[0].status
}