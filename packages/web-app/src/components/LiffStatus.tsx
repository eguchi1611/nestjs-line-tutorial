"use client";

import { useLiff } from "@/features/liff/use-liff";
import { useEffect, useState } from "react";

export function LiffStatus() {
  const { liff } = useLiff();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (liff) {
      setToken(liff.getAccessToken());
    }
  }, [liff]);

  return (
    <div>
      <pre>{JSON.stringify({ liff, token }, null, 2)}</pre>
    </div>
  );
}
