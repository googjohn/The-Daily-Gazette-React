export default function Salutation({ dateToday, timer, formatter }) {
  return (
    <div id="salutation-date" className="mb-1.5 flex justify-between items-center w-full">
      <div id="salutation" className="text-black">
        <h1 className="text-[1.6rem] text-(--red)">Welcome to The Daily Gazette!</h1>
      </div>
      <div id="date-time" className="text-(--gray-50) flex gap-2.5">
        <span className="date-today">{dateToday}</span>
        <span className="time-now">{`${timer || formatter.format(new Date())}`}</span>
      </div>
    </div>
  )
}