import { ReactNode } from "react";
import { Container } from "./style";

interface ListContainerProps {
  children: ReactNode;
}

export function ListContainer({ children }: ListContainerProps) {
  return <Container>{children}</Container>;
}
