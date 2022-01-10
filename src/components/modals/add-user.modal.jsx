import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toggleAddUser } from "../../redux/modal/modal.actions";
import { requestUserDropDownOptions } from '../../redux/drop-downs/drop-down.actions';

import { useAlert } from 'react-alert';

import { httpCreateNewUser } from "../../services/api";

import { ModalMain, ModalContent, CloseButton, Header, Article, FieldSet, Input,Submit } from "./modal.styles";

const AddUser = () =>{
  const dispatch = useDispatch();

  const memberId = useSelector(state => state.memberState.memberId)

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
      httpCreateNewUser(userID, fname, lname, memberId);
      alert.show(`${userID} submitted.`, {type: 'success', position:'top center'});
      inputReset();
    } else {
      alert.show('Please ensure that all fields are filled out.', {type: 'error', position:'top center'});
    }
  };
  
  const handleOnClose = (e) => {
    e.preventDefault();
    dispatch(toggleAddUser());
    dispatch(requestUserDropDownOptions(memberId));
  }

  return (
   <ModalMain>
      <ModalContent>
        {/* Retrieve updated list of users when modal is closed. */}
        <CloseButton onClick={handleOnClose}>&times;</CloseButton>
        <Header>Add User</Header>
        <Article>
          <div action="sign-up_submit" method="get" acceptCharset="utf-8">
            <FieldSet id="sign_up">
                <Input onChange={onUseridChange} placeholder="User ID (Required)" type="text" name="userid" id="userid"/>
                <Input onChange={onFnameChange}  placeholder="First Name (Required)"  type="text" name="fname"  id="fname" />
                <Input onChange={onLnameChange}  placeholder="Last Name (Required)" type="text" name="lname"  id="lname"/>
            </FieldSet>
            <Submit onClick={() => submitUser()} type = "submit" defaultValue="Submit"/>
          </div>
        </Article>
      </ModalContent>
   </ModalMain>
  );
};

export default AddUser;