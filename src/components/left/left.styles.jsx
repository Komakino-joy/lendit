import styled from 'styled-components';

export const LeftContainer = styled.div`
    padding-top: 1em;
    display: flex;
    align-items: flex-end;
    width: 30%;
    flex-direction: column;

    @media screen and (max-width: 1500px) {
      width: 100%;
      justify-content: center;
      align-items: center;
`
export const LeftInner = styled.div`
    height: auto;
    background-color: white;
    width: 85%;
    border: 2px solid black;
    border-radius: 8px;
    padding: 1rem;
    padding-top: 0;

    @media screen and (max-width: 1500px) {
      display: flex;
      flex-direction: column;
      max-width: 600px;
      min-width: 350px;
      margin-top: 2em;
      padding-left: 0;
      padding-right: 0;
      align-items: center;
`

export const Tag = styled.span`
    padding-top: .8rem;
    display: block;
    font-size: 1.25rem;
    font-weight: bold;
    color: #00449e;
    margin-bottom: 0.5rem;
`