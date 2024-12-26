import welcome from "@/assets/welcome.svg";
import { userState } from "@/atoms/userState";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

export default function WelcomePage() {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.name === "") {
      alert("인증되지 않았습니다. 얼굴 인식을 먼저 진행해 주세요.");
      navigate("/");
    }
  }, []);

  return (
    <div className="h-screen">
      <span className="w-full flex flex-col items-center pt-[25vh]">
        <img src={welcome} />
        <p className="font-semibold text-4xl text-center pt-2">
          <span className="text-[#006FFD]">{user.name}</span>님<br /> 인증
          완료되었습니다!
        </p>
        <button
          className="m-1 bg-[#006FFD] fixed bottom-5 z-[49] py-2 px-5 text-white rounded-[12px] w-[21rem]"
          onClick={() => {
            setUser({ name: "" });
            navigate("/");
          }}
        >
          홈으로 돌아가기
        </button>
      </span>
    </div>
  );
}
