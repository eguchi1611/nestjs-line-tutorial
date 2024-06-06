"use client";

import { UsersApi } from "@/__generated";
import { useLiff } from "@/features/liff/use-liff";
import { useEffect, useState } from "react";

export function LiffStatus() {
  const { liff } = useLiff();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (liff) {
      setToken(liff.getAccessToken());
      (async () => {
        const a = new UsersApi();
        const b = await a.findAll();
        b.data[0].comment;
      })();
    }
  }, [liff]);

  return (
    <div>
      <pre>{JSON.stringify({ liff, token }, null, 2)}</pre>
    </div>
  );
}
