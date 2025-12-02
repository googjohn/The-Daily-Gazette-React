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
} from "../../src/data/gnewsOptions.js";
import { buildUrl } from "../../lib/utils/buildUrl.js";
import { allowCors } from "../../lib/utils/cors.js";
import { getGnewsApikey } from "../../lib/utils/getApikey.js";

export default allowCors(async function handler(req, res) {

  const { country } = req.query;

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

  const baseUrl = process.env.VITE_GNEWS_BASE_URL
  const baseUrl2 = process.env.VITE_GNEWS_BASE_URL_2

  const gnewsUrls = gnewsCategoryOptions.map(categoryOption => {
    let apikey = getGnewsApikey(categoryOption.category, categoryOption.searchTerm, categoryOption.country.trim() || country.toLowerCase(), true)
    const url = categoryOption.endpoint ? baseUrl2 : baseUrl
    const URL = buildUrl(url, {
      category: categoryOption.category,
      searchTerm: categoryOption.searchTerm,
      country: categoryOption.country.trim() || country.toLowerCase(),
      language: categoryOption.language,
      max: categoryOption.max,
      hasEndpoint: !!categoryOption.endpoint,
      source: categoryOption.source,
      apikey,
    })

    let forCategory;
    if (categoryOption.category === 'sports' && categoryOption.searchTerm) {
      forCategory = `sports-${categoryOption.searchTerm}`
    } else if (categoryOption.category === 'business') {
      forCategory = `business-${categoryOption.country || country.toLowerCase()}`
    } else {
      forCategory = categoryOption.category
    }

    return {
      forCategory: forCategory,
      url: URL.toString()
    }

  })
  console.log(gnewsUrls)

  try {
    const promises = gnewsUrls.map(async ({ forCategory, url }) => {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          const newError = new Error(`HTTP error status: ${response.status}`)
          newError.status = response.status
          throw newError
        }

        const result = await response.json();
        const { articles } = result
        return {
          forCategory,
          data: {
            'ok': true,
            'error': null,
            'data': articles
          }
        }
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
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error', details: err.message })
  }
})