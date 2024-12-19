import { atom } from "recoil";

// export type ActiveStatusType = "strat" | "invalid";

export interface IactiveTypes {
  status: boolean;
}

export const activeState = atom<IactiveTypes>({
  key: "activeState",
  default: {
    status: false,
  },
});
