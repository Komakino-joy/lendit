import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useAlert } from "react-alert";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { isSignedIn } from "../../redux/site-member/site-member.selectors";
import { signInStart } from "../../redux/site-member/site-member.actions";

import {
  SignInPageBody, SignInArticle, SignInMain, SignInFieldSet, SignInLegend, 
  SignInInput, SignInSubmit, RegisterLinkContainer, RegisterLink, Email, Password
} from "./signin.styles";


import emailIcon from '../../images/email_icon.svg';
import passwordIcon from '../../images/password_icon.svg';

const SigninPage = ({ history, signInStart }) => {
  const alert = useAlert();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event) => {
    const { value, name } = event.target;
    name === 'email' ? setEmail(value) : setPassword(value);
  };

  return (
    <SignInPageBody>
      <SignInLegend>Lendit Asset Tracker</SignInLegend>
      <SignInArticle>
        <SignInMain>
          <SignInFieldSet>

            <Email>
              <img src={emailIcon} alt='user icon for sign in' height='40px' width='40px'/>
              <SignInInput
                placeholder="Email Address"
                type="text"
                name="email"
                id="email"
                onChange={handleChange}
              />
            </Email>

            <Password>
              <img src={passwordIcon} alt='password icon for sign in' height='40px' width='40px'/>
              <SignInInput
                placeholder="Password"
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
              />
            </Password>
          </SignInFieldSet>

          <SignInSubmit
            onClick={() => signInStart({email, password})}
            type="submit"
            value="Sign in"
          />

          <RegisterLinkContainer>
            <RegisterLink
              onClick={() => history.push("/register")}
              className="register-link"
            >
              New user?
            </RegisterLink>
          </RegisterLinkContainer>
        </SignInMain>
      </SignInArticle>
      
    </SignInPageBody>
  );
};

const mapStateToProps = createStructuredSelector({
  isSignedIn,
});

const mapDispatchToProps = (dispatch) => ({
  signInStart: (emailAndPassword) => dispatch(signInStart(emailAndPassword)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SigninPage)
);
