import { accessTokenAtom } from "@/atoms/accessTokenAtom";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";

export function useAuth() {
  const authUser = useRecoilValue(accessTokenAtom);

  const isAuthenticated = useMemo(() => !!authUser?.accessToken, [authUser]);

  return { isAuthenticated, userId: authUser?.userId };
}
