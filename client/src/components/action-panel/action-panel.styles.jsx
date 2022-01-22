import styled, { css } from 'styled-components';

const mediaQuery = css`
  @media screen and (max-width: 1200px) {
      padding:0;
      max-width: 600px;
      min-width: 350px;
`;

export const ActionPanelContainer = styled.div`
    width: 30vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;

    @media screen and (max-width: 1200px) {
      width: 100%;
      justify-content: center;
      align-items: center;
`;

export const ActionPanelInnerContainer = styled.div`
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: white;
    width: calc(80% - 20px);
    padding-left: 20px;
    border-bottom: 1px solid darkgrey;
    border-left: 1px solid darkgrey;
    border-right: 1px solid darkgrey;
    margin-bottom: 1vh;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;

    ${mediaQuery}
`;
  
export const ActionHeader = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #1b4275;
    border-left: 1px solid #1b4275;
    border-right: 1px solid #1b4275;
    background-color: #1b4275;
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
    color: #363636;
    cursor: pointer;
    margin: .6rem;
    display: flex;
    justify-content: space-between;

    :hover {
        color: lightgrey;
    }

    span {
        font-weight: 700;
        color: green;
        margin-left: 10px;
    }
`;