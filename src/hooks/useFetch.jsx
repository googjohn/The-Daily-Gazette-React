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

// export default function useFetch(options) {
//   const [data, setData] = useState([]);
//   const [counter, setCounter] = useState(0);
//   const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState(null);

//   const abortControllerRef = useRef();
//   const hasFetched = useRef(false);
//   const indexRef = useRef(0);

//   const API_KEYS = Object.values(CONFIG);

//   const apiKey = API_KEYS[indexRef.current]

//   useEffect(() => {

//     const fetchData = async () => {
//       if (abortControllerRef.current) {
//         abortControllerRef.current.abort();
//       }

//       abortControllerRef.current = new AbortController();
//       const signal = abortControllerRef.current.signal

//       const {
//         endpoint,
//         category,
//         language,
//         country,
//         max
//       } = options

//       const API_URL = `https://gnews.io/api/v4/${endpoint}?category=${category}&lang=${language}&country=${country}&max=${max}&apikey=${apiKey}`

//       try {
//         const response = await fetch(API_URL, { signal });
//         if (!response.ok) {
//           const error = new Error(`HTTPS error. ${response.status}`);
//           error.statusCode = response.status;
//           error.name = error.statusCode === 401 ? 'Unauthorized' : error.name
//           throw error
//         }

//         const result = await response.json();
//         console.log('thisis result from useFetch hook', result)
//         setData(result)
//         setCounter(prev => prev + 1)
//       } catch (error) {
//         if (error.name === 'AbortError') {
//           console.log('Fetch aborted (expected behavior cleanup).')
//         } else {
//           console.error('Fetching failed.', error)
//           console.log(error.stack)
//           console.log(error.statusCode, error.name)
//           // setError(error)
//         }
//       } finally {
//         setLoading(false);
//       }
//     }

//     // if (hasFetched.current) return;
//     fetchData();
//     // hasFetched.current = true;


//     return () => {
//       if (abortControllerRef.current) {
//         // abortControllerRef.current.abort()
//       }

//     }
//   }, [options, apiKey])
//   return { data, counter, loading }
// }

export default function useFetch(options) {
  const [data, setData] = useState([]);
  const [ipGeoData, setIpGeoData] = useState(null);
  const ipController = useRef(null);
  const gnewsController = useRef(null);
  const index = useRef(0);
  const hasFetched = useRef(false);

  const ipGeoApiKey = import.meta.env.VITE_IPGEO_API_KEY;
  const IPGEO_URL = `https://api.ipgeolocation.io/ipgeo?apiKey=${ipGeoApiKey}`
  useEffect(() => {
    ipController.current = new AbortController();
    const signal = ipController.current.signal;

    fetch(IPGEO_URL, { signal })
      .then((response) => {
        if (!response.ok) {
          const fetchError = new Error('Request failed');
          fetchError.statusCode = response.status;
          throw fetchError
        }
        return response.json();
      })
      .then((result) => {
        if (result) {
          setIpGeoData(result)
        }
      })
      .catch((error) => {
        if (error.name === 'AbortError') return
        console.error('Fetch failed', error)
      })
    return () => {
      if (ipGeoData) {
        ipController.current.abort()
      }
    }
  }, [])

  const API_KEYS = Object.values(CONFIG)
  const apiKey = API_KEYS[index.current] // **
  const { endpoint, category, language, max } = options
  const URL = `https://gnews.io/api/v4/${endpoint}?category=${category}&lang=${language}&country=${ipGeoData?.country_code2 || 'ph'}&max=${max}&apikey=${apiKey}`

  const fetchData = useCallback(async () => {
    if (gnewsController.current) {
      gnewsController.current.abort();
    }

    if (ipController.current) {
      ipController.current.abort();
    }

    gnewsController.current = new AbortController()
    const signal = gnewsController.current.signal
    try {
      const response = await fetch(URL, { signal })
      if (!response.ok) {
        const error = new Error();
        error.statusCode = response.status
        error.message = response.status === 401 ?
          'Unauthorized' :
          response.status === 429 ?
            'Too many requests' :
            'Something went wrong.'
        throw error;
      }
      const result = await response.json();
      console.log(result)
      if (result) {
        setData(result)
      }
    } catch (error) {
      if (error.name === 'AbortError') return
      console.log(error)
    }
  }, [URL])

  useEffect(() => {

    fetchData();

    return () => {
      if (data.length > 0 && gnewsController.current) {
        gnewsController.current.abort()
      }
    }
  }, [URL])

  return data
}
