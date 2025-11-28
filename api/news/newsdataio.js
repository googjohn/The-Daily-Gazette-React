import { buildUrl } from "../utils/buildUrl.js";
import { allowCors } from "../utils/cors.js";
import { fetchWithRetry } from "../utils/fetchWithRetry.js";

export default allowCors(async function fetchNewsdata(req, res) {

  const {
    max,
    country,
    language,
    category,
    searchTerm
  } = req.query

  const baseUrl = process.env.VITE_NEWSDATAIO_BASE_URL
  const apikey = category === 'science'
    ? process.env.VITE_NEWSDATAIO_API_KEY_1
    : category === 'techonology'
      ? process.env.VITE_NEWSDATAIO_API_KEY_2
      : category === 'entertainment'
        ? process.env.VITE_NEWSDATAIO_API_KEY_3
        : process.env.VITE_NEWSDATAIO_API_KEY_4
  const source = 'newsdataio'

  const url = buildUrl(baseUrl, {
    category,
    searchTerm,
    country,
    language,
    max,
    apikey,
    source
  })

  const newsdataUrl = url.toString()
  console.log(newsdataUrl)
  console.log(req.url)

  try {
    const response = await fetchWithRetry(newsdataUrl, 2, 300)
    const { results } = response

    res.status(200).json({
      'ok': true,
      'error': null,
      'data': results
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