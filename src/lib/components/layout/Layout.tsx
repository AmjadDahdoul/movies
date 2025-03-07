import { Container } from "@mui/material";
import { ReactNode } from "react";
import { Navbar } from "../navbar/Navbar";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export const Layout = ({ children, title = "Tranquility" }: LayoutProps) => {
  return (
    <Container
      component='main'
      maxWidth='lg'
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar title={title} />
      {children}
    </Container>
  );
};
