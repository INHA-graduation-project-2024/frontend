import FaceAlignmentPopup from "@/components/face/FaceAlignmentPopup";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import SuccessPopup from "@/components/popup/sucess/SuccessPopup";
import recognitionAPI from "@/api/recognitionAPI";
import { useRecoilState } from "recoil";
import { statusState } from "@/atoms/statusState";
import { Navigate, useNavigate } from "react-router-dom";

const service = new recognitionAPI(import.meta.env.VITE_BASE_URI);

export default function PassiveDetectionPage() {
  const webcamRef = useRef(null);
  const [success, setSuccess] = useState<boolean>(false);

  const [status, setStatus] = useRecoilState(statusState);
  const navigate = useNavigate();

  useEffect(() => {
    if (status.status !== "none") {
      alert("passive를 진행할 차례가 아닙니다.");
      navigate(-1);
    }
  }, []);

  const generateFileName = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // 2자리 월
    const day = String(now.getDate()).padStart(2, "0"); // 2자리 일
    const hours = String(now.getHours()).padStart(2, "0"); // 2자리 시간
    const minutes = String(now.getMinutes()).padStart(2, "0"); // 2자리 분
    const seconds = String(now.getSeconds()).padStart(2, "0"); // 2자리 초

    //형식 : name_YYYYMMDD_HHMMSS.jpeg
    return `passive_${year}${month}${day}_${hours}${minutes}${seconds}.jpeg`;
  };

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    // console.log(imageSrc);
    if (!imageSrc) {
      console.error("이미지 캡쳐 실패!");
      alert("다시 시도해 주세요.");
    }

    const base64Data = imageSrc.split(",")[1];
    const byteCharacters = atob(base64Data);
    const byteNumbers = Array.from(byteCharacters).map((char) =>
      char.charCodeAt(0)
    );
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/jpeg" });

    const fileName = generateFileName();

    const formData = new FormData();
    formData.append("file", blob, fileName);

    try {
      const response = await service.passive(formData);

      if (response.status === 200) {
        //200이면
        console.log(response.data.result[0]);
        // response.data.result[0].prediction //"Real" or "Fake"

        if (response.data.result[0].prediction === "Real") {
          setSuccess(true);

          // 3초 후 팝업 닫기
          setTimeout(() => {
            setSuccess(false);
            setStatus({ status: "passive" });
            navigate("/active");
          }, 2000);
        } else if (response.data.result[0].prediction === "Fake") {
          setSuccess(false);
          alert(
            "passive liveness detection에 실패했습니다.\n다시 시도해 주세요."
          );
        }

        return;
      } else setSuccess(false);
    } catch (error) {
      console.error("passive liveness detection 실패:", error);
      setSuccess(false);
      alert("passive liveness detection에 실패했습니다.\n다시 시도해 주세요.");
    }
  }, [webcamRef]);

  return (
    <div className="h-screen">
      {success && (
        <span className="flex justify-center">
          <SuccessPopup content={`passive liveness detection 완료!`} />
        </span>
      )}
      <span className="flex justify-center w-[100%]">
        <FaceAlignmentPopup />
        <button
          onClick={capture}
          className="bg-[#006FFD] fixed bottom-5 z-[49] py-2 px-5 text-white rounded-[12px] w-[21rem]"
        >
          passive 검사하기
        </button>
      </span>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}
