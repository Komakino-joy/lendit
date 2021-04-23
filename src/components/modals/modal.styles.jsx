import styled, { css } from 'styled-components'
import DatePicker from "react-datepicker";

export const Header  = styled.h1`
    background-color: #1b4275;
    color: white;
    padding: 0.5em;
    text-align: center;
    margin-bottom: 0;
`;

export const ModalMain = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1010;
    background: rgba(240, 240, 240, 0.9);
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    justify-content: center;
    -ms-align-items: center;
    opacity: 0;
    -webkit-animation: react-confirm-alert-fadeIn 0.5s 0.2s forwards;
    -moz-animation: react-confirm-alert-fadeIn 0.5s 0.2s forwards;
    -o-animation: react-confirm-alert-fadeIn 0.5s 0.2s forwards;
    animation: react-confirm-alert-fadeIn 0.5s 0.2s forwards;
    @media screen and (max-width: 1500px) {
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
    z-index: 1002;
    overflow: auto;
    border-radius: 10px;
    box-shadow: 0 20px 75px rgba(0, 0, 0, 0.13);
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

    @media screen and (max-width: 1500px) {
        height: 90vh;
        width: 80%;
        margin-top: 2em;
        margin-bottom: 0;
      }
`;

export const SubModalMain  = styled.div`
    display: flex;
    justify-content: center;
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1003;

    @media screen and (max-width: 1500px) {
        height: 157vh;
      }
`;

export const SubModalContent = styled.div`
    position: absolute;
    top: 20%;
    height: auto;
    width: 350px;
    padding-bottom: 2em;
    background-color: white;
    z-index: 1004;
    overflow: auto;
    border-radius: 5px;
    border: 2px solid black;
`;

export const CloseButton  = styled.span`
    color: Black;
    float: right;
    }

    :hover {
    color: rgb(192, 0, 0);
    cursor: pointer;
`;

export const Article = styled.article`
    display: flex;
    justify-content: center;
`;

export const FieldSet = styled.fieldset`
    border-style: solid;
    border-width: 1px;
    border-color: transparent;
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
    margin-right: 0;
`;

export const Label = styled.label`
    display: block;
    line-height: 1;
    margin-top: 1rem;
    margin-bottom: -.8rem;
`;

const inputStyles = css`
    padding: 0.5rem;
    border: 1px solid darkgrey;
    margin-top: 1rem;
`
export const Input = styled.input`
    ${inputStyles}
    width: 61%;
    margin-left:18%; 
`;

export const SubModalInput = styled.input`
    ${inputStyles}
    width: 80%;
    margin-left:6%;
`;

const submitButton = css`
    color: #4178BE; 
    font-weight: bold;
    padding:.5rem 1rem;
    margin-top: .5rem;
    border: 1px solid #4178BE;
    background-color: transparent;
    cursor: pointer;
    font-size: 0.875rem;
    text-align: center;
    :hover{
        background-color: #4178BE;
        color: #ffffff;
    }
`

export const Submit = styled.input`
    ${submitButton}
    width: 65%;
    margin-left:18%;
`;

export const AddModelSubmit = styled.input`
    ${submitButton}
    width: 86%;
    margin-left:6.5%;
`;

export const ActivitySubmit = styled.input`
    ${submitButton}
    width: 100%;
`;

export const AddModelButton = styled.p`
    font-weight: 200;
    margin: 0;
    margin-right:16%;
    padding: 0;
    color: #2b3b75;
    font-size: 0.8em;
    text-align: right;
    cursor: pointer;
    :hover {
        color:grey;
    }

`;

export const TableContainer = styled.table`
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
`