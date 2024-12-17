import { atom } from "recoil";

export type StatusType = "none" | "passive" | "active" | "recognized";

export interface IRecognitionTypes {
  status: StatusType;
}

export const statusState = atom<IRecognitionTypes>({
  key: "statusState", // unique ID
  default: {
    status: "none", //default는 none으로 설정
  },
});
