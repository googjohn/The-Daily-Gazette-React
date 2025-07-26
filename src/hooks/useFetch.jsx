import { useState, useEffect, useCallback, useRef } from 'react'

const CONFIG = {
  API_KEY_1: import.meta.env.VITE_GNEWS_API_KEY_1,
  API_KEY_2: import.meta.env.VITE_GNEWS_API_KEY_2,
  API_KEY_3: import.meta.env.VITE_GNEWS_API_KEY_3,
  API_KEY_4: import.meta.env.VITE_GNEWS_API_KEY_4,
  API_KEY_5: import.meta.env.VITE_GNEWS_API_KEY_5,
  API_KEY_6: import.meta.env.VITE_GNEWS_API_KEY_6,
  API_KEY_7: import.meta.env.VITE_GNEWS_API_KEY_7,
  API_KEY_8: import.meta.env.VITE_GNEWS_API_KEY_8,
  API_KEY_9: import.meta.env.VITE_GNEWS_API_KEY_9,
  API_KEY_10: import.meta.env.VITE_GNEWS_API_KEY_10,
}
let configIndex = 0;
const API_KEYS = Object.values(CONFIG);


export default function useFetch(options, shouldFetch = true) {
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const abortControllerRef = useRef();

  if (error && (error.name === 'unauthorized' || error.statusCode === 401)) {
    configIndex++;
  }
  const apiKey = API_KEYS[configIndex]

  const fetchData = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal

    const {
      endpoint,
      category,
      language,
      country,
      max
    } = options

    const API_URL = `https://gnews.io/api/v4/${endpoint}?category=${category}&lang=${language}&country=${country}&max=${max}&apikey=${apiKey}`
    if (loading) (<div>Loading...</div>)
    if (error) (<div>Error Loading...</div>)

    try {

      const response = await fetch(API_URL, { signal });
      if (!response.ok) {
        throw new Error(`HTTPS error. ${response.status}`, { statusCode: response.status })
      }

      const result = await response.json();
      setData(result)
      setCounter(prev => prev + 1)
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted (expected behavior cleanup).')
      } else {
        console.error('Fetching failed.', error)
        setError(error)
      }
    } finally {
      setLoading(false);
    }
  }, [options, apiKey])
  useEffect(() => {

    if (shouldFetch) {
      fetchData();
      console.log(counter)
    }
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [options, fetchData, shouldFetch])
  return [data, fetchData, counter]
}