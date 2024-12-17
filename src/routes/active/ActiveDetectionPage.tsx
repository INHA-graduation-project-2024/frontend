import FaceAlignmentPopup from "@/components/face/FaceAlignmentPopup";
import ReadWordPopup from "@/components/popup/readWord/ReadWordPopup";
import SuccessPopup from "@/components/popup/sucess/SuccessPopup";
import { useRef, useState } from "react";
import Webcam from "react-webcam";

export default function ActiveDetectionPage() {
  const [success, setSuccess] = useState<boolean>(false);
  const [wordPopup, setWordPopup] = useState<boolean>(false);
  const webcamRef = useRef(null);

  return (
    <div className="h-screen" onClick={() => setWordPopup(false)}>
      {success && (
        <span className="flex justify-center">
          <SuccessPopup content={`active liveness detection 완료!`} />
        </span>
      )}
      {wordPopup && (
        <span className="flex justify-center">
          <ReadWordPopup />
        </span>
      )}
      <span className="flex justify-center w-[100%]">
        <FaceAlignmentPopup />
        <button
          onClick={(e) => {
            e.stopPropagation();
            setWordPopup((prev) => !prev);
          }}
          className="bg-[#006FFD] fixed bottom-5 z-[49] py-2 px-5 text-white rounded-[12px] w-[21rem]"
        >
          active 검사하기
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
