"use client";

import { accessTokenAtom } from "@/atoms/accessTokenAtom";
import { authApi, instance } from "@/lib/api";
import { PropsWithChildren, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useLiff } from "../../../../features/liff/useLiff";

export function AuthProvider({ children }: PropsWithChildren) {
  const [authUser, userAuthUser] = useRecoilState(accessTokenAtom);
  const { liff } = useLiff();

  useEffect(() => {
    if (!authUser && liff) {
      (async () => {
        const res = await authApi.authControllerLogin({
          accessToken: liff.getAccessToken() || "",
        });
        userAuthUser(res.data);
      })();
    }
  }, [authUser, userAuthUser, liff]);

  useEffect(() => {
    const requestInterceptors = instance.interceptors.request.use(
      async (request) => {
        request.headers.Authorization = `Bearer ${authUser?.accessToken}`;
        return request;
      },
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptors);
    };
  }, [authUser]);

  return children;
}
