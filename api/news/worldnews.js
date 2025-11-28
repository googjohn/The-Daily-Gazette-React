import { buildUrl } from "../utils/buildUrl.js";
import { allowCors } from "../utils/cors.js";
import { fetchWithRetry } from "../utils/fetchWithRetry.js";

export default allowCors(async function fetchNewsData(req, res) {

  const {
    max,
    category,
    language,
    country,
    searchTerm
  } = req.query

  const baseUrl = process.env.VITE_WORLDNEWS_BASE_URL
  const apikey = process.env.VITE_WORLDNEWS_API_KEY
  const source = 'worldnews'

  const url = buildUrl(baseUrl, {
    max,
    source,
    country,
    category,
    language,
    searchTerm,
    apikey
  })

  const worldnewsUrl = url.toString()
  console.log(worldnewsUrl)
  console.log(req.url)

  try {
    const response = await fetchWithRetry(worldnewsUrl, 2, 300)

    const { news } = response

    res.status(200).json({
      'ok': true,
      'error': null,
      'data': news,
    });

  } catch (error) {

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
})