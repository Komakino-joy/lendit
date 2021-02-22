import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";
import { isSignedIn } from "../../redux/site-member/site-member.selectors";

import { handleMemberSignin } from "../../redux/site-member/site-member.actions";

import {
  SignInBody,
  SignInArticle,
  SignInMain,
  SignInFieldSet,
  SignInLegend,
  SignInLabel,
  SignInInput,
  SignInSubmit,
  RegisterContainer,
  RegisterLink,
  Email,
  Password,
} from "./signin.styles";

const SigninPage = ({ history, signIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitSignIn = () => {
    fetch("https://lendit-api.herokuapp.com/signin", {
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
        }
      });
  };

  return (
    <SignInBody>
      <SignInArticle>
        <SignInMain>
          <SignInFieldSet>
            <SignInLegend>Sign In</SignInLegend>

            <Email>
              <SignInLabel htmlFor="email-address">Email</SignInLabel>
              <SignInInput
                type="text"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
              />
            </Email>

            <Password>
              <SignInLabel htmlFor="password">Password</SignInLabel>
              <SignInInput
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

          <RegisterContainer>
            <RegisterLink
              onClick={() => history.push("/register")}
              className="register-link"
            >
              Register
            </RegisterLink>
          </RegisterContainer>
        </SignInMain>
      </SignInArticle>
    </SignInBody>
  );
};

const mapStateToProps = createStructuredSelector({
  isSignedIn,
});

const mapDispatchToProps = (dispatch) => ({
  signIn: (memberId) => {
    dispatch(handleMemberSignin(memberId));
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SigninPage)
);
