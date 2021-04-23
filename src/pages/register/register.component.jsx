import React, { useState } from "react";
import { useAlert } from "react-alert";

import { connect } from "react-redux";
import { handleMemberSignin } from "../../redux/site-member/site-member.actions";

import { RegistrationBody, RegistrationArticle, RegistrationMain, RegistrationFieldSet, RegistrationLegend, 
  RegistrationLabel, RegistrationInput, RegistrationSubmit, NameFieldContainer, NameField, Email, Password
} from "./register.styles";

const RegistrationPage = ({ history, signIn }) =>{

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const onSubmitRegister = () => {
    fetch("http://localhost:3000/register", {
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
          signIn(member);
          history.push("/home");
        } else {
          alert.show('Unable to register' , { type: "error" , position:"top center"})
        }
      });
  };

  return (
    <RegistrationBody>
      <RegistrationArticle>
        <RegistrationMain>
          <RegistrationFieldSet>
            <RegistrationLegend>Register</RegistrationLegend>

            <NameFieldContainer>
              <NameField>
                <RegistrationLabel htmlFor="fname">
                  First Name
                </RegistrationLabel>
                <RegistrationInput
                  type="text"
                  name="fname"
                  id="fname"
                  onChange={onFirstNameChange}
                />
              </NameField>

              <NameField>
                <RegistrationLabel htmlFor="lname">
                  Last Name
                </RegistrationLabel>
                <RegistrationInput
                  type="text"
                  name="lname"
                  id="lname"
                  onChange={onLastNameChange}
                />
              </NameField>
            </NameFieldContainer>

            <Email>
              <RegistrationLabel htmlFor="email-address">
                Email
              </RegistrationLabel>
              <RegistrationInput
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
              />
            </Email>

            <Password>
              <RegistrationLabel htmlFor="password">
                Password
              </RegistrationLabel>
              <RegistrationInput
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
              />
            </Password>
          </RegistrationFieldSet>

          <RegistrationSubmit
            type="submit"
            value="Register"
            onClick={onSubmitRegister}
          />
        </RegistrationMain>
      </RegistrationArticle>
    </RegistrationBody>
  );
}

const mapDispatchToProps = (dispatch) => ({
  signIn: (memberId) => {
    dispatch(handleMemberSignin(memberId));
  },
});

export default connect(null, mapDispatchToProps)(RegistrationPage);
