import styled from "styled-components";

export const HeaderContainer = styled.header`
    min-height: 80px;
    background-color: ${props => props.theme['gray-800']}; ;
    width: 100%;
    color: ${props => props.theme['gray-100']};
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 4rem;
`
export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    
    &:hover{
      cursor: pointer;
    }
`

export const HeaderTitle = styled.h1`
    font-size: 1.8rem;
    font-weight: 400;
    margin-left: 1rem;
    letter-spacing: 0.2rem;

`
export const HeaderImage = styled.img`
    width: 40px;
    height: 40px;
`

export const NavContainer = styled.nav`
    display: flex;
    gap: 3rem;
`