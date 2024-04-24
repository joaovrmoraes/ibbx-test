import styled from 'styled-components';
import { ButtonProps } from './index';
import { defaultTheme } from '../../styles/theme/default'

const buttonStyles = {
  primary: {
    backgroundColor: defaultTheme['orange-500'],
    color: defaultTheme['gray-100'],
    borderColor: 'transparent',
  },
  secondary: {
    backgroundColor: 'transparent',
    color: defaultTheme['orange-500'],
    borderColor: defaultTheme['orange-500'],
  },
};

export const StyledButton = styled.button<ButtonProps>`
  background-color: ${props => buttonStyles[props.variant || 'primary'].backgroundColor};
  color: ${props => buttonStyles[props.variant || 'primary'].color};
  padding: 0.5rem;
  border: ${props => buttonStyles[props.variant || 'primary'].borderColor} solid 1px;
  border-radius: 0.25rem;
  font-weight: 400;
  outline: none;
  box-shadow: none;

  &:hover {
    opacity: 90%;
    cursor: pointer;
    box-shadow: none;
  }

  &:disabled {
    opacity: 50%;
    cursor: not-allowed;
  }

`;