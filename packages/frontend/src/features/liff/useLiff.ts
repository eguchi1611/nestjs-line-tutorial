import { useRecoilValue } from "recoil";
import { liffState } from "./liff-state";

export function useLiff() {
  const liff = useRecoilValue(liffState);

  return { liff };
}
