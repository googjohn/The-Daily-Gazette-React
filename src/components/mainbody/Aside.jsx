import { Skeleton } from "@heroui/skeleton"
import clsx from "clsx"

export default function Aside({ asideTitle, asideContent }) {

  return (
    <aside className={clsx(
      'aside-news relative w-full text-black overflow-auto',
      asideTitle.toLowerCase().includes('sports') ? 'h-1/2' : 'h-full'
    )}>
      <div className="aside-title sticky top-0 bg-(--light-navy) border-b h-12 pl-2.5 p-2.5 flex items-center">
        <h2 className="text-white">{asideTitle}</h2>
      </div>
      <div className="aside-content h-auto">
        <ul>
          {/* create an aside skeleton component */}
          {!asideContent && (
            <>
              <div className="max-w-[500px] w-full flex items-center gap-3 shadow-(--bs-cards)">
                <div>
                  <Skeleton className="flex rounded-full w-[74px] h-[74px] m-[5px] bg-[var(--gray-30)]" />
                </div>
                <div className="w-full flex flex-col gap-2" >
                  <Skeleton className="h-3 w-10/12 rounded-lg bg-[var(--gray-30)]" />
                  <Skeleton className="h-3 w-10/12 rounded-lg bg-[var(--gray-30)]" />
                  <Skeleton className="h-3 w-8/12 rounded-lg bg-[var(--gray-30)]" />
                </div>
              </div>
              <div className="max-w-[500px] w-full flex items-center gap-3 shadow-(--bs-cards)">
                <div>
                  <Skeleton className="flex rounded-full w-[74px] h-[74px] m-[5px] bg-[var(--gray-30)]" />
                </div>
                <div className="w-full flex flex-col gap-2" >
                  <Skeleton className="h-3 w-10/12 rounded-lg bg-[var(--gray-30)]" />
                  <Skeleton className="h-3 w-10/12 rounded-lg bg-[var(--gray-30)]" />
                  <Skeleton className="h-3 w-8/12 rounded-lg bg-[var(--gray-30)]" />
                </div>
              </div>
              <div className="max-w-[500px] w-full flex items-center gap-3 shadow-(--bs-cards)">
                <div>
                  <Skeleton className="flex rounded-full w-[74px] h-[74px] m-[5px] bg-[var(--gray-30)]" />
                </div>
                <div className="w-full flex flex-col gap-2" >
                  <Skeleton className="h-3 w-10/12 rounded-lg bg-[var(--gray-30)]" />
                  <Skeleton className="h-3 w-10/12 rounded-lg bg-[var(--gray-30)]" />
                  <Skeleton className="h-3 w-8/12 rounded-lg bg-[var(--gray-30)]" />
                </div>
              </div>
              <div className="max-w-[500px] w-full flex items-center gap-3 shadow-(--bs-cards)">
                <div>
                  <Skeleton className="flex rounded-full w-[74px] h-[74px] m-[5px] bg-[var(--gray-30)]" />
                </div>
                <div className="w-full flex flex-col gap-2" >
                  <Skeleton className="h-3 w-10/12 rounded-lg bg-[var(--gray-30)]" />
                  <Skeleton className="h-3 w-10/12 rounded-lg bg-[var(--gray-30)]" />
                  <Skeleton className="h-3 w-8/12 rounded-lg bg-[var(--gray-30)]" />
                </div>
              </div>
              <div className="max-w-[500px] w-full flex items-center gap-3 shadow-(--bs-cards)">
                <div>
                  <Skeleton className="flex rounded-full w-[74px] h-[74px] m-[5px] bg-[var(--gray-30)]" />
                </div>
                <div className="w-full flex flex-col gap-2" >
                  <Skeleton className="h-3 w-10/12 rounded-lg bg-[var(--gray-30)]" />
                  <Skeleton className="h-3 w-10/12 rounded-lg bg-[var(--gray-30)]" />
                  <Skeleton className="h-3 w-8/12 rounded-lg bg-[var(--gray-30)]" />
                </div>
              </div>
              <div className="max-w-[500px] w-full flex items-center gap-3 shadow-(--bs-cards)">
                <div>
                  <Skeleton className="flex rounded-full w-[74px] h-[74px] m-[5px] bg-[var(--gray-30)]" />
                </div>
                <div className="w-full flex flex-col gap-2" >
                  <Skeleton className="h-3 w-10/12 rounded-lg bg-[var(--gray-30)]" />
                  <Skeleton className="h-3 w-10/12 rounded-lg bg-[var(--gray-30)]" />
                  <Skeleton className="h-3 w-8/12 rounded-lg bg-[var(--gray-30)]" />
                </div>
              </div>

            </>
          )}
          {asideTitle.toLowerCase().includes('sports') ? asideContent && asideContent.data.map((article) => (
            <li
              key={article.id}
              className="flex items-center gap-2.5 shadow-(--bs-cards) [&:nth-child(even)]:bg-(--gray-10) [&:nth-child(odd)]:bg-(--gray-20)"
            >
              <span className="item-number basis-auto w-[90px] aspect-square text-white rounded-[50%] m-[5px] text-[clamp(1.2rem,_2vw,_1.5rem)] bg-(--navy) overflow-hidden"><img className="w-full h-full object-cover" src={article.image} alt={article.title} /></span>
              <a href={article.url} target="_blank" className="text-black basis-[calc(100%-55px)] text-[clamp(.7rem,_1.5vw,_.8rem)] hover:underline">{article.title}</a>

            </li>
          )) : asideContent && asideContent.data.map((article, index) => (
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