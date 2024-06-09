import { accessTokenAtom } from "@/atoms/accessTokenAtom";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";

export function useAuth() {
  const accessToken = useRecoilValue(accessTokenAtom);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  return { isAuthenticated };
}
