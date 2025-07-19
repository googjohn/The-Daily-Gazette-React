export default function Section({ id, sectionTitle, customGrid, children }) {
  const sectionStyle = "min-h-screen h-full w-11/12 p-2.5 mx-auto mt-20 mb-5"
  const sectionContentStyle = 'grid grid-template';
  const allClass = `${sectionContentStyle} ${customGrid}`
  return (
    <section
      id={id}
      className={sectionStyle}
    >
      <div className="container m-auto">
        <div className="section-title">
          <h2>{sectionTitle}</h2>
        </div>
        <div className={customGrid && allClass}>
          {children}
        </div>
      </div>
    </section>
  )
}