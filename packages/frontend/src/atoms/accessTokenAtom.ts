import { atom } from "recoil";

interface AuthUser {
  accessToken: string;
  userId: number;
}

export const accessTokenAtom = atom<AuthUser | null>({
  key: "accessToken",
  default: null,
});
