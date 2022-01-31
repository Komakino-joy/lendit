import React, { useEffect } from "react";
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from "react-redux";

import { 
  checkInSelectedAssetStart,
  checkOutSelectedAssetStart,
  quarantineSelectedAssetStart,
  removeSelectedAssetStart
} from "../../redux/asset/asset.actions";

import { socketUpdateAssetBreakdown } from "../../redux/drop-downs/drop-down.actions";

import { confirmAlert } from "react-confirm-alert";

import defaultImg from "../../images/default.svg";
import CustomButton from "../custom-button/custom-button.component";

import {
  AssetContainer, AssetInnerContainer, Header, AssetName, AssetSerial, RemoveButton,
  ImageContainer, AssetStatus, ButtonContainer, Footer, Instructions, ReasonBox,
} from "./asset-container.styles.jsx";

import "react-confirm-alert/src/react-confirm-alert.css";

const Center = ({ socket }) => {
  const dispatch = useDispatch();
  const assetInfo = useSelector(state => state.dropDownOptions.selectedAsset);
  const memberInfo = useSelector(state => state.memberState);
  const userInfo = useSelector(state => state.dropDownOptions.selectedUser);
  const { id: userId, fname, lname } = userInfo;
  const { memberId } = memberInfo;

  useEffect(() => {
    socket.on("asset-transaction-response", (assetBreakdown) => {
      if(assetBreakdown.memberId === memberInfo.memberId) {
        dispatch(socketUpdateAssetBreakdown(assetBreakdown));
      }
    });
  return () => {
    socket.close();
  };
  }, [dispatch, socket]);

  let {   
    id: assetId,
    name: assetName,
    image: assetImage,
    status: assetStatus,
    serial: assetSerial,
    comments: assetComments,
    model: assetModel
  } = assetInfo;

  const preventDragHandler = (event) => {
    event.preventDefault();
  };

  const onReasonChange = (event) => {
    assetComments = event.target.value;
  };

  const handleCheckout = () => {
    if (assetStatus.slice(0, 9) === "In Use By") {
      toast.error(`${assetName} is Already ${assetStatus}`, {
        id: 'asset-in-use',
      });
    } else if (!userId) {
      toast.error(`Username is required for checkout`, {
        id: 'asset-check-out-no-user',
      });
      document.getElementById("user-list").focus();
    } else {
      dispatch(checkOutSelectedAssetStart({ assetId, userId, memberId, assetName, assetSerial, assetModel, fname, lname, socket }));
      document.getElementById("asset-list").focus();
    }
  };

  const handleCheckin = () => {
    if (assetStatus !== "Available"){
      dispatch(checkInSelectedAssetStart({ assetId, userId, memberId, assetName, assetSerial, assetModel, socket }));
    }else{
      toast.error(`${assetName} is already checked in.`, {
        id: 'asset-checked-in',
      });
    } 
  };

  const handleQuarantine = () => {
    if (assetStatus === "Quarantine") {
      toast.error(`${assetName} is already in quarantine.`, {
        id: 'asset-already-quarantined',
      });
      return;
    } 
    
    if (!assetComments) {
      toast.error(`Reason is required to check ${assetName} into quarantine.`, {
        id: 'quarantine-reason-required',
      });
      document.getElementById("text-area").focus();
      return;
    } 

    if (!userId) {
      toast.error(`Username is required for quarantine`, {
        id: 'quarantine-asset-no-user',
      });
      document.getElementById("user-list").focus();
      return;
    } 

    dispatch(quarantineSelectedAssetStart({assetId, userId, memberId, assetName, assetSerial, assetModel, assetComments, socket}));

    document.getElementById("text-area").value = "";
    return;
  };
  

  const handleRemoveAsset = () => {
    const responseAlert = (message, type) => toast[type](message, {
      id: 'add-user',
    });

    confirmAlert({
      title: "Confirm Delete",
      message: `Are you sure to delete ${assetName.toUpperCase()} ?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(removeSelectedAssetStart({assetId, memberId, responseAlert}));
      
          },
        },
        {
          label: "No",
          onClick: () => alert.show("Operation Cancelled"),
        },
      ],
    });
  };

  return (
    <AssetContainer>
      {assetId ? (
        <AssetInnerContainer>
\
          <Header>
            <AssetName>{assetId.toUpperCase()}</AssetName>
            <AssetSerial>{assetSerial.toUpperCase()}</AssetSerial>
          </Header>

          <ImageContainer>
            <RemoveButton onClick={handleRemoveAsset}> DELETE ASSET </RemoveButton>
            <img 
              style= {{height: '100%'}}
              src={assetImage} 
              alt="model" 
              onDragStart={preventDragHandler}
              />
          </ImageContainer>

          <AssetStatus
            {...(assetStatus === "Available"
              ? { isAvailable: true }
              : assetStatus.slice(0, 9) === "In Use By"
              ? { isInUse: true }
              : { isQurantined: true })}
          >
            {assetStatus.toUpperCase()}
          </AssetStatus>

          <ButtonContainer>
            <CustomButton isCheckOut onClick={handleCheckout}> CHECK OUT </CustomButton>
            <CustomButton isCheckIn onClick={handleCheckin}> CHECK IN </CustomButton>
          </ButtonContainer>

          <Footer>
            <Instructions> If there are issues with the asset, please fill out the form below and submit </Instructions>
            <ReasonBox id="text-area" onChange={onReasonChange} placeholder={assetComments}/>
            <CustomButton isSubmit onClick={handleQuarantine}> SUBMIT </CustomButton>
          </Footer>
          
        </AssetInnerContainer>
      ) : (
        <AssetInnerContainer>
          <Header>
            <AssetName>Asset Name</AssetName>
            <AssetSerial>Asset Serial</AssetSerial>
          </Header>

          <ImageContainer>
            <img src={defaultImg} alt="default" onDragStart={preventDragHandler}/>
          </ImageContainer>
          <AssetStatus>Asset Status</AssetStatus>
          <ButtonContainer>
            <CustomButton isCheckIn>CHECK IN</CustomButton>
            <CustomButton isCheckOut>CHECK OUT</CustomButton>
          </ButtonContainer>

          <Footer>
          <Instructions> If there are issues with the asset, please fill out the form and submit </Instructions>
            <ReasonBox id="text-area" />
            <CustomButton isSubmit>SUBMIT</CustomButton>
            
          </Footer>
        </AssetInnerContainer>
      )}
    </AssetContainer>
  );
};

export default Center;
