import { useFetchForAll } from "./UseFetchForAll"
const IPINFO_API_KEY = import.meta.env.VITE_IPINFO_API_KEY

export default function useMultiFetch() {
  const ipdata = useFetchForAll(`https://ipinfo.io/json?token=${IPINFO_API_KEY}`)
  const { data, error, loading } = ipdata || {};

  // more logic here

  return { ipdata }
}