export default function Aside({ asideTitle }) {
  let asideStyle = `shadow-(--bs-cards) w-full text-black ${asideTitle.toLowerCase().includes('sports') ? 'h-1/2' : 'h-full'}`
  return (
    <aside className={`aside-news ${asideStyle}`}>
      <div className="aside-title bg-(--light-navy) border-b h-12 pl-2.5 p-2.5 leading-none">
        <h2 className="text-white">{asideTitle}</h2>
      </div>
      <div className="aside-content h-auto p-2.5">
        aside content here...
      </div>
    </aside>
  )
}