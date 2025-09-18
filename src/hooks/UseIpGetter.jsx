import { useState, useEffect, useRef } from "react"

export default function useIpGetter() {
  const [ipdata, setIpdata] = useState(null);
  const [error, setError] = useState(null);
  const abortController = useRef(null);

  useEffect(() => {
    if (abortController.current) abortController.current = null;
    abortController.current = new AbortController();
    const signal = abortController.current.signal;

    const IPINFO_URL = `https://ipinfo.io/json?token=${import.meta.env.VITE_IPINFO_API_KEY}`;
    const IPGEO_URL = `https://api.ipgeolocation.io/ipgeo?apiKey=${import.meta.env.VITE_IPGEO_API_KEY}`;

    const fetchIpdata = async () => {
      const tryFetch = async (url) => {
        const response = await fetch(url, { signal })

        if (!response.ok) {
          const fetchError = new Error(`Fetch failed with status: ${response.status}`)
          fetchError.status = response.status;
          throw fetchError
        }

        return await response.json();
      }

      try {
        const result = await tryFetch(IPINFO_URL);
        const { city, region, loc } = result
        const latitude = loc?.split(',')[0]
        const longitude = loc?.split(',')[1]

        setIpdata({
          city,
          region,
          latitude,
          longitude
        })
      } catch (error) {
        if (error.name === 'AbortError') return;

        // fallback fetch if the first fetch fails
        try {
          const res = await tryFetch(IPGEO_URL);
          const { city, state_prov, latitude, longitude } = res

          setIpdata({
            city,
            region: state_prov,
            latitude,
            longitude
          })
        } catch (err) {
          if (err.name === 'AbortError') return;
          console.error(`Fetch failed: ${err}`)
          setError(err)
        }
      }
    }

    fetchIpdata();

    return () => {
      if (abortController.current) {
        abortController.current.abort()
      }
    }
  }, [])

  return { ipdata, error }
}