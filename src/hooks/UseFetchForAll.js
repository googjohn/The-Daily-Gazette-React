import { useState, useEffect, useMemo } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!url) {
      return;
    }

    setLoading(true)
    setError(null)
    setData(null)

    // create controller for safe aborting of fetch request
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal: controller.signal })
        if (!response.ok) {
          console.log(`Request from ${response.url} received a response is not ok. Creating a new error to throw.`)
          const newError = new Error(`HTTP request failed. Response status: ${response.status}`)
          newError.status = response.status
          throw newError
        }

        const result = await response.json();

        if (!result.error) {
          setData(result)
        } else {
          setError(result)
        }

      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Previous fetch request aborted. This is a standard abort behavior.')
          return;
        }
        console.error(`Fetch failed. Error status: ${error.status}`, error)
        setError(error)
      } finally {
        console.log('Fetch process complete. Setting loading state to false.')
        setLoading(false)
      }
    }

    fetchData();

    return () => {
      controller.abort();
    }

  }, [url])

  return { data, error, loading }
}

export const useFetchMulti = (country) => {
  const query = country ?
    `/api/news/allNews?country=${country}` : null
  const { data, error, loading } = useFetch(query)
  return { data, error, loading }
}

export async function fetchNormalWithRetry(url, retries = 3, buffer = 300) {
  console.log('fetching....')
  try {
    const response = await fetch(url)

    if (!response.ok) {
      const newError = new Error(`Fetch failed. HTTP error status: ${response.status}`)
      newError.status = response.status
      throw newError
    }

    return await response.json()

  } catch (error) {
    console.log(error)

    if (retries <= 0) throw error

    await new Promise(r => setTimeout(r, buffer))

    console.log('Attempting another fetch...')
    fetchNormalWithRetry(url, retries - 1, buffer * 2)
  }
}

// have to fetch from client/browser because if we fetch through
// serverless function of vercel it will use the server's
// location and not the user/client
// implement later with service worker to not expose key
export function useIplookup() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const controller = new AbortController()
    const signal = controller.signal

    setData(null)
    setError(null)
    setLoading(true)

    const fetchdata = async () => {
      try {
        const baseUrl = import.meta.env.VITE_IPINFO_BASE_URL
        const apikey = import.meta.env.VITE_IPINFO_API_KEY
        const url = `${baseUrl}?token=${apikey}`

        const response = await fetch(url, { signal })

        if (!response.ok) {
          const newError = new Error(`HTTP request failed. Response status: ${response.status}`)
          newError.status = response.status
          throw newError
        }

        const result = await response.json()
        const { city, region, country, loc } = result
        const latitude = loc.split(',')[0]
        const longitude = loc.split(',')[1]

        setData({
          'ok': true,
          'error': null,
          'data': {
            city,
            region,
            country,
            latitude,
            longitude
          }
        })

      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Previous fetch request aborted. This is a standard abort behavior.')
          return;
        }
        console.error(`Fetch failed. Error status: ${error.status}`, error)
        setError(error)

      } finally {
        setLoading(false)
      }
    }

    fetchdata()

    return () => {
      controller.abort()
    }
  }, [])

  return {
    data,
    error,
    loading
  }
}