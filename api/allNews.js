import {
  mlbOptions,
  nbaOptions,
  localOptions,
  sportsOptions,
  scienceOptions,
  headnewsOptions,
  businessOptions,
  trendnewsOptions,
  technologyOptions,
  moreBusinessOptions,
  entertainmentOptions,
} from "../src/data/gnewsOptions.js";


export default async function handler(req, res) {

  const { country } = req.query;
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

  const gnewsCategoryOptions = [
    headnewsOptions,
    trendnewsOptions,
    localOptions,
    businessOptions,
    moreBusinessOptions,
    entertainmentOptions,
    scienceOptions,
    technologyOptions,
    sportsOptions,
    nbaOptions,
    mlbOptions,
  ]

  const gnewsUrls = gnewsCategoryOptions.map(categoryOption => {
    let apikey = process.env.VITE_GNEWS_API_KEY_25;
    if (categoryOption.category === 'sports' && categoryOption?.searchTerm === 'nba') apikey = process.env.VITE_GNEWS_API_KEY_21;
    else if (categoryOption.category === 'sports' && categoryOption?.searchTerm === 'mlb') apikey = process.env.VITE_GNEWS_API_KEY_22;
    else if (categoryOption.category === 'sports' && !categoryOption?.searchTerm) apikey = process.env.VITE_GNEWS_API_KEY_20;
    else if (categoryOption.category === 'business' && categoryOption?.country?.toLowerCase() === 'us') apikey = process.env.VITE_GNEWS_API_KEY_18;
    else if (categoryOption.category === 'business' && !categoryOption?.country) apikey = process.env.VITE_GNEWS_API_KEY_19;
    else if (categoryOption.category === 'world') apikey = process.env.VITE_GNEWS_API_KEY_12
    else if (categoryOption.category === 'general') apikey = process.env.VITE_GNEWS_API_KEY_13
    else if (categoryOption.category === 'nation') apikey = process.env.VITE_GNEWS_API_KEY_14
    else if (categoryOption.category === 'entertainment') apikey = process.env.VITE_GNEWS_API_KEY_15
    else if (categoryOption.category === 'science') apikey = process.env.VITE_GNEWS_API_KEY_16
    else if (categoryOption.category === 'technology') apikey = process.env.VITE_GNEWS_API_KEY_17

    if (categoryOption.endpoint === 'search') {
      return { forCategory: `sports-${categoryOption?.searchTerm}`, url: `https://gnews.io/api/v4/search?q=${categoryOption?.searchTerm}&lang=${categoryOption.language}&country=${categoryOption?.country || country}&apikey=${apikey}` }
    } else {
      if (categoryOption.category === 'business' && categoryOption?.country === 'us') {
        return { forCategory: `business-${categoryOption.country}`, url: `https://gnews.io/api/v4/${categoryOption.endpoint}?category=${categoryOption.category}&lang=${categoryOption.language}&country=${categoryOption?.country || 'us'}&max=${categoryOption.max}&apikey=${apikey}` }
      } else if (categoryOption.category === 'business' && !categoryOption.country) {
        return { forCategory: `business-${country}`, url: `https://gnews.io/api/v4/${categoryOption.endpoint}?category=${categoryOption.category}&lang=${categoryOption.language}&country=${categoryOption?.country || country}&max=${categoryOption.max}&apikey=${apikey}` }
      }
      return { forCategory: categoryOption.category, url: `https://gnews.io/api/v4/${categoryOption.endpoint}?category=${categoryOption.category}&lang=${categoryOption.language}&country=${categoryOption?.country || country}&max=${categoryOption.max}&apikey=${apikey}` }
    }
  })

  try {
    const promises = gnewsUrls.map(async ({ forCategory, url }) => {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Fetch failed')
        }
        const result = await response.json();
        return { forCategory, result }
      } catch (err) {
        return { forCategory, error: err.message || 'Fetch failed' }
      }
    })

    const results = await Promise.allSettled(promises)
    const data = results.map(result => {
      if (result.status === 'fulfilled') {
        return result.value
      } else {
        return { category: 'unknown', error: result.reason.message || 'Unknown error' }
      }
    })

    res.status(200).json(data);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error', details: error.message })
  }
}