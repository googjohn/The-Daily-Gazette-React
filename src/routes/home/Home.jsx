import LocalNews from "./LocalNews";
import BusinessFinance from "./BusinessFinance";
import Entertainment from "../entertainment/Entertainment";
import WorldNews from "./WorldNews";
import ScienceTechnology from "./ScienceTechnology";
import Sports from "./Sports";

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