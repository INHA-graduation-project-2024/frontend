import React from "react";
import FacePopup from "../../assets/face.svg";

type Props = {};

export default function FaceAlignmentPopup({}: Props) {
  return (
    <div className="z-[49] fixed top-[15%]">
      <img src={FacePopup} alt="Face Alignment Guide" />
    </div>
  );
}
