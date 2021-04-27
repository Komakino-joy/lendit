import styled, { css } from 'styled-components';

const checkInButtonStyles = css`
    background-color: #3773bf;
`;

const checkOutButtonStyles = css`
    background-color: #bf3737;
`;

const submitButtonStyles = css`
    width: 85%;
    height: 25px;
    margin-bottom: 0.5rem;
    background-color: #808080;
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
    padding: .5rem 1rem;
    box-shadow: 0 0.3rem rgba(121, 121, 121, 0.65);
    border: none;
    outline: none;
    color: #fff;
    cursor: pointer;
    :active {
    transform: translate(0, 0.1rem);
    box-shadow: 0 0.1rem rgba(255, 255, 255, 0.65);
    }
    :hover {
    filter: brightness(120%);
    }

    ${getButtonStyles}
`;


  