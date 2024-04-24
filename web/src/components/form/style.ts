import styled from 'styled-components'

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;

    label {
        font-size: 1rem;
        color: ${props => props.theme['gray-600']};
        font-weight: 500;
    }

    span { 
        font-size: 0.8rem;
        color: ${props => props.theme['red-500']};
    }
    
    input {
        padding: 0.25rem 0.5rem;
        border: 1px solid ${props => props.theme['gray-300']};
        border-radius: 0.25rem;
        font-size: 1rem;

        &[data-error="true"] {
            &:focus{
                border-color: ${props => props.theme['red-500']};
                box-shadow: 0 0 0 2px ${(props) => props.theme['red-500']};
            }
        }
    }
`