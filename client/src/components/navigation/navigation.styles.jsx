import styled from 'styled-components';

export const NavList = styled.nav`
    width: 100%;
    background: transparent;
    display: flex;
    justify-content: flex-end;
    position: absolute;
    z-index: 2;
`
export const NavOption = styled.p`
    font-size: 1.2rem;
    color: black;
    margin-top: 0.5rem;
    padding-right: 5%;
    cursor: pointer;
    :hover{
        color: grey;
    }
` 