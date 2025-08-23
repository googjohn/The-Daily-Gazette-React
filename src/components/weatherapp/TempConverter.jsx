export default function tempConverter(temp, baseUnit, resultUnit) {
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