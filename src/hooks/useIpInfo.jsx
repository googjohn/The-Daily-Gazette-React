export const generateOptions = (endpoint, category, countryCode) => {
  return {
    endpoint: endpoint,
    country: countryCode || 'us',
    category: category,
    language: 'en',
    max: 10,
  }
}

export function GetIpInfo() {
  let ipInfo = null
  const apiKey = import.meta.env.VITE_IPINFO_API_KEY
  const URL = `https://ipinfo.io/json?token=${apiKey}`

  fetch(URL)
    .then(response => {
      if (!response.ok) {
        const error = new Error();
        error.statusCode = response.status
        throw error
      }
      return response.json()
    })
    .then(result => {
      if (result) {
        ipInfo = result
      }
    })
    .catch(error => {
      if (error.name === 'AbortError') {
        console.log('Standard action for component unmount')
      } else {
        console.error('Failed to fetch', error)
      }
    })

  return ipInfo
}

export const USERIP = GetIpInfo()