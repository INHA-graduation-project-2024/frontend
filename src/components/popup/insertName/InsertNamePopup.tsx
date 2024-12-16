import React from "react";

type Props = {};

export default function InsertNamePopup({}: Props) {
  return (
    <div className="bg-white z-[100] fixed top-[40%] flex flex-col rounded-2xl justify-center py-10 px-6 gap-4">
      <p
        style={{
          color: "gray",
          textAlign: "center",
        }}
      >
        인식이 완료되었습니다.
      </p>
      <input
        className="p-2 rounded-[12px] border border-[#80808082]"
        placeholder="홍길동"
      />
      <button className="bg-[#006FFD] py-2 px-5 text-white rounded-[12px] ">
        이름 등록하기
      </button>
    </div>
  );
}
