import { Outlet } from "react-router-dom";
import { Header } from "../../components/header";
import { Container } from "./style";

export function AppLayout() {
  return (
    <>
      <Header />

      <Container>
        <Outlet />
      </Container>
    </>
  );
}
