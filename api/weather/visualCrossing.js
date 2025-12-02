import { allowCors } from "../../lib/utils/cors.js";
import { fetchWithRetry } from "../../lib/utils/fetchWithRetry.js";

export default allowCors(async function fetchHandle(req, res) {

  const { latitude, longitude, locationQuery } = req.query;

  const baseUrl = process.env.VITE_VISUALCROSSING_BASE_URL
  const apikey = process.env.VITE_VISUALCROSSING_API_KEY

  const VISUALCROSSING_URL = locationQuery
    ? `${baseUrl}/${locationQuery}?&key=${apikey}&iconSet=icons2&elements=%2Baqius`
    : `${baseUrl}/${latitude},${longitude}?&key=${apikey}&iconSet=icons2&elements=%2Baqius`

  try {

    const response = await fetchWithRetry(VISUALCROSSING_URL, 2, 300)

    res.status(200).json({
      'ok': true,
      'error': null,
      'data': response
    })

  } catch (error) {

    console.error(`Fetch failed. Error status: ${error.status || 'Unknown'}`, error)

    res.status(error.status || 500).json({
      'ok': false,
      'data': null,
      'error': {
        'message': error.message,
        'name': error.name,
        'status': error.status || 500,
        'stack': error?.stack,
      }
    })
  }
})