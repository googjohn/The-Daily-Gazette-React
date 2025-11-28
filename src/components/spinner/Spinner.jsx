import spinner from '/images/spinner.png'

export default function Spinner() {
  return (
    <div id="loader-container">
      <div className="loader"></div>
      <img src={spinner} alt="spinner" />
    </div>
  )
}

export function ScopedSpinner() {
  return (
    <div
      id='scoped-spinner'
      className='absolute w-full h-full top-0 right-0 bottom-0 left-0
      bg-[rgba(var(--black-rgb),.1)] z-50'
    >
      <div className='scoped-spinner'>
      </div>
      <img
        src={spinner}
        alt="spinner"
        className='absolute w-[50px] aspect-square top-0 right-0 
        bottom-0 left-0 m-auto'
      />
      <style>
        {`
        #scoped-spinner::after {
          content: '';
          position: absolute;
          width: 50px;
          height: 50px;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          margin: auto;
          border-radius: 50%;
          background-color: var(--aqua);
          box-shadow: var(--bs-lightBlue);
          z-index: -1;
        }
        .scoped-spinner {
          position: absolute;
          width: 100px;
          height: 40px;
          top: -10px;
          right: 0;
          bottom: 0;
          left: 0;
          margin: auto;
          border-radius: 100%;
          animation: .75s load infinite linear;
          z-index: 200;
        }
      `}
      </style>
    </div>
  )
}