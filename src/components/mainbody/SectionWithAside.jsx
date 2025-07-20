import Card from "../card/Card";
import Aside from "./Aside";

export default function SectionWithAside() {
  return (
    <section className="">
      <div className="grid grid-template">
        <Card />
      </div>
      <div>
        <aside>
          <Aside />
        </aside>
      </div>
    </section>
  )
}