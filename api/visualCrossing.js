let cachedData = null;
let lastFetched = 0;

export default async function fetchHandle(req, res) {
  const now = Date.now();
  const { latitude, longitude, locationQuery } = req.query;
  const origin = req.headers.origin;

  if (req.method === 'OPTIONS') {
    res.status(200).end()
  }

  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://the-daily-gazette-react.vercel.app'
  ]

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Credentials', 'true')
  }

  if (cachedData && now - lastFetched < 60 * 60 * 1000) {
    return res.status(200).json(cachedData)
  }

  const apikey = process.env.VITE_VISUALCROSSING_API_KEY;

  const VISUALCROSSING_URL = locationQuery
    ? `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationQuery}?&key=${apikey}&iconSet=icons2&elements=%2Baqius`
    : latitude && longitude
      ? `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?&key=${apikey}&iconSet=icons2&elements=%2Baqius`
      : null;
  try {
    console.log(VISUALCROSSING_URL)
    const response = await fetch(VISUALCROSSING_URL)
    if (!response.ok) {
      throw new Error('Fetch failed.')
    }
    const result = await response.json();
    console.log('total time', (Date.now() - now) / 1000)

    cachedData = result;
    lastFetched = now

    console.log(cachedData)
    res.status(200).json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error', details: err.message })
  }
}