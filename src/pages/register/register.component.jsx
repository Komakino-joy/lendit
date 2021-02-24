import React from "react";
import { connect } from "react-redux";

import { handleMemberSignin } from "../../redux/site-member/site-member.actions";

import {
  RegistrationBody,
  RegistrationArticle,
  RegistrationMain,
  RegistrationFieldSet,
  RegistrationLegend,
  RegistrationLabel,
  RegistrationInput,
  RegistrationSubmit,
  NameFieldContainer,
  NameField,
  Email,
  Password,
} from "./register.styles";
class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
    };
  }

  onFirstNameChange = (event) => {
    this.setState({ fname: event.target.value });
  };

  onLastNameChange = (event) => {
    this.setState({ lname: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitRegister = () => {
    fetch("https://lendit-api.herokuapp.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fname: this.state.fname,
        lname: this.state.lname,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      // * Handling incorrect credentials
      .then((response) => response.json())
      .then((member) => {
        if (member.id) {
          this.props.signIn(member);
          this.props.history.push("/home");
        }
      });
  };

  render() {
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
                    onChange={this.onFirstNameChange}
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
                    onChange={this.onLastNameChange}
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
                  value=""
                  onChange={this.onEmailChange}
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
                  value=""
                  onChange={this.onPasswordChange}
                />
              </Password>
            </RegistrationFieldSet>

            <RegistrationSubmit
              type="submit"
              value="Register"
              onClick={this.onSubmitRegister}
            />
          </RegistrationMain>
        </RegistrationArticle>
      </RegistrationBody>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signIn: (memberId) => {
    dispatch(handleMemberSignin(memberId));
  },
});

export default connect(null, mapDispatchToProps)(RegistrationPage);
