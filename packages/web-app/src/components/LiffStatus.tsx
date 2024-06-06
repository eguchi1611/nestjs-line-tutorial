"use client";

import { Configuration, UsersApi } from "@/__generated";
import { useLiff } from "@/features/liff/use-liff";
import { useEffect, useState } from "react";

export function LiffStatus() {
  const { liff } = useLiff();
  const [token, setToken] = useState<string | null>(null);
  const [token2, setToken2] = useState<{} | null>(null);

  useEffect(() => {
    if (liff) {
      setToken(liff.getAccessToken());
      (async () => {
        const a = new UsersApi(
          new Configuration({
            accessToken: liff.getAccessToken() || "",
          }),
          "http://localhost:8000/v1",
        );
        const b = await a.findAll();
        setToken2(b.data);
        a.update(8, { comment: new Date().toLocaleString() });
      })();
    }
  }, [liff]);

  return (
    <div>
      <pre>{JSON.stringify({ liff, token, token2 }, null, 2)}</pre>
    </div>
  );
}
