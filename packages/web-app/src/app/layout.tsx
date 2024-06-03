import { PropsWithChildren } from "react";
import "./globals.css";
import { RecoilProvider } from "@/providers/RecoilProvider";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ja">
      <body>
        <RecoilProvider>{children}</RecoilProvider>
      </body>
    </html>
  );
}
