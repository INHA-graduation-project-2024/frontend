import { atom } from "recoil";

export interface IUserTypes {
  name: string;
}

export const userState = atom<IUserTypes>({
  key: "userState",
  default: {
    name: "", //default는 이름 빈 문자열임
  },
});
