import Webcam from "react-webcam";
import FaceAlignmentPopup from "@/components/face/FaceAlignmentPopup";
import InsertNamePopup from "@/components/popup/insertName/InsertNamePopup";
import { useCallback, useRef, useState } from "react";
import recognitionAPI from "@/api/recognitionAPI";

const service = new recognitionAPI(import.meta.env.VITE_BASE_URI);

export default function RegisterPage() {
  const webcamRef = useRef(null);
  const [name, setName] = useState<string>("");
  const [validPopup, setValidPopup] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null); // 캡처한 이미지 저장

  const generateFileName = (name: string): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // 2자리 월
    const day = String(now.getDate()).padStart(2, "0"); // 2자리 일
    const hours = String(now.getHours()).padStart(2, "0"); // 2자리 시간
    const minutes = String(now.getMinutes()).padStart(2, "0"); // 2자리 분
    const seconds = String(now.getSeconds()).padStart(2, "0"); // 2자리 초

    //형식 : name_YYYYMMDD_HHMMSS.jpeg
    return `${name}_${year}${month}${day}_${hours}${minutes}${seconds}.jpeg`;
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    // console.log(imageSrc);
    if (!imageSrc) {
      console.error("이미지 캡쳐 실패!");
      alert("다시 시도해 주세요.");
    }

    setCapturedImage(imageSrc); // 캡처한 이미지 저장
    setValidPopup(true); // 모달 활성화
  }, [webcamRef]);

  const submitRegistration = useCallback(async () => {
    if (!capturedImage || !name) {
      alert("이미지와 이름을 확인해 주세요.");
      return;
    }
    const base64Data = capturedImage.split(",")[1];
    const byteCharacters = atob(base64Data);
    const byteNumbers = Array.from(byteCharacters).map((char) =>
      char.charCodeAt(0)
    );
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/jpeg" });

    const fileName = generateFileName(name);

    const formData = new FormData();
    formData.append("file", blob, fileName);
    formData.append("name", name);

    try {
      const response = await service.join(formData);
      alert(`${response.message}`);
      setValidPopup(false); // 모달 비활성화
      setName(""); // 이름 초기화
    } catch (error) {
      console.error("얼굴 등록 실패:", error);
      alert("얼굴 등록에 실패했습니다.\n다시 시도해 주세요.");
    }
  }, [capturedImage, name]);

  return (
    <div className="h-screen">
      {validPopup && (
        <span className="flex justify-center">
          <InsertNamePopup
            setValidPopup={setValidPopup}
            name={name}
            setName={setName}
            // setValidPopup={setValidPopup}
            onSubmit={submitRegistration}
          />
        </span>
      )}
      <span className="flex justify-center w-[100%]">
        <FaceAlignmentPopup />
        <button
          onClick={capture}
          className="bg-[#006FFD] fixed bottom-5 z-[49] py-2 px-5 text-white rounded-[12px] w-[21rem]"
        >
          촬영하기
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
