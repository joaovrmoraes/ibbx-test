import { ReactNode, FormEvent } from "react";
import { FormContainer } from "./style";

interface FormProps {
  children: ReactNode;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void; // Adicione esta linha
}

export function Form({ children, onSubmit, ...props }: FormProps) {
  return (
    <FormContainer onSubmit={onSubmit} {...props}>
      {children}
    </FormContainer>
  );
}
