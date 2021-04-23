import styled, { css } from 'styled-components';

const checkInButtonStyles = css`
    background-color: #3773bf;
    :hover{
        background-color: #6798d6;
    }
`;

const checkOutButtonStyles = css`
    background-color: #bf3737;
    :hover{
        background-color: #d66767;
    }
`;

const submitButtonStyles = css`
    width: 85%;
    height: 25px;
    margin-bottom: 0.5rem;
    background-color: #808080;
    :hover{
        background-color: #969696;
    }
`;

const getButtonStyles = (props) => {
    if (props.isCheckIn) {
        return checkInButtonStyles
    } 
    
    if (props.isCheckOut) {
        return checkOutButtonStyles
    } 
    
    if (props.isSubmit) {
        return submitButtonStyles
    }
};

export const CustomButtonContainer = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.5em;
    min-width: 9rem;
    width: 100px;
    font-size: 1rem;
    opacity: 1;
    transition: opacity 0.15s ease-in;
    border-radius: 0.25rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    color: #fff;
    cursor: pointer;

    ${getButtonStyles}
`;


  