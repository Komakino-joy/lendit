import styled from 'styled-components';

export const NavList = styled.nav`
    width: 100%;
    background: transparent;
    display: flex;
    justify-content: flex-end;
    position: absolute;
    z-index: 999;
`
export const NavOption = styled.p`
    font-size: 1.2rem;
    text-decoration: none;
    transition: color 0.15s ease-in;
    opacity: 1;
    transition: opacity 0.15s ease-in;
    color: #000;
    text-decoration: underline;
    margin-top: 0.5rem;
    padding-right: 2em;
    cursor: pointer;
` 