import check from "../../../assets/check.svg";

type Props = {
  content: string;
};

export default function SuccessPopup({ content }: Props) {
  return (
    <div className="bg-white z-[100] fixed top-[40%] flex flex-col rounded-2xl justify-center items-center py-10 px-6 gap-4">
      <img src={check} className="max-w-[40%]" />
      <p
        style={{
          color: "gray",
          textAlign: "center",
        }}
      >
        {content}
      </p>
    </div>
  );
}
