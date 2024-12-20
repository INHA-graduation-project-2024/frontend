import { activeState } from "@/atoms/activeState";
import { useRecoilState } from "recoil";

export default function ReadWordPopup() {
  const [active, setActive] = useRecoilState(activeState);

  const buttonText = active.status === false ? "녹화 시작" : "녹화 중단";

  return (
    <div className="bg-white z-[49] fixed top-[40%] flex flex-col rounded-2xl justify-center items-center py-10 px-6 gap-4">
      <p className="text-[#006FFD] text-6xl font-semibold">엄마</p>
      <p className="text-[gray] text-center text-xl">
        화면에 보이는 단어를
        <br /> 말해주세요.
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setActive((prevState) => ({
            ...prevState,
            status: !prevState.status,
          }));
        }}
        className="bg-[#006FFD] mt-1 text-white rounded-[16px] px-4 py-2 text-xl font-light"
      >
        {buttonText}
      </button>
    </div>
  );
}
