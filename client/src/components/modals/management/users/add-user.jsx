import React, { useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from "react-redux";

import { toggleAddUser } from "../../../../redux/modal/modal.actions";
import { fetchUserDropDownOptionsStart } from '../../../../redux/drop-downs/drop-down.actions';

import { addNewUserStart } from '../../../../redux/user/user.actions';

import { hasWhiteSpace } from '../../../../utils';

import { ModalMain, ModalContent, CloseButton, Header, Article, FieldSet, Input, Submit } from "../../modal.styles";

const AddUser = () =>{
  const dispatch = useDispatch();

  const memberId = useSelector(state => state.memberState.memberId)

  const userIdInput = useRef(null);
  const fnameInput = useRef(null);
  const lnameInput = useRef(null);

  const inputReset = () => {
    userIdInput.current.value = null;
    fnameInput.current.value = null;
    lnameInput.current.value = null;
    userIdInput.current.focus();
  };

  const submitUser = (e) => {
    e.preventDefault();

    const userId = userIdInput.current.value;
    const fname = fnameInput.current.value;
    const lname = lnameInput.current.value;

    if (userId && fname && lname && memberId){
      
      if  ( hasWhiteSpace(userId) ) {
        userIdInput.current.focus();
        return toast.error('White space is not allowed in user ID.', {
          id: 'user-id-whitespace',
        });
      }

      const formattedUserId = userId.toUpperCase();
      const responseAlert = (message, type) => toast[type](message, {
        id: 'add-user',
      });
      
      dispatch(addNewUserStart({ formattedUserId, fname, lname, memberId, responseAlert, inputReset }));

    } else {
      return toast.error('Please ensure that all fields are filled out.', {
        id: 'add-user-missing-fields',
      });
    }
  };
  
  const handleOnClose = () => {
    dispatch(toggleAddUser());
    dispatch(fetchUserDropDownOptionsStart({ memberId }));
  };

  return (
   <ModalMain>
    <Toaster />
      <ModalContent>
        {/* Retrieve updated list of users when modal is closed. */}
        <CloseButton onClick={handleOnClose}>&times;</CloseButton>
        <Header>Add User</Header>
        <Article>
          <form acceptCharset="utf-8">
            <FieldSet id="sign_up">
                <Input 
                  id="userid"
                  name="userid" 
                  type="text" 
                  ref={userIdInput}
                  placeholder="User ID (Required)" 
                  />
                <Input 
                  id="fname" 
                  type="text" 
                  name="fname"  
                  ref={fnameInput}  
                  placeholder="First Name (Required)"  
                  />
                <Input  
                  id="lname"
                  type="text" 
                  name="lname"  
                  ref={lnameInput} 
                  placeholder="Last Name (Required)" 
                  />
            </FieldSet>
            <Submit onClick={submitUser} type = "submit"/>
          </form>
        </Article>
      </ModalContent>
   </ModalMain>
  );
};

export default AddUser;