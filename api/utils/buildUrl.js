export function buildUrl(baseUrl, options) {
  const url = new URL(baseUrl)
  const { source } = options

  const SOURCES = {
    worldnews: {
      map: {
        max: 'number',
        country: 'source-country',
        category: 'categories',
        language: 'language',
        searchTerm: 'text',
        apikey: 'api-key'
      }
    },
    gnews: {
      map: {
        max: 'max',
        country: 'country',
        category: (o) => o.hasEndpoint ? 'category' : null,
        language: 'lang',
        searchTerm: 'q',
        apikey: 'apikey'
      }
    },
    newsdataio: {
      map: {
        max: 'size',
        country: 'country',
        category: 'category',
        language: 'language',
        searchTerm: 'q',
        apikey: 'apikey'
      }
    }
  }

  const sourceMap = SOURCES[source].map

  for (const key in sourceMap) {
    const optionValue = options[key];

    if (!optionValue || optionValue === undefined || optionValue === null || optionValue === '') continue

    const param = typeof sourceMap[key] === 'function'
      ? sourceMap[key](options)
      : sourceMap[key]

    if (param) {
      url.searchParams.set(param, optionValue)
    }
  }

  return url
}