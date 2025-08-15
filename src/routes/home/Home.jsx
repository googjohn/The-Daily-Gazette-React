import LocalNews from "./LocalNews";
import BusinessFinance from "./BusinessFinance";
import Entertainment from "../entertainment/Entertainment";
import WorldNews from "./WorldNews";
import ScienceTechnology from "./ScienceTechnology";
import Sports from "./Sports";

const ipGeoApiKey = import.meta.env.VITE_IPGEO_API_KEY;
const ipinfoApiKey = import.meta.env.VITE_IPINFO_API_KEY;
const IPGEO_URL = `https://api.ipgeolocation.io/ipgeo?apiKey=${ipGeoApiKey}`
const IPINFO_URL = `https://ipinfo.io/json?token=${ipinfoApiKey}`
const gnewsApiKey = import.meta.env.VITE_GNEWS_API_KEY_12
// const searchURL = `https://gnews.io/api/v4/${endpoint}?category=${category}&lang=${language}&country=${country || ipGeoData?.country_code2}&max=${max}&apikey=${apiKey}`
export default function Home() {

  return (
    <main className="w-full mx-auto">
      <WorldNews />
      <LocalNews />
      <BusinessFinance />
      <Entertainment />
      <ScienceTechnology />
      <Sports />
    </main>
  )
}