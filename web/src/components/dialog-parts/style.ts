import styled from "styled-components";

import * as Dialog from "@radix-ui/react-dialog";

export const Content = styled(Dialog.Content)`
    background-color: ${props => props.theme['gray-100']};
    border-radius: 0.25rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 450px;
    max-height: 85vh;
    padding: 25px;
    outline: none;
    box-shadow: none;
`

export const Title = styled(Dialog.Title)`
    font-size: 1.3rem;
    font-weight: 600;
    color: ${props => props.theme['gray-600']};
`

export const Overlay = styled(Dialog.Overlay)`
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    inset: 0;
`

