import { Liff } from "@line/liff";
import { atom } from "recoil";

export const liffState = atom<Liff | null>({
  key: "liffState",
  default: null,
  effects: [
    ({ setSelf, trigger }) => {
      if (!global?.window) return;
      console.log(trigger);
      const init = async () => {
        try {
          const { liff } = await import("@line/liff");
          await liff.init({
            liffId: process.env.NEXT_PUBLIC_LIFF_ID || "",
            withLoginOnExternalBrowser: true,
          });
          console.log("LIFF init succeeded.");
          setSelf(liff);
        } catch (error) {
          console.error("LIFF init failed.", error);
          setSelf(null);
        }
      };
      if (trigger === "get") {
        init();
      }
    },
  ],
});
