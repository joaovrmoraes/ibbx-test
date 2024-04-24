import { ReactNode } from "react";
import { StyledTitle } from "./style";

export interface TitleProps {
  children: ReactNode;
}

export function Title({ children, ...props }: TitleProps) {
  return <StyledTitle {...props}>{children}</StyledTitle>;
}
