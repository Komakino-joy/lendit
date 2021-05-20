import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { connect } from 'react-redux';

import { registrationStart, signInStart } from '../../redux/site-member/site-member.actions';

import { RegistrationPageBody, RegistrationArticle, RegistrationMain, RegistrationFieldSet, RegistrationLegend, 
  RegistrationInput, RegistrationSubmit, NameFieldContainer, NameField, Email, Password,PasswordRules, SignInLinkContainer, SignInLink,
  ToolTip, InfoIcon
} from './register.styles';

import infoIconSvg from '../../images/info_icon.svg';
import passwordTooltip from '../../images/password_tooltip.svg';

const RegistrationPage = ({ history, registrationStart, signInStart }) =>{

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [failedPassword, setFailedPassword] = useState(false);
  const [toolTipVisibility, setToolTipVisibility] = useState(false);

  const alert = useAlert();

  const onMouseOverInfo = () => {
    setToolTipVisibility(true); 
    setFailedPassword(false)
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    
    switch(name) {
        case 'fname':
            setFname(value);
            break;
        case 'lname':
            setLname(value);
            break;
        case 'email':
              setEmail(value);
              break;
        case 'password':
            setPassword(value);
            break;
        case 'confirmPassword':
            setConfirmPassword(value)
            break;
        default:
            break;
      };
  };

  const resetInput = () => {
    setFname('');
    setLname('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const onSubmitRegister = async() => {

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
  
    await registrationStart({ fname, lname, email, password });
    await timeout(2000);
    await signInStart({email, password});
    await history.push('/home');
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


const mapDispatchToProps = (dispatch) => ({
  registrationStart: (userRegistrationInfo) => dispatch(registrationStart(userRegistrationInfo)),
  signInStart: (emailAndPassword) => dispatch(signInStart(emailAndPassword)),
})

export default connect(null, mapDispatchToProps)(RegistrationPage);
