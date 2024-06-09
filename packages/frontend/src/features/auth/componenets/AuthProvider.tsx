"use client";

import { accessTokenAtom } from "@/atoms/accessTokenAtom";
import { authApi, instance } from "@/lib/api";
import { PropsWithChildren, useEffect } from "react";
import { useRecoilState } from "recoil";

export function AuthProvider({ children }: PropsWithChildren) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);

  useEffect(() => {
    if (!accessToken) {
      (async () => {
        const res = await authApi.authControllerLogin({
          accessToken: "accessToken",
        });
        setAccessToken(res.data.accessToken);
      })();
    }
  }, [accessToken, setAccessToken]);

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
