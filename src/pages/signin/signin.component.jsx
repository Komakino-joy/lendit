import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useAlert } from "react-alert";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { isSignedIn } from "../../redux/site-member/site-member.selectors";
import { handleMemberSignin } from "../../redux/site-member/site-member.actions";

import {
  SignInPageBody, SignInArticle, SignInMain, SignInFieldSet, SignInLegend, 
  SignInInput, SignInSubmit, RegisterLinkContainer, RegisterLink, Email, Password
} from "./signin.styles";


import emailIcon from '../../images/email_icon.svg';
import passwordIcon from '../../images/password_icon.svg';


const SigninPage = ({ history, signIn }) => {
  const alert = useAlert();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitSignIn = () => {
    fetch("http://localhost:3000/members/signin", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
      .then((response) => response.json())
      .then((member) => {
        if (member.id) {
          signIn(member.id);
          history.push("/home");
        } else{
          alert.show('Invalid credentials' , { type: "error" , position:"top center"})
        }
      })
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
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
              />
            </Email>

            <Password>
              <img src={passwordIcon} alt='password icon for sign in' height='40px' width='40px'/>
              <SignInInput
                placeholder="Password"
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
              />
            </Password>
          </SignInFieldSet>

          <SignInSubmit
            onClick={onSubmitSignIn}
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
  signIn: (memberId) => { dispatch(handleMemberSignin(memberId));},
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SigninPage)
);
