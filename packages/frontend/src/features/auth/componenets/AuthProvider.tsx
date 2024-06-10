"use client";

import { accessTokenAtom } from "@/atoms/accessTokenAtom";
import { authApi, instance } from "@/lib/api";
import { PropsWithChildren, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useLiff } from "../../../../features/liff/useLiff";

export function AuthProvider({ children }: PropsWithChildren) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  const { liff } = useLiff();

  useEffect(() => {
    if (!accessToken && liff) {
      (async () => {
        const res = await authApi.authControllerLogin({
          accessToken: liff.getAccessToken() || "",
        });
        setAccessToken(res.data.accessToken);
      })();
    }
  }, [accessToken, setAccessToken, liff]);

  useEffect(() => {
    const requestInterceptors = instance.interceptors.request.use(
      async (request) => {
        request.headers.Authorization = `Bearer ${accessToken}`;
        return request;
      },
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptors);
    };
  }, [accessToken]);

  return children;
}
