import { useMemo } from "react";

export const useNewsdataUrlBuilder = (ipdata, options) => {
  const {
    max,
    source,
    country,
    category,
    language,
    endpoint,
    searchTerm,
  } = options

  const url = useMemo(() => {

    if (!ipdata?.data) return null;

    if (source === 'newsdataio') {
      return `/api/news/newsdataio?category=${category}&searchTerm=${searchTerm.trim()}&language=${language}&country=${country || ipdata.data.country}&max=${max}`
    }

    if (source === 'worldnews') {
      return `/api/news/worldnews?category=${category}&searchTerm=${searchTerm.trim()}&language=${language}&country=${country || ipdata.data.country}&max=${max}`
    }

    if (source === 'gnews' && !endpoint) {
      return `/api/news/gnewsio?category=${category}&searchTerm=${searchTerm.trim()}&language=${language}&country=${country || ipdata.data.country}&max=${max}`
    } else {
      return `/api/news/gnewsio?endpoint=${endpoint}&category=${category}&searchTerm=${searchTerm.trim()}&language=${language}&country=${country || ipdata.data.country}&max=${max}`
    }

  }, [ipdata])

  return url
}

export function useSportsUrlBuilder(category, sports, framesCache) {

  return useMemo(() => {
    const categoryMap = {
      GAMES: 'schedules',
      STANDINGS: 'standings',
      PLAYERS: 'players',
    }

    const key = `${sports}-${category}`
    const hasKey = framesCache[key]

    // save api call by providing null url for fetch to early exit
    // shallow caching
    let url = null
    if (!hasKey) {
      const selected = categoryMap[category]
      url = `/api/${sports}/${selected}`
    }

    return url
  }, [category, sports])
}