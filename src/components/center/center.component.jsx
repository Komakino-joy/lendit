import React from "react";
import CustomButton from "../custom-button/custom-button.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  assetId,
  assetName,
  assetSerial,
  assetImage,
  assetComments,
  assetStatus,
  assetModel,
} from "../../redux/asset/asset.selectors";
import { currentMemberId } from "../../redux/site-member/site-member.selectors.js";
import { userId } from "../../redux/user/user.selectors";

import { useAlert } from "react-alert";
import { confirmAlert } from "react-confirm-alert";

import { assetTransaction } from "./center.utils";
import defaultImg from "../../images/default.png";

import {
  checkInSelectedAssetStart,
  requestSelectedAssetData,
  checkOutSelectedAssetStart,
  quarantineSelectedAssetStart,
} from "../../redux/asset/asset.actions";

import { removeAsset } from "../../services/api";

import {
  CenterPanelContainer,
  CenterPanelInnerContainer,
  Header,
  AssetName,
  AssetSerial,
  RemoveButton,
  ImageContainer,
  AssetImage,
  AssetStatus,
  ButtonContainer,
  Footer,
  Instructions,
  ReasonBox,
} from "./center.styles.jsx";
import "react-confirm-alert/src/react-confirm-alert.css";

const Center = ({
  assetId,
  assetName,
  assetSerial,
  assetImage,
  assetStatus,
  checkInAsset,
  getUpdatedStatus,
  checkOutAsset,
  quarantineAsset,
  userId,
  assetComments,
  ownerId,
  assetModel,
}) => {
  const alert = useAlert();

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
      assetTransaction(
        checkOutAsset,
        getUpdatedStatus,
        assetId,
        userId,
        ownerId,
        assetName,
        assetSerial,
        assetModel
      );
      document.getElementById("asset-list").focus();
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
      assetTransaction(
        quarantineAsset,
        getUpdatedStatus,
        assetId,
        userId,
        ownerId,
        assetName,
        assetSerial,
        assetModel,
        assetComments
      );
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
    <CenterPanelContainer>
      {assetId ? (
        <CenterPanelInnerContainer>
          <Header>
            <AssetName>{assetName.toUpperCase()}</AssetName>
            <AssetSerial>{assetSerial.toUpperCase()}</AssetSerial>
          </Header>

          <ImageContainer>
            <RemoveButton onClick={handleRemoveAsset}>
              REMOVE ASSET
            </RemoveButton>
            <AssetImage
              src={assetImage}
              alt=""
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
            <CustomButton
              isCheckIn
              onClick={() => {
                assetStatus !== "Available"
                  ? assetTransaction(
                      checkInAsset,
                      getUpdatedStatus,
                      assetId,
                      ownerId,
                      assetName,
                      assetSerial,
                      assetModel
                    )
                  : alert.show(`${assetName} is already checked in.`, {
                      type: "info",
                    });
              }}
            >
              CHECK IN
            </CustomButton>
            <CustomButton isCheckOut onClick={handleCheckout}>
              CHECK OUT
            </CustomButton>
          </ButtonContainer>

          <Footer>
            <Instructions>
              If there are issues with the asset, please fill out the form below
              and submit
            </Instructions>
            <ReasonBox
              id="text-area"
              onChange={onReasonChange}
              placeholder={assetComments}
            />
            <CustomButton isSubmit onClick={handleQuarantine}>
              SUBMIT
            </CustomButton>
          </Footer>
        </CenterPanelInnerContainer>
      ) : (
        <CenterPanelInnerContainer>
          <Header>
            <AssetName>Asset Name</AssetName>
            <AssetSerial>Asset Serial</AssetSerial>
          </Header>

          <ImageContainer>
            <AssetImage
              src={defaultImg}
              alt=""
              onDragStart={preventDragHandler}
            />
          </ImageContainer>
          <AssetStatus>Asset Status</AssetStatus>
          <ButtonContainer>
            <CustomButton isCheckIn>CHECK IN</CustomButton>
            <CustomButton isCheckOut>CHECK OUT</CustomButton>
          </ButtonContainer>

          <Footer>
            <Instructions>
              If there are issues with the asset, please fill out the form below
              and submit
            </Instructions>
            <ReasonBox id="text-area" />
            <CustomButton isSubmit>SUBMIT</CustomButton>
          </Footer>
        </CenterPanelInnerContainer>
      )}
    </CenterPanelContainer>
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
  checkInAsset: (assetId, ownerId, name, serial, model) => {
    dispatch(checkInSelectedAssetStart(assetId, ownerId, name, serial, model));
  },
  checkOutAsset: (assetId, userId, ownerId, name, serial, model) => {
    dispatch(
      checkOutSelectedAssetStart(assetId, userId, ownerId, name, serial, model)
    );
  },
  quarantineAsset: (assetId, userId, ownerId, name, serial, model, comment) => {
    dispatch(
      quarantineSelectedAssetStart(
        assetId,
        userId,
        ownerId,
        name,
        serial,
        model,
        comment
      )
    );
  },
  getUpdatedStatus: (assetId) => {
    dispatch(requestSelectedAssetData(assetId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Center);

//^ THE CODE BELOW IS USED TO LOAD FIRST ASSET WHEN RENDERING APP FOR FIRST TIME

// const [asset, setAsset] = useState(null);

// useEffect(() => {
//     const fetchAsset = async() => {
//         const response = await fetch(`https://lendit-api.herokuapp.com/defaultunit`)
//         const asset = await response.json()
//         setAsset(asset[0]);
//     }

//     fetchAsset();
// }, []);
