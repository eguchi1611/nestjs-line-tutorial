"use client";

import { createTheme } from "@mui/material";
import { Noto_Sans_JP } from "next/font/google";

const noto_sans_jp = Noto_Sans_JP({
  subsets: ["latin"],
});

const theme = createTheme({
  typography: {
    fontFamily: noto_sans_jp.style.fontFamily,
  },
  palette: {
    primary: {
      main: "#0d9488",
    },
  },
  shape: {
    borderRadius: 2,
  },
  components: {
    MuiPaper: {
      defaultProps: {
        variant: "outlined",
      },
    },
  },
});

export { theme };
