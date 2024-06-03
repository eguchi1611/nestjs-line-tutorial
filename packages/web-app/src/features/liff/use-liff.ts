import { useRecoilState } from "recoil";
import { liffState } from "./liff-state";
import { useEffect } from "react";

export function useLiff() {
  const [liff, setLiff] = useRecoilState(liffState);

  useEffect(() => {
    if (liff === null) {
      (async () => {
        try {
          const { liff } = await import("@line/liff");
          await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID || "" });
          console.log("LIFF init succeeded.");
          setLiff(liff);
        } catch (error) {
          console.error("LIFF init failed.");
          setLiff(null);
        }
      })();
    }
  }, [liff]);

  return { liff };
}
