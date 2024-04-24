import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    margin-top: 2rem;
    padding: 0 1rem;

    & ul {
        list-style: none;
        padding: 0;
    }

    & ul li {
        background-color: ${props => props.theme['gray-200']};
        border-radius: 0.25rem;
        text-align: left;
        padding: 1rem;
        display: flex;
        align-items: center;
        gap:0.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;

        &:hover {
            background-color: ${props => props.theme['gray-300']};
            cursor: pointer;
        }

        &::before {
            content: ' ';
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 9999px;
            background: ${(props) => props.theme['orange-500']};
        }
    }
`