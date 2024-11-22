import { atom } from "recoil";

export type StatusType = "none" | "passive" | "active" | "recognized";

export interface IRecognitionTypes {
  status: StatusType;
}

export const StatusState = atom<IRecognitionTypes>({
  key: "status",
  default: {
    status: "none",
  },
});
