import { Container } from "@mui/material";
import { PropsWithChildren } from "react";

export function Layout({ children }: PropsWithChildren) {
  return <Container maxWidth={false}>{children}</Container>;
}
