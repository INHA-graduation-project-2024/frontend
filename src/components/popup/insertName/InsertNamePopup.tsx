type Props = {
  setName: React.Dispatch<React.SetStateAction<string>>; // setName 타입 정의
  name: string; // name 타입 정의
  setValidPopup: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => void; // 제출 함수
};

export default function InsertNamePopup({
  name,
  setName,
  onSubmit,
  setValidPopup,
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className="bg-white z-[100] fixed top-[40%] flex flex-col rounded-2xl justify-center py-10 px-6 gap-4">
      <p
        style={{
          color: "gray",
          textAlign: "center",
        }}
      >
        등록할 이름을 알려주세요.
      </p>
      <input
        value={name}
        onChange={handleChange}
        className="text-xs px-2 py-3 rounded-[12px] border border-[#80808082]"
        placeholder="ex. Gil Dong (한국어 불가능)"
      />
      <button
        className="bg-[#006FFD] py-2 px-5 text-white rounded-[12px] "
        onClick={onSubmit}
      >
        얼굴 등록하기
      </button>
      <button
        className="bg-[#6f6f6f] py-2 px-5 text-white rounded-[12px] "
        onClick={() => setValidPopup(false)}
      >
        창 닫기
      </button>
    </div>
  );
}
