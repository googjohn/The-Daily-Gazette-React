
export default async function fetchHandler(req, res) {

  const {
    endpoint,
    category,
    lang,
    country,
    max,
    searchTerm
  } = req.query
  const origin = req.headers.origin;

  if (req.method === 'OPTIONS') {
    res.status(200).end();
  }


  const allowedOrigins = [
    'http://localhost:3000',
    'https://the-daily-gazette-react.vercel.app'
  ]

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Credentials', 'true')
  }

  let apikey = process.env.VITE_GNEWS_API_KEY_25
  if (searchTerm === 'nba') apikey = process.env.VITE_GNEWS_API_KEY_21;
  else if (searchTerm === 'mlb') apikey = process.env.VITE_GNEWS_API_KEY_22
  // else if (searchTerm === 'weather forecast' && country.toLowerCase() === 'ph') apikey = process.env.VITE_GNEWS_API_KEY_12
  // else if (searchTerm === 'weather forecast' && country.toLowerCase() === 'us') apikey = process.env.VITE_GNEWS_API_KEY_13
  // else if (searchTerm === 'weather forecast' && country.toLowerCase() === 'in') apikey = process.env.VITE_GNEWS_API_KEY_14
  else if (category === 'business' && country.toLowerCase() === 'ph') apikey = process.env.VITE_GNEWS_API_KEY_19
  else if (category === 'business' && country.toLowerCase() === 'us') apikey = process.env.VITE_GNEWS_API_KEY_20
  else if (category === 'world') apikey = process.env.VITE_GNEWS_API_KEY_12
  else if (category === 'general') apikey = process.env.VITE_GNEWS_API_KEY_13
  else if (category === 'nation') apikey = process.env.VITE_GNEWS_API_KEY_14
  else if (category === 'entertainment') apikey = process.env.VITE_GNEWS_API_KEY_15
  else if (category === 'science') apikey = process.env.VITE_GNEWS_API_KEY_16
  else if (category === 'technology') apikey = process.env.VITE_GNEWS_API_KEY_17
  else if (category === 'sports') apikey = process.env.VITE_GNEWS_API_KEY_18
  else apikey = process.env.VITE_WORLDNEWS_API_KEY

  const gnewsUrl = searchTerm ?
    (searchTerm === 'weather' ?
      `https://api.worldnewsapi.com/search-news?text=${searchTerm}&language=${lang}&source-country=${country}&number=${max}&categories=environment&api-key=${apikey}` :
      `https://gnews.io/api/v4/search?q=${searchTerm}&lang=${lang}&country=${country}&apikey=${apikey}`) :
    `https://gnews.io/api/v4/${endpoint}?category=${category}&lang=${lang}&country=${country}&max=${max}&apikey=${apikey}`

  console.log('[Gnewsurl]', gnewsUrl)
  try {
    const response = await fetch(gnewsUrl)
    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'Fetch error' })
    }

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message })
  }
}