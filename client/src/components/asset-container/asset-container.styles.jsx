import styled, { css } from 'styled-components';

export const AssetContainer = styled.div`
    width: 40vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 1200px) {
      width: 100%;
      max-height: unset;
`;

export const AssetInnerContainer = styled.div`
    position: relative;
    max-height: 98vh;
    min-height: 98vh;
    width: 95%;
    margin: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: 1px solid darkgrey;
    border-radius: 8px;

@media screen and (max-width: 1200px) {
      max-width: 600px;
      min-width: 350px;
    }
`;


export const Header = styled.div`
    position: absolute;
    text-align: center;
    top: 2%;
`;

export const AssetName = styled.header`
    font-size: 3rem;
    margin-bottom: 0;
    font-weight: bold;
    color: #555;
    text-shadow: 1px 1px #d4d4d4;
`;

export const AssetSerial = styled.span`
    bottom: 0.3em;
    color: #525252;
    margin: 0;
    padding: 0;
    font-size: 1em;
`;


export const RemoveButton = styled.button`
    color: white;
    font-family: Verdana;
    font-weight:bold;
    cursor: pointer;
    background-color:black;
    position: absolute;
    width: 50%;
    min-width:200px;
    height: 3rem;
    border-radius:5px;
    visibility: hidden;
`;


export const ImageContainer = styled.div`
    position: absolute;
    top: 16%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    height: 40%;
    width: 50%;

    :hover {
        opacity: .8;
    }

    :hover ${RemoveButton} {
        visibility: visible;
    }

    @media screen and (max-width: 1200px) {
      min-height: unset;
      max-height: 40%;
      max-width: 50%;
    }
`;

export const ButtonContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    bottom: 25%;
`;


export const Footer = styled.div`
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 1em;
    width: 90%;
`;

export const Instructions = styled.div`
    font-size: 16px;
    display: block;
    text-align: center;
    font-weight: 200;

`;
  
export const ReasonBox = styled.textarea`
    box-sizing: border-box;
    border-style: solid;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.2);
    padding: 0.5rem;
    border-radius: 0.25rem;
    margin-bottom: 0.25rem;
    resize: none;
    width: 85%;
    height: 10vh;
`;


const availableStatusStyles = css`
    color: rgb(13, 126, 13);
`;

const inUseStatusStyles = css`
    color: rgb(209, 88, 79);
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
    bottom: 35%;
    position: absolute;
    text-shadow: 1px 1px #d4d4d4;
    text-align: center;
    font-size: 2.2rem;
    font-weight: 500;

    ${getStatusStyles}
`
  