import styled from 'styled-components';

export const RegistrationBody = styled.div`
    position: relative;
    padding-top: 20vh;
    overflow: hidden;
`;

export const RegistrationArticle = styled.article`
    text-align: center;
    border-radius: 0.5rem;
    border-style: solid;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.1);
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 100%;
    max-width: 32rem;
    box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.2);
    margin-right: auto;
    margin-left: auto;
`;

export const RegistrationMain = styled.main`
    padding: 2rem;
    color: rgba(0, 0, 0, 0.8);
`;

export const RegistrationFieldSet = styled.fieldset`
    border-style: solid;
    border-width: 1px;
    border-color: transparent;
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
    margin-right: 0;
`;

export const RegistrationLegend = styled.legend`
    font-size: 3rem;
    font-weight: 600;
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
    margin-right: 0;
`;

export const RegistrationLabel = styled.label`
    display: block;
    font-weight: 600;
    line-height: 1.5;
    font-size: 0.875rem;
`;

export const RegistrationInput = styled.input`
    padding: 0.5rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    border-style: solid;
    border-width: 1px;
    background-color: transparent;
    .hover-bg-black:hover {
      background-color: #000;
    }
    .hover-white:hover {
      color: #fff;
    }
    width: 100%;
    text-align: center;
`;

export const RegistrationSubmit= styled.input`
    font-weight: bold;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    border-style: solid;
    border-width: 1px;
    border-color: #000;
    background-color: transparent;
    -moz-osx-font-smoothing: grayscale;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    transition: -webkit-transform 0.25s ease-out;
    transition: transform 0.25s ease-out;
    transition: transform 0.25s ease-out, -webkit-transform 0.25s ease-out;
    cursor: pointer;
    font-size: 0.875rem;
    display: inline-block;
    text-align: center;
`;

export const NameFieldContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin-top: 1rem;
`;

export const NameField = styled.div`
    width: 45%;
`;

export const Email = styled.div`
    margin-top: 1rem;
`;

export const Password = styled.div`
    margin-top: 1rem;
    margin-bottom: 1rem;
`;


