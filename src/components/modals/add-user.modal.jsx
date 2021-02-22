import React, { useState } from "react";
import { useAlert } from 'react-alert';
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";
import { currentMemberId } from "../../redux/site-member/site-member.selectors";

import { toggleAddUser } from "../../redux/modal/modal.actions";
import { requestUserDropDownOptions } from '../../redux/drop-downs/drop-down.actions';

import { createNewUser } from "../../services/api";

import { ModalMain, ModalContent, CloseButton, Header, Article,
  FieldSet, Label, Input, Submit
} from "./modal.styles";

const AddUser = ( {toggleAddUser, getUserOptions, memberId} ) =>{

  const alert = useAlert();

  let [userID, setUserID] = useState('');
  let [fname, setFname] = useState('');
  let [lname, setLname] = useState('');

  const onUseridChange = (event) => {
    setUserID(event.target.value); 
  } ;

  const onFnameChange = (event) => {
    setFname(event.target.value);
  };

 const onLnameChange = (event) => {
    setLname(event.target.value); 
  };

  const inputReset = () => {
    userID = null;
    fname = null;
    lname = null;
    document.getElementById('userid').value = '';
    document.getElementById('fname').value = '';
    document.getElementById('lname').value = '';
    document.getElementById('userid').focus();
  };

  const submitUser = (event) => {
    if (userID && fname && lname && memberId){
      createNewUser(userID, fname, lname, memberId);
      alert.show(`${userID} submitted.`, {type: 'success', position:'top center'});
      inputReset();
    } else {
      alert.show('Please ensure that all fields are filled out.', {type: 'error', position:'top center'});
    }
  };
  
  return (
   <ModalMain>
      <ModalContent>
        {/* Retrieve updated list of users when modal is closed. */}
        <CloseButton onClick={() => {toggleAddUser(); getUserOptions(memberId);}}>&times;</CloseButton>
        <Header>Add User</Header>
        <Article>
          <div action="sign-up_submit" method="get" acceptCharset="utf-8">
            <FieldSet id="sign_up">
                <Label htmlFor="email-address">User ID</Label>
                <Input onChange={onUseridChange} type="text" name="userid" id="userid"/>
                <Label htmlFor="fname">First Name</Label>
                <Input onChange={onFnameChange} type="text" name="fname"  id="fname" />
                <Label htmlFor="lname">Last Name</Label>
                <Input onChange={onLnameChange} type="text" name="lname"  id="lname"/>
            </FieldSet>
            <Submit onClick={() => submitUser()} type = "submit" defaultValue="Submit"/>
          </div>
        </Article>
      </ModalContent>
   </ModalMain>
  );
};

const mapStateToProps = createStructuredSelector({
  memberId: currentMemberId
});

const mapDispatchToProps = (dispatch) => ({
  toggleAddUser : () => dispatch(toggleAddUser()),
  getUserOptions: (memberId) => { dispatch(requestUserDropDownOptions(memberId))}
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);