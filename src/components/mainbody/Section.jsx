import useClock from "../../hooks/useClock";
import Salutation from "../../routes/home/Salutation";
// export default function Section({ id, sectionData, asideData, salutationData }) {
//   const sectionStyle = "h-full w-11/12 p-2.5 mx-auto mt-20 mb-5"
//   const sectionContentStyle = 'grid grid-template';
//   // const allClass = `${sectionContentStyle} ${customGrid}`
//   return (
//     <section id={id} className={sectionStyle}>
//       {sectionData && sectionData.map((data, index) => (
//         <div key={index} className="container mx-auto">
//           {data.title && (
//             <div className="section-title">
//               <h2>{data.title}</h2>
//             </div>
//           )}
//           {data.content && (
//             <div className={`${data.customGrid} ${sectionContentStyle}`}>
//               {data.content}
//             </div>
//           )}
//         </div>
//       ))}
//     </section>
//   )
// }

export default function Section({ id, sectionData, asideData, salutation, weatherData }) {
  const sectionStyle = "h-full w-11/12 p-2.5 mx-auto mt-20 mb-5"
  const sectionContentStyle = 'grid grid-template';
  // const allClass = `${sectionContentStyle} ${customGrid}`
  const { dateToday, timer, formatter } = useClock();

  return (
    <section id={id} className={sectionStyle}>
      <div className="container mx-auto">
        {weatherData && (
          <div id="weather-data">
            weather data here
          </div>
        )
        }
        {id === 'world-news' &&
          salutation &&
          <Salutation
            dateToday={dateToday}
            timer={timer}
            formatter={formatter}
          />
        }
        {sectionData.map((data, index) => (
          <div key={index} className="section-content-container">
            {data.title && (
              <div className="section-title">
                <h2>{data.title}</h2>
              </div>
            )}
            {data.content && (
              <div className={`section-content ${sectionContentStyle} ${data.customGrid}`}>
                {data.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}