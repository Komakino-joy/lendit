import styled, { css } from 'styled-components';

const mediaQuery = css`
  @media screen and (max-width: 1500px) {
      max-width: 600px;
      min-width: 350px;
`;

export const RightContainer = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;

    @media screen and (max-width: 1500px) {
      width: 100%;
      justify-content: center;
      align-items: center;
`;

export const RightInnerContainer = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    width: 80%;
    border: 2px solid black;
    margin-bottom: 1em;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;

    ${mediaQuery}
`;
  
export const ActionHeader = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid black;
    background-color: rgb(70, 0, 136);
    color: white;
    font-size: 1.1rem;
    width: 80%;
    height: 40px;
    font-weight: bold;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    ${mediaQuery}
`;

export const ReportLink = styled.p`
    font-size: 1.1rem;
    font-weight: 400;
    color: rgb(0, 0, 150);
    cursor: pointer;
    margin: .8rem
`;