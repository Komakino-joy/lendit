import styled, { css } from 'styled-components';

const checkInButtonStyles = css`
    background-color: #00449e;
`;

const checkOutButtonStyles = css`
    background-color: #e7040f;
`;

const submitButtonStyles = css`
    width: 100%;
    height: 25px;
    background-color: rgb(128, 128, 128);
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


  