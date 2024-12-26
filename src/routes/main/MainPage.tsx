import { useNavigate } from "react-router-dom";
import eye from "@/assets/eye.svg";
import camera from "@/assets/camera.svg";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="font-bold h-screen flex flex-col justify-center items-center">
      <p className="text-xl text-gray-600">안티 스푸핑 얼굴 인식 서비스</p>
      <p className="text-2xl">상황에 맞는 버튼을 눌러주세요</p>

      <div className="flex gap-4 py-8">
        <button
          className="bg-[#B3DAFF] rounded-[18px] flex flex-col items-center py-5 px-2 text-lg gap-[0.25rem]"
          onClick={() => navigate("/register")}
        >
          <img src={eye} />
          <span className="text-gray-500 text-sm">데모 이용이 처음이라면?</span>
          얼굴 등록하기
        </button>
        <button
          className="bg-[#B3DAFF] rounded-[18px] flex flex-col items-center py-5 px-2 text-lg gap-[0.25rem]"
          onClick={() => navigate("/passive")}
        >
          <img src={camera} />
          <span className="text-gray-500 text-sm">얼굴 등록을 완료했다면?</span>
          얼굴 인식하기
        </button>
      </div>
    </div>
  );
}
