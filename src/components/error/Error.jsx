import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/')
  return (
    <div id="error"
      className="w-full h-screen flex flex-col justify-center items-center text-2xl">
      <p>Oops, something went wrong!</p>
      <p className="flex gap-2.5 items-center">Go back
        <FaHome onClick={handleClick}
          className="cursor-pointer" /></p>
    </div>
  )
}