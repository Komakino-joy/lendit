import styled from 'styled-components';

export const DropDownContainer = styled.div`
    display: flex;
    align-items: flex-end;
    width: 30%;
    flex-direction: column;
    margin-bottom: 30px;

    @media screen and (max-width: 1200px) {
      width: 100%;
      justify-content: center;
      align-items: center;
`
export const DropDownInner = styled.div`
    margin-top: 1vh;
    height: auto;
    background-color: white;
    width: 85%;
    border: 1px solid darkgrey;
    border-radius: 8px;
    padding: 1rem;
    padding-top: 0;

    @media screen and (max-width: 1200px) {
      display: flex;
      flex-direction: column;
      max-width: 560px;
      min-width: 350px;
      margin-top: 2em;
      padding: 0 20px 20px 20px;
`

export const Tag = styled.span`
    padding-top: .8rem;
    display: block;
    font-size: 1.25rem;
    font-weight: bold;
    color: #235494;
    margin-bottom: 0.5rem;
`