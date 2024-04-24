import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import { StyledButton } from "./style";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", children, ...props }, ref) => {
    return (
      <StyledButton ref={ref} variant={variant} {...props}>
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = "Button";
