export default function Section({ id, sectionData }) {
  const sectionStyle = "h-full w-11/12 p-2.5 mx-auto mt-20 mb-5"
  const sectionContentStyle = 'grid grid-template';
  // const allClass = `${sectionContentStyle} ${customGrid}`
  return (
    <section id={id} className={sectionStyle}>

      {sectionData && sectionData.map((data, index) => (
        <div key={index} className="container mx-auto">
          {data.title && (
            <div className="section-title">
              <h2>{data.title}</h2>
            </div>
          )}
          {data.content && (
            <div className={`${data.customGrid} ${sectionContentStyle}`}>
              {data.content}
            </div>
          )}
        </div>
      ))}
    </section>
  )
}