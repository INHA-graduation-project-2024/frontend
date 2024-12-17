import { SlArrowLeft } from "react-icons/sl";
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function Topbar({}: Props) {
  const navigate = useNavigate();
  return (
    <div className="z-50 mx-auto w-[100%] h-12 bg-slate-50 max-w-[412px] fixed top-0 left-0 right-0 py-2 px-3 flex items-center justify-between">
      <span onClick={() => navigate(-1)}>
        <SlArrowLeft
          className="stroke-2 cursor-pointer"
          size={20}
          color="006FFD"
        />
      </span>
      <p>Demo User</p>

      <span onClick={() => navigate("/")}>
        <BsPersonCircle size={25} color="B3DAFF" />
      </span>
      {/* </span> */}
    </div>
  );
}
