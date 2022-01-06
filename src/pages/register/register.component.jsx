import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';

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
  const alert = useAlert();

  const registrationError = useSelector(state => state.memberState.error)

  const [registrationForm, setRegistrationForm] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [failedPassword, setFailedPassword] = useState(false);
  const [toolTipVisibility, setToolTipVisibility] = useState(false);

  const onMouseOverInfo = () => {
    setToolTipVisibility(true); 
    setFailedPassword(false)
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    
    switch(name) {
        case 'fname':
            setRegistrationForm((prevState) => ({
              ...prevState,
              fname: value
            }));
            break;
        case 'lname':
            setRegistrationForm((prevState) => ({
              ...prevState,
              lname: value
            }));
            break;
        case 'email':
            setRegistrationForm((prevState) => ({
              ...prevState,
              email: value
            }));
            break;
        case 'password':
            setFailedPassword(false);
            setRegistrationForm((prevState) => ({
              ...prevState,
              password: value
            }));
            break;
        case 'confirmPassword':
            setRegistrationForm((prevState) => ({
              ...prevState,
              confirmPassword: value
            }));
            break;
        default:
            break;
      };
  };

  const resetInput = () => {
    setRegistrationForm({});
  };

  const onSubmitRegister = async() => {
    const { fname, lname, email, password, confirmPassword } = registrationForm;

    if (!fname || !lname || !email || !password) {
      alert.show('Missing required fields' , { type: 'error' , position:'top center'});
      return;
    };

    if (password !== confirmPassword) {
      alert.show('Passwords do not match' , { type: 'error' , position:'top center'});
      return;
    };

    // regular expression: password must contain 8 characters minimum, one capital letter, and one number.
    const VALIDATE_PWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    if ( !VALIDATE_PWORD.test(password) ) {
      setFailedPassword(true);
      return;
    };
  
    dispatch(registrationStart({ fname, lname, email, password }));

    if(registrationError) {
      if (registrationError?.message === 'Request failed with status code 409') {
        return alert.show(`User with the email ${email} already exists` , {
          type: 'error' , 
          position:'top center'
        });
      }

      return alert.show('Something went wrong.' , { 
          type: 'error',
          position:'top center'
        });
    }

    resetInput();
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
                  type='text'
                  name='fname'
                  id='fname'
                  onChange={handleChange}
                />
              </NameField>

              <NameField>
                <RegistrationInput
                  style = {{marginLeft:'15%'}}
                  placeholder='Last Name (required)'
                  type='text'
                  name='lname'
                  id='lname'
                  onChange={handleChange}
                />
              </NameField>
            </NameFieldContainer>

            <Email>
              <RegistrationInput
                placeholder='Email (required)'
                type='email'
                name='email'
                id='email'
                onChange={handleChange}
              />
            </Email>
              
            <Password>
              <RegistrationInput
                placeholder='Password (required)'
                type='password'
                name='password'
                id='password'
                onChange={handleChange}
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
              placeholder='Confirm Password (required)'
              type='password'
              name='confirmPassword'
              id='confirmPassword'
              onChange={handleChange}
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
