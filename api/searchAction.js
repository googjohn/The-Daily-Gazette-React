export default async function fetchHandle(req, res) {
  const { country, searchTerm } = req.query;
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
    res.setHeaders('Access-Control-Allow-Origin', origin)
    res.setHeaders('Access-Control-Allow-Credentials', 'true')
  }

  const URL = `https://api.worldnewsapi.com/search-news?text=${searchTerm}&language=en&source-country=${country}&number=24&api-key=${process.env.VITE_WORLDNEWS_API_KEY}`

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error('Fetch failed')
    }

    const result = await response.json();
    const { news: articles } = result
    res.status(200).json(articles);
  } catch (err) {
    console.error('Fetch failed', err.message)
    res.status(500).json({ error: 'Server error', details: err.message })
  }

}