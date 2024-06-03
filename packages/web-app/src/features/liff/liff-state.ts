import { Liff } from "@line/liff";
import { atom } from "recoil";

export const liffState = atom<Liff | null>({
  key: "liff",
  default: null,
});
