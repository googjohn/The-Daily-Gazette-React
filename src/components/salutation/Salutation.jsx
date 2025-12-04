export default function Salutation({ dateToday, timer, formatter }) {
  return (
    <div id="salutation-date" className="mb-1.5 flex justify-between items-center w-full">
      <div id="salutation" className="text-black hidden md:block">
        <h1 className="text-[clamp(1.3rem,2.5vw,1.6rem)] text-(--red) font-semibold">Welcome to The Daily Gazette!</h1>
      </div>
      <div id="date-time" className="text-(--gray-50) text-[clamp(1rem,1.5vw,1.15rem)] text-shadow-(--ts-whiteup-blackdown) flex gap-2.5">
        <span className="date-today">{dateToday}</span>
        <span className="time-now">{`${timer || formatter.format(new Date())}`}</span>
      </div>
    </div>
  )
}