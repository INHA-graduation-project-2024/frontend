import { useNavigate } from "react-router-dom";

type Props = {};

export default function MainPage({}: Props) {
  const navigate = useNavigate();

  return (
    <div className="font-bold h-screen flex flex-col justify-center items-center">
      <p>안티 스푸핑 얼굴 인식 서비스</p>
      <p>상황에 맞는 버튼을 눌러주세요</p>
      <button onClick={() => navigate("/register")}>
        데모 이용이 처음이라면? 얼굴 등록하기
      </button>
      <button onClick={() => navigate("/recognition")}>
        얼굴 등록을 완료했다면? 얼굴 인식하기
      </button>
    </div>
  );
}
