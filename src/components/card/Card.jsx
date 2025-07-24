export default function Card({ cardTitle, cardDescription, imgSrc, imgAlt, customStyle }) {
  return (
    <div className="card h-full w-full flex flex-col [&>*]:basis-1/2 rounded-lg text-black shadow-(--bs-cards)">
      <div className="card-image-container">
        <img src={imgSrc} alt={imgAlt} />
      </div>
      <div className="card-content-container">
        <div className="card-content-title">
          <h2>{cardTitle}</h2>
        </div>
        <div className="card-content-description">
          <p>{cardDescription}</p>
        </div>
      </div>
    </div>
  )
}