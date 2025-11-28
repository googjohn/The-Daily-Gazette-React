import { allowCors } from "../utils/cors.js"
import { fetchWithRetry } from "../utils/fetchWithRetry.js"

export default allowCors(async function ipLookUp(req, res) {

  try {
    const ipinfoURL = `https://ipinfo.io/json?token=${process.env.IPINFO_API_KEY}`
    const response = await fetchWithRetry(ipinfoURL, 2, 300)

    const { city, region, loc, country } = response
    const latitude = loc.split(',')[0]
    const longitude = loc.split(',')[1]

    res.status(200).json({
      'ok': true,
      'data': {
        city,
        region,
        latitude,
        longitude,
        country
      },
      'error': null,
    })

  } catch (error) {
    console.error("HTTP error. Failed to fetch", error)
    console.log('Attempting next fetch...')

    // fallback if first attempt fails
    try {
      const ipgeoURL = `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IPGEO_API_KEY}`;
      const response = await fetchWithRetry(ipgeoURL, 2, 300)

      const {
        city,
        state_prov: region,
        latitude,
        longitude,
        country_code2: country
      } = response

      console.log('Second Fetch completed.')
      res.status(200).json({
        'ok': true,
        'data': {
          city,
          region,
          latitude,
          longitude,
          country
        },
        'error': null,
      })

    } catch (error) {
      console.log('Second attempt failed.', error)
      console.error(`Fetch failed. Error status: ${error.status || 'Unknown'}`, error)

      res.status(error.status || 500).json({
        'ok': false,
        'data': null,
        'error': {
          'message': error.message,
          'status': error.status || 500,
          'name': error.name,
          'stack': error?.stack
        }
      })
    }
  }
})

