import styled, { css } from 'styled-components'
import DatePicker from "react-datepicker";

export const DownloadExcelBtn = styled.div`
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
    button {
        font-family: Roboto;
        font-weight: 500;
        font-size: 16px;
        letter-spacing: .875px;
        background: #50ba68;
        color: white;
        padding: 6px 10px;
        outline: none;
        border: 1px solid #50ba68;

        border-radius: 3px;
        :hover {
            cursor:pointer;
            filter: brightness(110%);
            transform: scale(1.02);
        }
        :active {
            transform: translateY(1px);
        }
    }
`

export const HeaderContainer = styled.header`
    position: relative;
`

export const Header  = styled.h1`
    postion: absolute;
    background-color: #1b4275;
    color: white;
    padding: 0.5em;
    text-align: left;
    margin-bottom: 0;
`;

export const CloseButton  = styled.span`
    color: Black;
    float: right;
    font-size: 20px;
    font-weight: 800;
    margin: 0 5px 5px 0;
    }
    :hover {
    color: rgb(192, 0, 0);
    cursor: pointer;
`;

export const AddButtonContainer = styled.div `
    background: lightgrey;
    position: absolute;
    right: 30px;
    top: 20px;
    display: flex;
    padding: .3rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    background: #50ba68;
    color: white;
    font-weight: 500;
    :hover {
            cursor:pointer;
            filter: brightness(110%);
            transform: scale(1.02);
        }
        :active {
            transform: translateY(1px);
        }

    
    span {
        margin-right: 8px;
    }
`

export const ModalMain = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 6;
    background: rgba(240, 240, 240, 0.9);
    display: flex;
    justify-content: center;
    -ms-align-items: center;
    opacity: 0;
    animation: react-confirm-alert-fadeIn 0.5s 0.2s forwards;
    @media screen and (max-width: 1200px) {
        height: 157vh;
      }
`;

export const ModalContent = styled.div`
    position: absolute;
    top: 10%;
    width: 50%;
    height: auto;
    width: 450px;
    padding-bottom: 2em;
    background-color: white;
    z-index: 3;
    overflow: auto;
    border-radius: 10px;
    box-shadow: 0 20px 70px rgba(0, 0, 0, 0.2);
`;

export const ModalTable = styled.div`
    position: absolute;
    top: 10%;
    width: 50%;
    height: 45vh;
    width: 450px;
    padding-bottom: 2em;
    background-color: white;
    z-index: 3;
    overflow: auto;
    border-radius: 10px;
    box-shadow: 0 20px 70px rgba(0, 0, 0, 0.2);
`;

export const UsersModalTable = styled.div`
        position: absolute;
        top: 10%;
        width: 50%;
        height: 75vh;
        width: 50%;
        padding-bottom: 2em;
        background-color: white;
        z-index: 3;
        overflow: auto;
        border-radius: 10px;
        box-shadow: 0 20px 70px rgba(0, 0, 0, 0.2);
    `;

export const AssetsModalTable = styled.div`
    position: absolute;
    top: 10%;
    height: 75vh;
    width: 70%;
    padding-bottom: 2em;
    background-color: white;
    z-index: 3;
    overflow: auto;
    border-radius: 10px;
    box-shadow: 0 20px 70px rgba(0, 0, 0, 0.2);
`;

export const ModalReportContent  = styled.div`

    min-width: 450px;
    background-color: white;
    margin-top: 2em;
    margin-bottom: 2em;
    width: 65%;
    border-radius: 10px;
    box-shadow: 0 20px 75px rgba(0, 0, 0, 0.13);
    overflow: scroll;

    @media screen and (max-width: 1200px) {
        height: 90vh;
        width: 80%;
        margin-top: 2em;
        margin-bottom: 0;
      }
`;


export const Article = styled.article`
    display: flex;
    justify-content: center;
    align-items: flex-start;
`;

export const FieldSet = styled.fieldset`
    border-style: solid;
    border-width: 1px;
    border-color: transparent;
`;

export const Label = styled.label`
    display: block;
    line-height: 1;
    margin-top: 1rem;
    margin-bottom: 3px;
`;

const inputStyles = css`
    margin-top: 10px;
    margin-left:17%; 
    border-radius: 4px;
    border: 1px solid lightgrey;
    padding: 10px;
    :focus {
        border: 2px solid #2684ff;
        outline: 0 none;
    }
`
export const Input = styled.input`
    ${inputStyles}
    width: 61.5%;
`;

export const ModalInput = styled.input`
    ${inputStyles}
    margin-left:0;
    width: 93%;
    margin: 30px 0 15px 0;
`;

const submitButton = css`
    color: #4178BE; 
    font-weight: bold;
    padding:.75rem 1rem;
    margin-top: .5rem;
    border: 1px solid #4178BE;
    background-color: transparent;
    cursor: pointer;
    font-size: 0.875rem;
    text-align: center;
    border-radius: 6px;
    :hover{
        background-color: #4178BE;
        color: #ffffff;
    }
`

export const Submit = styled.input`
    ${submitButton}
    width: 150px;
    margin-left:50%;
    transform: translateX(-50%);
`;


export const AddModelButton = styled.p`
    font-weight: 200;
    margin: 0;
    margin-right:16%;
    padding: 0;
    color: black;
    font-size: 0.8em;
    text-align: right;
    cursor: pointer;
    :hover {
        color:grey;
    }
`;

export const TableContainer = styled.div`
    overflow: auto;
    width:100%;
    padding-bottom: 2rem;
`;


export const Table = styled.table`
    width: 100%;
    font-size: 0.875rem;
    text-align: center;
`;

export const TableRow = styled.tr`
    :nth-child(odd){
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

export const TableHeading = styled.th`
    font-weight: 600;
    padding: 1rem;
    background-color: #fff;
`;

export const TableBody = styled.tbody`
    line-height: 1.5;   
`;

export const ModalDate = styled(DatePicker)`
    ${inputStyles}
    margin-left:0 ;
    margin-top: 0 ;
`;
