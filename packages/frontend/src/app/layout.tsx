import { PropsWithChildren } from "react";
import "./globals.css";
import { RecoilProvider } from "@/components/RecoilProvider";
import { AuthProvider } from "@/features/auth/componenets/AuthProvider";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ja">
      <body>
        <RecoilProvider>
          <AuthProvider>{children}</AuthProvider>
        </RecoilProvider>
      </body>
    </html>
  );
}
