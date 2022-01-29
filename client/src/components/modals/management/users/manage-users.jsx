import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";
import NoData from "../no-data/no-data.component";

import { 
  toggleManageUsersModal, 
  toggleAddUser 
} from "../../../../redux/modal/modal.actions";

import ManageUsersTable from "../../../tables/users/users";
import AddUser from "./add-user";

import AddButton from '../../../../images/add_btn.svg';

import {
  ModalMain,
  AddButtonContainer,
  UsersModalTable,
  CloseButton,
  HeaderContainer,
  Header,
  TableContainer,
} from "../../modal.styles";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const ManageUsersModal = () => {
  const dispatch = useDispatch();

  const allUsers = useSelector(state => state.dropDownOptions.userDropDown);

  const modalState = useSelector(state => state.modalState);
  const { seenAddUser } = modalState;

  const memberId = useSelector(state => state.memberState.memberId);
  
  return (
    <ModalMain>
      <UsersModalTable>  
        <CloseButton onClick={() => dispatch(toggleManageUsersModal())}>&times;</CloseButton>
        <HeaderContainer>
          <Header>
            Manage Users
          </Header>
          <AddButtonContainer onClick={() => dispatch(toggleAddUser())}>
            <span>Add New</span>
            <img 
              src={AddButton} 
              alt={`Add new user`} 
              title='Add User'
            />
          </AddButtonContainer>
        </HeaderContainer>
        <TableContainer>
          {allUsers ? (
              <ManageUsersTable 
                users={allUsers} 
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
          { allUsers.length === 0 &&
              <NoData>
                No users, click "Add New" to get started.
              </NoData>
            }
        </TableContainer>
      </UsersModalTable>
      { seenAddUser && <AddUser/> }
    </ModalMain>
  );
};

export default ManageUsersModal;


