import Finance from "../finance/Finance";
import Entertainment from "../entertainment/Entertainment";
import Sports from "../sports/Sports";
import ScienceTechnology from "../scienceAndTechnology/ScienceAndTechnology";
import Local from "./local/Local";
import World from "./world/World";
import Spinner from "../../components/spinner/Spinner";

export default function Home() {

  return (
    <main className="w-full mx-auto">
      <World />
      <Local />
      <Finance />
      <Entertainment />
      <ScienceTechnology />
      <Sports />
    </main>
  )
}