import styled from 'styled-components';


export const DropDownContainer = styled.div`
    -webkit-appearance: none;
    -moz-appearance: none;
    border-style: solid;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.2);
    height: 2rem;
    margin-bottom: 0.5rem;

    @media screen and (max-width: 1500px) {
      width: 85%;
`
export const DropDown = styled.select`
    width: 100%;
    border: none;
    font-size: 1rem;
    font-family: sans-serif;
    height: 100%;
    padding-left: 0.2rem;
  
    &:focus {
      padding-left: 0.2rem;
      border: 0.5px solid black;
    }
`