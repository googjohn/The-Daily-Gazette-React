import { useState, useRef, useEffect, useCallback } from "react";

export function useFetchForAll(URL) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true);
  const abortController = useRef(null)


  const fetchData = useCallback(async () => {
    if (abortController.current) {
      abortController.current.abort()
    }

    abortController.current = new AbortController();
    const signal = abortController.current.signal;

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(URL, { signal })
      if (!response.ok) {
        const fetchError = new Error('Fetch failed');
        fetchError.statusCode = response.status;
        throw fetchError;
      }
      const result = await response.json();
      if (result) {
        setData(result)
        setLoading(false)
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Standard abort cleanup behavior')
      } else {
        console.error(`HTTP error: status ${error.statusCode}`)
        setError(error)
        setLoading(false)
      }
    } finally {
      if (data) {
        setLoading(false)
      }
    }
  }, [URL])

  useEffect(() => {
    fetchData();

    return () => {
      if (abortController.current) {
        abortController.current.abort()
      }
    }
  }, [fetchData])

  return { data, loading, error }
}