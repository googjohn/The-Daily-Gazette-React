import { buildUrl } from "../utils/buildUrl.js";
import { allowCors } from "../utils/cors.js";
import { fetchWithRetry } from "../utils/fetchWithRetry.js";
import { getGnewsApikey } from "../utils/getApikey.js";

export default allowCors(async function fetchNewsData(req, res) {

  const {
    max,
    country,
    category,
    language,
    endpoint,
    searchTerm,
  } = req.query

  const baseUrl = process.env.VITE_GNEWS_BASE_URL
  const baseUrl2 = process.env.VITE_GNEWS_BASE_URL_2
  const apikey = getGnewsApikey(category, searchTerm, country.toLowerCase())
  const source = 'gnews'

  const hasEndpoint = !!endpoint
  const url = endpoint ? baseUrl2 : baseUrl

  const URL = buildUrl(url, {
    category,
    searchTerm,
    country: country.toLowerCase(),
    language,
    max,
    hasEndpoint,
    apikey,
    source
  })

  const gnewsUrl = URL.toString()
  console.log(gnewsUrl)
  console.log(req.url)

  try {
    const response = await fetchWithRetry(gnewsUrl, 2, 300)

    const { articles } = response

    res.status(200).json({
      'ok': true,
      'error': null,
      'data': articles
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