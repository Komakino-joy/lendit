import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { toggleManageAssetsModal, toggleAddUnit } from "../../../../redux/modal/modal.actions";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import ManageAssetsTable from "../../../tables/assets/assets";

import AddBtn from '../../../../images/add_btn.svg';

import {
  ModalMain,
  AddButtonContainer,
  AssetsModalTable,
  CloseButton,
  HeaderContainer,
  Header,
  TableContainer,
} from "../../modal.styles";

import AddAsset from './add-asset';

const ManageAssetsModal = () => {
  const dispatch = useDispatch();

  const allAssets = useSelector(state => state.dropDownOptions.assetDropDown);

  const modalState = useSelector(state => state.modalState);
  const { seenAddAsset } = modalState;

  const memberId = useSelector(state => state.memberState.memberId);

  return (
    <ModalMain>
      <AssetsModalTable>  
        <CloseButton onClick={() => dispatch(toggleManageAssetsModal())}>&times;</CloseButton>
        <HeaderContainer>
          <Header>
            Manage Assets
            </Header>
            <AddButtonContainer onClick={() => dispatch(toggleAddUnit())} >
              <span>Add New</span>
              <img 
                src={AddBtn} 
                alt={`Add new asset`} 
                title='Add Asset'
              />
            </AddButtonContainer>
        </HeaderContainer>
        <TableContainer>
          {allAssets ? (
              <ManageAssetsTable 
                assets={allAssets} 
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
      </AssetsModalTable>
      { seenAddAsset && <AddAsset /> }
    </ModalMain>
  );
};

export default ManageAssetsModal;


