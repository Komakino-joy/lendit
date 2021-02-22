import styled, { css } from 'styled-components';

export const CenterPanelContainer = styled.div`
    width: 40%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 1500px) {
      width: 100%;
      justify-content: center;
      align-items: center;
`;

export const CenterPanelInnerContainer = styled.div`
    height: 96vh;
    width: 95%;
    margin: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: 2px solid black;
    border-radius: 8px;

    @media screen and (max-width: 1500px) {
      max-width: 600px;
      min-width: 350px;
`;

export const Header = styled.div`
    text-align: center;
    position: relative;
`;

export const AssetName = styled.header`
position:relative;
    font-size: 3rem;
    margin-bottom: 0;
    font-weight: bold;
    color: #555;
    text-shadow: 1px 1px #d4d4d4;
`;

export const AssetSerial = styled.span`
    position: relative;
    bottom: 0.5em;
    color: rgb(153, 153, 153);
    margin: 0;
    padding: 0;
    margin-bottom: 0.5em;
    font-size: 0.8em;
`;


export const RemoveButton = styled.button`
    color: white;
    font-weight:bold;
    cursor: pointer;
    background-color:black;
    position: absolute;
    width: 50%;
    height: 3rem;
    border-radius:5px;
    visibility: hidden;
`;

export const AssetImage = styled.img`
    top: 7%;
    margin-right: auto;
    margin-left: auto;
    max-height: 100%;
    max-width: 85%;
`;

export const ImageContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    height: 45%;
    width: 75%;

    :hover {
        opacity: .8;
    }

    :hover ${RemoveButton} {
        visibility: visible;
    }

    @media screen and (max-width: 1500px) {
      max-height: 100%;
      max-width: 50%;
`;


export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
`;
export const Footer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-bottom: 1em;
    margin-top: 1em;
    width: 90%;
    height: 25%;
    margin-right: auto;
    margin-left: auto;
`;

export const Instructions = styled.div`
    font-size: 1rem;
    display: block;
    margin-bottom: 0.5rem;
    text-align: center;
    color: rgb(114, 0, 180);
`;
  
export const ReasonBox = styled.textarea`
    box-sizing: border-box;
    hover {
      color: #000;
    }
    border-style: solid;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.2);
    padding: 0.5rem;
    border-radius: 0.25rem;
    margin-bottom: 0.25rem;
    height: 50%;
    resize: none;
    width: 100%;
    height: 10em;

`;


const availableStatusStyles = css`
    color: rgb(13, 126, 13);
`;

const inUseStatusStyles = css`
    color: rgb(250, 33, 33);
`;

const quarantineStatusStyles = css`
    color: rgb(151, 33, 219);
`;

const getStatusStyles = (props) => {
    if (props.isAvailable) {
        return availableStatusStyles
    } 
    
    if (props.isInUse) {
        return inUseStatusStyles
    } 
    
    if (props.isQurantined) {
        return quarantineStatusStyles
    }
};

export const AssetStatus = styled.span`
    text-shadow: 1px 1px #d4d4d4;
    text-align: center;
    font-size: 2.5rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;

    ${getStatusStyles}
`
  