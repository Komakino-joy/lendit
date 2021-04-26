import styled from 'styled-components';

export const RegistrationPageBody = styled.div`
    height:100vh;
    display:flex;
    flex-direction: column;
`;

export const RegistrationLegend = styled.legend`
    margin-top: 6%;
    color: #4178BE;
    font-size: 3.5rem;
    font-weight: 500;
    text-align: center;
`;

export const RegistrationArticle = styled.article`
    width: 30%;
    height: 48%;
    margin-top: 1.5%;
    padding-top: 1%;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.4);
    position: relative;
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
`;

export const RegistrationLabel = styled.label`
    display: block;
    font-weight: 600;
    line-height: 1.5;
    font-size: 0.875rem;
`;

export const RegistrationInput = styled.input`
    padding: 0.5rem;
    border:none;
    border-bottom: 1px solid lightgrey;
    border-left: 1px solid lightgrey;
    width: 94%;
`;

export const RegistrationSubmit= styled.input`
    color: #4178BE; 
    font-weight: bold;
    padding:.5rem 1rem;
    margin-bottom: 1rem;
    border: 3px solid #4178BE;
    background-color: transparent;
    cursor: pointer;
    font-size: 0.875rem;
    width: 90%;
    text-align: center;
    :hover{
        background-color: #4178BE;
        color: #ffffff;
    }
`;

export const SignInLinkContainer = styled.div`
    line-height: 1.5;
    margin-top: 1rem;
`;

export const SignInLink = styled.span`
    font-size: 0.875rem;
    text-decoration: none;
    color: rgba(0, 0, 0, .5);
    cursor: pointer;
    :hover {
        color: rgba(0 ,0, 0, 1);
      }
`;

export const NameFieldContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 1rem;
    margin-left: 1%;
`;

export const NameField = styled.div`
    width: 45%;
`;

export const Email = styled.div`
    margin-top: 1.2rem;
`;

export const Password = styled.div`
    margin-top: 1.2rem;
    margin-bottom: 1.5rem;
`;


