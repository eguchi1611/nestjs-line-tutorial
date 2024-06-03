"use client";

import { useLiff } from "@/features/liff/use-liff";
import { useEffect, useState } from "react";

export function LiffStatus() {
  const { liff } = useLiff();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (liff) {
      liff.getProfile().then((profile) => {
        setProfile(profile);
      });
    }
  }, [liff]);

  return (
    <div>
      <pre>{JSON.stringify({ liff, profile }, null, 2)}</pre>
    </div>
  );
}
