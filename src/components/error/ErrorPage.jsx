import { FaHome } from "react-icons/fa";
import { TbReload } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export default function ErrorPage({ error }) {
  const navigate = useNavigate();
  const goHome = () => navigate('/')
  const reload = () => window.location.reload()
  return (
    <div id="error"
      className="w-full h-screen flex flex-col justify-center items-center text-2xl">
      <p>Oops, something went wrong!</p>
      {error ?
        <p>{error.name}: {error.message}</p> :
        <p>The page is either under development or missing.</p>
      }
      <p className="flex gap-2.5 items-center">Reload
        <TbReload
          onClick={reload}
          className="cursor-pointer"
        />
      </p>
      <p className="flex gap-2.5 items-center">Go back
        <FaHome
          onClick={goHome}
          className="cursor-pointer"
        />
      </p>
    </div>
  )
}