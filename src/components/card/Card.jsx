export default function Card({ cardTitle, cardDescription, cardImageSrc, cardImageAlt, classNames }) {
  const baseStyle = `card relative h-full w-full rounded-lg text-black shadow-(--bs-cards) overflow-hidden`
  const cardContainerClassNames = `${baseStyle} ${classNames}`
  return (
    <div className={cardContainerClassNames}>
      <div className="card-image-container w-full h-full">
        <img src={cardImageSrc} alt={cardImageAlt} className="object-cover w-full h-full" />
      </div>
      <div className="card-content-container p-2.5 bg-[rgba(0,0,0,.5)] hover:bg-[rgba(0,0,0,.3)] focus:bg-transparent w-full h-full absolute top-0 text-gray-300 flex flex-col [&>div]:border justify-end">
        <span className="news-source-badge absolute top-1.5 z-20 w-max px-2.5 py-[5px] cursor-pointer text-[clamp(10px,_1vw,_14px)] rounded-full bg-[rgba(0,0,0,.15)] blur-(--filter)">
          <a href={'source'} target="_blank" className="text-white">{'source'}</a>
        </span>
        <div className="card-content-title w-full text-[clamp(18px,_2.5vw,_1.2rem)]">
          <h2>{cardTitle}</h2>
        </div>
        {cardDescription && (
          <div className="card-content-description w-full min-h-2/4 text-[clamp(12px,_2vw,_1rem)]">
            <p>{cardDescription}</p>
          </div>
        )}
      </div>
    </div>
  )
}