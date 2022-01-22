import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toggleEmailDistroReport, fetchEmailDistroStart, toggleAddEmailToDistro } from "../../../../redux/modal/modal.actions";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import EmailDistroTable from "../../../tables/email-distro/email-distro";
import AddEmailToDistro from './add-email-to-distro';

import AddBtn from '../../../../images/add_btn.svg';

import {
  ModalMain,
  AddButtonContainer,
  ModalTable,
  CloseButton,
  HeaderContainer,
  Header,
  TableContainer,
} from "../../modal.styles";

const ManageEmailDistro = () => {
  const dispatch = useDispatch();
  const modalState = useSelector(state => state.modalState);
  const { seenAddEmailToDistro, emailDistro } = modalState;

  const memberId = useSelector(state => state.memberState.memberId);

  useEffect(() => {
    dispatch(fetchEmailDistroStart({ memberId }))
  }, [dispatch, memberId])

  return (
    <ModalMain>
      <ModalTable>  
      <CloseButton onClick={() => dispatch(toggleEmailDistroReport())}>&times;</CloseButton>
      <HeaderContainer>
          <Header>
            Emails
          </Header>
          <AddButtonContainer onClick={() => dispatch(toggleAddEmailToDistro())} >
            <span>Add New</span>
            <img 
              src={AddBtn} 
              alt={`Add new email`} 
              title='Add email'
            />
          </AddButtonContainer>
        </HeaderContainer>
        <TableContainer>
          {emailDistro ? (
              <EmailDistroTable 
                emails={emailDistro} 
                memberId={memberId} 
              />
          ) : (
            <Loader
              type="Puff"
              color="#4178BE"
              height={70}
              width={70}
              className="loader"
              style={{ position: "absolute", top: "20%", left: "50%", margin: "-25px 0 0 -25px" }}
            />
          )}
        </TableContainer>
      </ModalTable>
      { seenAddEmailToDistro && <AddEmailToDistro/> }
    </ModalMain>
  );
};


export default ManageEmailDistro;


