"use client";

import { PropsWithChildren } from "react";
import { RecoilRoot } from "recoil";

export function RecoilProvider({ children }: PropsWithChildren) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
