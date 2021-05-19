import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { 
  checkInSelectedAssetStart, 
  checkOutSelectedAssetStart, 
  quarantineSelectedAssetStart 
} from "../../redux/asset/asset.actions";

import { userId } from "../../redux/user/user.selectors";
import { currentMemberId } from "../../redux/site-member/site-member.selectors.js";
import { assetId, assetName, assetSerial, assetImage, assetComments, assetStatus, assetModel } from "../../redux/asset/asset.selectors";

import { useAlert } from "react-alert";
import { confirmAlert } from "react-confirm-alert";

import { removeAsset } from "../../services/api";

import defaultImg from "../../images/default.svg";
import CustomButton from "../custom-button/custom-button.component";

import {
  AssetContainer, AssetInnerContainer, Header, AssetName, AssetSerial, RemoveButton,
  ImageContainer, AssetImage, AssetStatus, ButtonContainer, Footer, Instructions, ReasonBox,
} from "./asset-container.styles.jsx";

import "react-confirm-alert/src/react-confirm-alert.css";

const Center = ({assetId, assetName, assetSerial, assetImage, assetStatus, checkInSelectedAssetStart,
  checkOutSelectedAssetStart, quarantineSelectedAssetStart, userId, assetComments, ownerId, assetModel}) => {

  const alert = useAlert();

  // Prevents the user from dragging the asset image.
  const preventDragHandler = (event) => {
    event.preventDefault();
  };

  const onReasonChange = (event) => {
    assetComments = event.target.value;
  };


  const handleCheckout = () => {

    if (assetStatus.slice(0, 9) === "In Use By") {
      alert.show(`${assetName} is ${assetStatus}`, { type: "info" });
    } else if (!userId) {
      alert.show(`Username is required for checkout`, { type: "info" });
      document.getElementById("user-list").focus();
    } else {
      checkOutSelectedAssetStart({ assetId, userId, ownerId, assetName, assetSerial, assetModel });
      document.getElementById("asset-list").focus();
    }
  };

  const handleCheckin = () => {
    if (assetStatus !== "Available"){
      checkInSelectedAssetStart({ assetId, userId, ownerId, assetName, assetSerial, assetModel });
    }else{
      alert.show(`${assetName} is already checked in.`, { type: "info" });
    } 
  };

  const handleQuarantine = () => {
    if (assetStatus === "Quarantine") {
      alert.show(`${assetName} is already in quarantine.`, { type: "info" });
    } else if (!assetComments) {
      alert.show(`Reason is required to check ${assetName} into quarantine.`, {
        type: "info",
      });
      document.getElementById("text-area").focus();
    } else if (!userId) {
      alert.show(`Username is required for quarantine`, { type: "info" });
      document.getElementById("user-list").focus();
    } else {
      quarantineSelectedAssetStart({assetId, userId, ownerId, assetName, assetSerial, assetModel, assetComments});
      document.getElementById("text-area").value = "";
    }
  };
  

  const handleRemoveAsset = () => {
    confirmAlert({
      title: "Confirm Delete",
      message: `Are you sure to delete ${assetName.toUpperCase()} ?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            removeAsset(assetId);
            alert.show(`${assetName} has been removed.`, { type: "success" });
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
          
          <Header>
            <AssetName>{assetName.toUpperCase()}</AssetName>
            <AssetSerial>{assetSerial.toUpperCase()}</AssetSerial>
          </Header>

          <ImageContainer>
            <RemoveButton onClick={handleRemoveAsset}> REMOVE ASSET </RemoveButton>
            <AssetImage src={assetImage} alt="" onDragStart={preventDragHandler}/>
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
            <CustomButton
              isCheckIn
              onClick={handleCheckin}
            >
              CHECK IN
            </CustomButton>
            <CustomButton isCheckOut onClick={handleCheckout}> CHECK OUT </CustomButton>
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
            <AssetImage src={defaultImg} alt="" onDragStart={preventDragHandler}/>
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

const mapStateToProps = createStructuredSelector({
  ownerId: currentMemberId,
  userId,
  assetId,
  assetName,
  assetImage,
  assetStatus,
  assetSerial,
  assetComments,
  assetModel,
});

const mapDispatchToProps = (dispatch) => ({
  checkInSelectedAssetStart: (assetData) => {dispatch(checkInSelectedAssetStart({...assetData}));},
  checkOutSelectedAssetStart: (assetData) => {dispatch(checkOutSelectedAssetStart({...assetData}));},
  quarantineSelectedAssetStart: (assetData) => {dispatch(quarantineSelectedAssetStart({...assetData}));},
});

export default connect(mapStateToProps, mapDispatchToProps)(Center);
