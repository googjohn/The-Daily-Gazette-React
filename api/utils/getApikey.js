export function getGnewsApikey(category, searchTerm, country, isMulti = false) {
  const apikeyMap = {
    world: process.env.VITE_GNEWS_API_KEY_14,
    general: process.env.VITE_GNEWS_API_KEY_15,
    nation: process.env.VITE_GNEWS_API_KEY_16,
    entertainment: process.env.VITE_GNEWS_API_KEY_17,
    science: process.env.VITE_GNEWS_API_KEY_18,
    technology: process.env.VITE_GNEWS_API_KEY_19,
    sports: process.env.VITE_GNEWS_API_KEY_20,
    health: process.env.VITE_GNEWS_API_KEY_21,
    nba: process.env.VITE_GNEWS_API_KEY_22,
    mlb: process.env.VITE_GNEWS_API_KEY_10,
    business: {
      us: process.env.VITE_GNEWS_API_KEY_12,
      ph: process.env.VITE_GNEWS_API_KEY_13,
    },
  }

  const apikeyMap_2 = {
    world: process.env.VITE_GNEWS_API_KEY_1,
    general: process.env.VITE_GNEWS_API_KEY_2,
    nation: process.env.VITE_GNEWS_API_KEY_3,
    entertainment: process.env.VITE_GNEWS_API_KEY_4,
    science: process.env.VITE_GNEWS_API_KEY_5,
    technology: process.env.VITE_GNEWS_API_KEY_6,
    sports: process.env.VITE_GNEWS_API_KEY_7,
    health: process.env.VITE_GNEWS_API_KEY_8,
    nba: process.env.VITE_GNEWS_API_KEY_9,
    mlb: process.env.VITE_GNEWS_API_KEY_10,
    business: {
      us: process.env.VITE_GNEWS_API_KEY_12,
      ph: process.env.VITE_GNEWS_API_KEY_13,
    },
  }

  const keymap = isMulti ? apikeyMap_2 : apikeyMap
  let defaultApikey = process.env.VITE_GNEWS_API_KEY_25;

  if (searchTerm)
    return keymap[searchTerm] || defaultApikey

  if (category === 'business') {
    const bansa = country.toLowerCase()
    return keymap.business[bansa] || defaultApikey
  }


  return keymap[category] || defaultApikey
}