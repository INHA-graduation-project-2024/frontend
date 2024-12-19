import FacePopup from "../../assets/face.svg";

export default function FaceAlignmentPopup() {
  return (
    <div className="z-[49] fixed top-[25%] scale-[1.4] transform">
      <img src={FacePopup} alt="Face Alignment Guide" />
    </div>
  );
}
