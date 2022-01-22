import React, { useRef } from "react";
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from "react-redux";

import { 
  toggleAddEmailToDistro, 
  addEmailToDistroStart 
} from "../../../../redux/modal/modal.actions";

import {
  ModalMain,
  ModalContent,
  CloseButton,
  Header,
  Article,
  FieldSet,
  ModalInput,
  Submit,
} from "../../modal.styles";

const AddEmailToDistro = () => {
  const dispatch = useDispatch();

  const memberId = useSelector(state => state.memberState.memberId);
  const emailInput = useRef(null);

  const inputReset = () => {
    emailInput.current.value = null
    emailInput.current.focus();
  };
  
  const fedexEmailRe = /^[A-Za-z0-9._%+-]+@fedex.com$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = emailInput.current.value.toLowerCase();

    if(!email)  {
      emailInput.current.focus();
      return toast.error(`Email is required.`);
    }

    let isFedexEmail = email.match(fedexEmailRe)
    
    if (!isFedexEmail) {
      return toast.error(`Email must be a FedEx email`);
    }
      
      const responseAlert = (message, type) => toast[type](message, {
        id: 'add-email',
      });
  
      dispatch(addEmailToDistroStart({ memberId, email, responseAlert, inputReset}));
    };
    
  const handleOnClose = () => {
    dispatch(toggleAddEmailToDistro())
  };

  return (
    <ModalMain>
      <ModalContent>
        {/* Retrieve updated list of models when modal is closed. */}
        <CloseButton
          onClick={handleOnClose}
        >
          &times;
        </CloseButton>

        <Header>Add Email</Header>
        <Article>
          <div>
            <FieldSet>
              <form
                onSubmit={handleSubmit}
              >

              <ModalInput
                id="email"
                type="text"
                name="email"
                ref={emailInput}
                placeholder="Email (Required)"
              />

            <Submit
              type="Submit"
            />
              </form>
            </FieldSet>
          </div>
        </Article>
      </ModalContent>
    </ModalMain>
  );
};


export default AddEmailToDistro;
