export default function Aside({ asideTitle, asideContent }) {
  let asideStyle = ` w-full text-black overflow-auto ${asideTitle.toLowerCase().includes('sports') ? 'h-1/2' : 'h-full'}`

  return (
    <aside className={`aside-news ${asideStyle}`}>
      <div className="aside-title bg-(--light-navy) border-b h-12 pl-2.5 p-2.5 leading-none">
        <h2 className="text-white">{asideTitle}</h2>
      </div>
      <div className="aside-content h-auto">
        <ul>
          {asideContent && asideContent.map((article, index) => (
            <li
              key={article.id}
              className="flex items-center gap-2.5 shadow-(--bs-cards) [&:nth-child(even)]:bg-(--gray-10) [&:nth-child(odd)]:bg-(--gray-20)"
            >
              <span className="item-number basis-[45px] w-[45px] h-[60px] flex justify-center items-center text-white rounded-[50%] m-[5px] text-[clamp(1.2rem,_2vw,_1.5rem)] bg-(--navy)">{index + 1}</span>
              <a href={article.url} target="_blank" className="text-black basis-[calc(100%-55px)] text-[clamp(.7rem,_1.5vw,_.8rem)] hover:underline">{article.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}