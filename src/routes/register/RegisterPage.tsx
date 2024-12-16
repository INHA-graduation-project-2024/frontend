import React from "react";
import Webcam from "react-webcam";
import FaceAlignmentPopup from "@/components/face/FaceAlignmentPopup";
import InsertNamePopup from "@/components/popup/insertName/InsertNamePopup";

type Props = {};

export default function RegisterPage({}: Props) {
  return (
    <div className="h-screen">
      {/* <span className="flex justify-center">
        <InsertNamePopup />
      </span> */}
      <span className="flex justify-center">
        <FaceAlignmentPopup />
      </span>
      <Webcam
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}
