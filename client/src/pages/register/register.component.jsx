import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { registrationStart } from '../../redux/site-member/site-member.actions';

import { RegistrationPageBody, RegistrationArticle, RegistrationMain, RegistrationFieldSet, RegistrationLegend, 
  RegistrationInput, RegistrationSubmit, NameFieldContainer, NameField, Email, Password,PasswordRules, SignInLinkContainer, SignInLink,
  ToolTip, InfoIcon
} from './register.styles';

import infoIconSvg from '../../images/info_icon.svg';
import passwordTooltip from '../../images/password_tooltip.svg';

const RegistrationPage = () =>{
  const history = useHistory();
  const dispatch = useDispatch();

  const [failedPassword, setFailedPassword] = useState(false);
  const [toolTipVisibility, setToolTipVisibility] = useState(false);

  const fnameInput = useRef(null);
  const lnameInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);

  const onMouseOverInfo = () => {
    setToolTipVisibility(true); 
    setFailedPassword(false)
  };

  const inputReset = () => {
    fnameInput.current.value = null;
    lnameInput.current.value = null;
    emailInput.current.value = null;
    passwordInput.current.value = null;
    confirmPasswordInput.current.value = null;
    fnameInput.current.focus();
  };

  const onSubmitRegister = () => {

    const fname = fnameInput.current.value;
    const lname = lnameInput.current.value;
    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    const confirmPassword = confirmPasswordInput.current.value;

    if (!fname || !lname || !email || !password) {
      toast.error('Missing required fields' , { 
        id: 'register-missing-fields' 
      });
      return;
    };

    if (password !== confirmPassword) {
      toast.error('Passwords do not match' , { 
        id: 'passwords-do-not-match' 
      });
      return;
    };

    if(password.length < 8) return setFailedPassword(true);

    let hasUpperCase = /[A-Z]/.test(password);
    let hasLowerCase = /[a-z]/.test(password);
    let hasNumbers = /\d/.test(password);

    if (hasUpperCase + hasLowerCase + hasNumbers < 3) return setFailedPassword(true);

    const responseAlert = (message, type) => toast[type](message, {
      id: 'register-member',
    });
  
    dispatch(registrationStart({ fname, lname, email, password, responseAlert, inputReset }));

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
                  ref={fnameInput}
                  placeholder='First Name (required)'
                  type='text'
                  name='fname'
                  id='fname'
                />
              </NameField>

              <NameField>
                <RegistrationInput
                  style = {{marginLeft:'15%'}}
                  ref={lnameInput}
                  placeholder='Last Name (required)'
                  type='text'
                  name='lname'
                  id='lname'
                />
              </NameField>
            </NameFieldContainer>

            <Email>
              <RegistrationInput
                ref={emailInput}
                placeholder='Email (required)'
                type='email'
                name='email'
                id='email'
              />
            </Email>
              
            <Password>
              <RegistrationInput
                ref={passwordInput}
                placeholder='Password (required)'
                type='password'
                name='password'
                id='password'
              />
              <div>
              <InfoIcon 
                src={infoIconSvg} 
                alt='info-icon'
                onMouseOver={onMouseOverInfo} 
                onMouseOut={() => setToolTipVisibility(false)}
                style={failedPassword ? {display: 'none'} : {display: ''} }
                />
                { toolTipVisibility ?
                  <ToolTip>
                    <img src={passwordTooltip} alt='password tooltip' ></img>
                  </ToolTip>
              : null}
              </div>
            </Password>
            <RegistrationInput
              ref={confirmPasswordInput}
              placeholder='Confirm Password (required)'
              type='password'
              name='confirmPassword'
              id='confirmPassword'
            />
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
            type='submit'
            value='Register'
            onClick={onSubmitRegister}
          />
          
          <SignInLinkContainer>
            <SignInLink onClick={() => history.push('/signin')} className='signin-link'>
                Already have an account?
            </SignInLink>
          </SignInLinkContainer>
          
        </RegistrationMain>
        
      </RegistrationArticle>

    </RegistrationPageBody>
  );
}


export default RegistrationPage;
