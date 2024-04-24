import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledNavLink = styled(Link)`
    color: ${props => props.theme['gray-100']};
    font-weight: 500;
    font-size: 0.9rem;
    text-decoration: none;
    outline: none !important;
    
    &:focus,
    &:active,
    &:visited,
    &:link {
        outline: none !important;
        box-shadow: none !important;
    }

    &[data-current="true"] {
        color: ${props => props.theme['orange-500']};
        font-weight: bold;
    }
`