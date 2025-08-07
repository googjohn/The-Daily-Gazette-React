export default function Card({ cardTitle, cardDescription, cardImageSrc, cardImageAlt, source, classNames }) {
  const baseStyle = `card relative h-full w-full rounded-lg text-black shadow-(--bs-cards) overflow-hidden`
  const cardContainerClassNames = `${baseStyle} ${classNames}`
  return (
    <div className={cardContainerClassNames}>
      <div className="card-image-container w-full h-full">
        <img src={cardImageSrc} alt={cardImageAlt} className="object-cover w-full h-full" />
      </div>
      <div className="card-content-container p-2.5 bg-[rgba(0,0,0,.5)] hover:bg-[rgba(0,0,0,.3)] focus:bg-transparent w-full h-full absolute top-0 text-gray-300 flex flex-col [&>div]:border-0 justify-end">
        <span className="news-source-badge absolute top-1.5 z-20 w-max px-2.5 py-[5px] cursor-pointer text-[clamp(10px,_1vw,_14px)] rounded-full bg-[rgba(0,0,0,.15)] blur-(--filter)">
          <a href={source?.url} target="_blank" className="text-white hover:underline">{source?.name}</a>
        </span>
        {cardTitle && (
          <div className="card-content-title w-full font-medium text-[clamp(16px,_2.5vw,_1.1rem)]">
            <h2 className="hover:underline cursor-pointer" title={cardTitle}>{cardTitle.length >= 100 ? cardTitle.slice(0, 100) + '...' : cardTitle}</h2>
          </div>
        )}
        {cardDescription && (
          <div className="card-content-description w-full min-h-auto text-[clamp(12px,_1.8vw,_.9rem)]">
            <p className="text-[rgba(255,255,255,.6)]">{cardDescription.length >= 100 ? cardDescription.slice(0, 100) + '...' : cardDescription}</p>
          </div>
        )}
      </div>
    </div>
  )
}
/* 
articles[] = {
  content, 
  description, 
  id, 
  image, 
  publishedAt, 
  source = {id, name, url}, 
  title, 
  url
} 
*/

/* 
headnews=world
trendnews=general
local=nation
business=business
entertainment=entertainment
health=health
science=science
technology=technology
sportnews=sports
*/

/* 
{
city,
country_code2,
ip,
latitude,
longitude,
zipcode,

}
*/