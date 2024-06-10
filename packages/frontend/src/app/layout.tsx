import { RecoilProvider } from "@/components/RecoilProvider";
import { AuthProvider } from "@/features/auth/componenets/AuthProvider";
import { theme } from "@/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { PropsWithChildren } from "react";
import "./globals.css";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ja">
      <body>
        <RecoilProvider>
          <AuthProvider>
            <AppRouterCacheProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
              </ThemeProvider>
            </AppRouterCacheProvider>
          </AuthProvider>
        </RecoilProvider>
      </body>
    </html>
  );
}
