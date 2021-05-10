import React, { useState } from "react";
import { useAlert } from "react-alert";

import { RegistrationPageBody, RegistrationArticle, RegistrationMain, RegistrationFieldSet, RegistrationLegend, 
  RegistrationInput, RegistrationSubmit, NameFieldContainer, NameField, Email, Password,PasswordRules, SignInLinkContainer, SignInLink,
  ToolTip, Arrow, InfoIcon
} from "./register.styles";

import infoIconSvg from '../../images/info_icon.svg';

import { API_URL } from '../../services/api';

const RegistrationPage = ({ history }) =>{

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedPassword, setFailedPassword] = useState(false);
  const [popupVisibility, setPopupVisibility] = useState(false);

  const alert = useAlert();

  const onFirstNameChange = (event) => {
    setFname(event.target.value);
  };

  const onLastNameChange = (event) => {
    setLname(event.target.value);
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onMouseOverInfo = (event) => {
    setPopupVisibility(true); 
    setFailedPassword(false)
  };

  const onSubmitRegister = () => {

    if (!fname || !lname || !email || !password) {
      alert.show('Missing required fields' , { type: "error" , position:"top center"});
      return;
    };

    // regular expression: password must contain 8 characters minimum, one capital letter, and one number.
    const VALIDATE_PWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    if ( !VALIDATE_PWORD.test(password) ) {
      setFailedPassword(true);
      return;
    };
  
    fetch(`${API_URL}/members/register`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fname: fname,
        lname: lname,
        email: email,
        password: password,
      }),
    })
      // * Handling incorrect credentials
      .then((response) => response.json())
      .then((member) => {
        if (member.id) {
          history.push("/signin");
        } else {
          alert.show('Unable to register' , { type: "error" , position:"top center"})
        }
      });
  };

  return (
    <RegistrationPageBody>
      <RegistrationLegend>Registration</RegistrationLegend>
      <RegistrationArticle>
        <RegistrationMain>
          <RegistrationFieldSet>
            <NameFieldContainer>
              <NameField>
                <RegistrationInput
                  placeholder='First Name (required)'
                  type="text"
                  name="fname"
                  id="fname"
                  onChange={onFirstNameChange}
                />
              </NameField>

              <NameField>
                <RegistrationInput
                  style = {{marginLeft:"15%"}}
                  placeholder='Last Name (required)'
                  type="text"
                  name="lname"
                  id="lname"
                  onChange={onLastNameChange}
                />
              </NameField>
            </NameFieldContainer>

            <Email>
              <RegistrationInput
                placeholder='Email (required)'
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
              />
            </Email>
              
            <Password 
 >
              <RegistrationInput
                placeholder='Password (required)'
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
              />
              <div>
              <InfoIcon 
                src={infoIconSvg} 
                alt="info-icon"
                onMouseOver={onMouseOverInfo} 
                onMouseOut={() => setPopupVisibility(false)}
                />
                      { popupVisibility ?
                  <ToolTip>
                    <Arrow/>
                    <span style = {{color:"#3f7fba", fontWeight:"bold", textDecoration: 'underline'}}>Password Rules</span>
                    <br/>
                    <span>-Must be at least 8 characters long</span>
                    <br/>
                    <span>-Must contain at least one uppercase letter.</span>
                    <br/>
                    <span>-Must contain at least one lowercase letter.</span>
                    <br/>
                    <span>-Must contain at least one number.</span>
                  </ToolTip>
              : null}
              </div>


            </Password>
            {
              failedPassword ?
              <PasswordRules>
                <span>Password must: </span>
                <br/>
                <span>be at least 8 characters long; contain at least one uppercase letter;</span>
                <br/>
                <span>Contain at least one lowercase letter; contain at least one number.</span>
              </PasswordRules>
              : null
            }
          </RegistrationFieldSet>
            
          <RegistrationSubmit
            type="submit"
            value="Register"
            onClick={onSubmitRegister}
          />
          <SignInLinkContainer>
            <SignInLink onClick={() => history.push("/signin")} className="signin-link">
                Already have an account?
            </SignInLink>
          </SignInLinkContainer>
          
        </RegistrationMain>
        
      </RegistrationArticle>

    </RegistrationPageBody>
  );
}


export default RegistrationPage;
