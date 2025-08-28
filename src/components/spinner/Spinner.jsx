import spinner from '/images/spinner.png'

export default function Spinner() {
  return (
    <div id="loader-container">
      <div className="loader"></div>
      <img src={spinner} alt="spinner" />
    </div>
  )
}