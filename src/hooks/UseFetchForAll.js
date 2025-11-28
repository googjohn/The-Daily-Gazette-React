import { useState, useEffect } from "react";

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

    // cleanup for every re-render and unmount
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