import styled from 'styled-components';
import backgroundImage from '../../images/background.webp';

export const SignInPageBody = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  :before {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background-image: url(${backgroundImage});
    background-repeat: no-repeat;
    background-position: 50% 0;
    background-size: cover;
    filter: blur(2px);
    z-index: -1;
  }
`;

export const SignInLegend = styled.legend`
  opacity: 1;
  margin-top: 6%;
  color: #4178be;
  font-size: 3.5rem;
  font-weight: 500;
  text-align: center;
`;

export const SignInArticle = styled.article`
  background-color: white;
  min-width: 370px;
  min-height: 300px;
  margin-top: 2%;
  padding-top: 1%;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.4);
  position: relative;
  margin-right: auto;
  margin-left: auto;
  border-radius: 8px;
`;

export const SignInMain = styled.main`
  padding: 2rem;
  color: rgba(0, 0, 0, 0.8);
`;

export const SignInFieldSet = styled.fieldset`
  border-style: solid;
  border-width: 1px;
  border-color: transparent;
`;

export const SignInInput = styled.input`
  padding: 0.5rem;
  border: none;
  border-bottom: 1px solid lightgrey;
  width: 100%;
`;

export const SignInSubmit = styled.input`
  color: #4178be;
  font-weight: bold;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  border: 3px solid #4178be;
  background-color: transparent;
  cursor: pointer;
  font-size: 0.875rem;
  width: 90%;
  text-align: center;
  :hover {
    background-color: #4178be;
    color: #ffffff;
  }
`;

export const RegisterLinkContainer = styled.div`
  line-height: 1.5;
  margin-top: 1rem;
`;

export const RegisterLink = styled.span`
  font-size: 0.875rem;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  :hover {
    color: rgba(0, 0, 0, 1);
  }
`;

export const Email = styled.div`
  display: flex;
`;

export const Password = styled.div`
  display: flex;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
`;
