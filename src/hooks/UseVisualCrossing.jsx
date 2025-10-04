import { useFetchForAll } from "./UseFetchForAll";

export default function useVisualCrossing(latitude, longitude) {

  const URL = latitude && longitude
    ? `/api/visualCrossing?latitude=${latitude}&longitude=${longitude}`
    : null;

  const { data, error } = useFetchForAll(URL)

  return { data, error }
}