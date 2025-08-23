import { useState, useRef, useEffect, useCallback } from "react";

export function useFetchForAll(URL) {
  const [data, setData] = useState({});
  const abortController = useRef(null)

  const fetchData = useCallback(async () => {
    if (abortController.current) {
      abortController.current.abort()
    }

    abortController.current = new AbortController();
    const signal = abortController.current.signal;

    try {
      const response = await fetch(URL, { signal })
      if (!response.ok) {
        const fetchError = new Error('Fetch failed');
        fetchError.statusCode = response.status;
        throw fetchError;
      }
      const result = await response.json();
      if (result) {
        setData(result)
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Standard abort cleanup behavior')
      } else {
        console.error(`HTTP error: status ${error.statusCode}`)
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

  return { data }
}