import React, { useState } from "react";
import toast from 'react-hot-toast';
import { withRouter } from "react-router-dom";

import { useDispatch } from "react-redux";
import { signInStart } from "../../redux/site-member/site-member.actions";

import {
  SignInPageBody, SignInArticle, SignInMain, SignInFieldSet, SignInLegend, 
  SignInInput, SignInSubmit, RegisterLinkContainer, RegisterLink, Email, Password
} from "./signin.styles";

import emailIcon from '../../images/email_icon.svg';
import passwordIcon from '../../images/password_icon.svg';

const SigninPage = ({ history }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event) => {
    const { value, name } = event.target;
    name === 'email' ? setEmail(value.toLowerCase()) : setPassword(value);
  };

  const handleSubmit = (event) => {
      if (!email || !password) {
        toast.error('Please fill out both fields' , { 
          id: 'signin-missing-fields' 
        });  
        return;
      };

      const responseAlert = (message, type) => toast[type](message, {
        id: 'sigin-in-member',
      });

      dispatch(signInStart({ email, password, responseAlert }));
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
            onClick={handleSubmit}
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


export default withRouter(
  SigninPage
);
