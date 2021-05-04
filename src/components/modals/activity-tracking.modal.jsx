import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';

import { currentMemberId } from "../../redux/site-member/site-member.selectors";
import { selectAssets } from "../../redux/drop-downs/drop-down.selectors";
import { selectUsers } from "../../redux/drop-downs/drop-down.selectors";
import { seenActivityReport } from "../../redux/modal/modal.selectors";
import ActivityReport from "./activity-report.modal";
import { toggleActvityTracking, toggleActvityReport } from "../../redux/modal/modal.actions";

import CustomDropDown from '../custom-drop-down/custom-drop-down.component';

import { ModalMain, ModalContent, CloseButton, Header, Article,
  FieldSet, Label, ActivitySubmit, ModalDate
} from "./modal.styles";

import "react-datepicker/dist/react-datepicker.css";

const ActivityTracking = ( {toggleActvityTracking, toggleActvityReport, assets, users, seenActivityReport} ) =>{

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [assetID, setAssetID] = useState('%');
  const [userID, setUserID] = useState('%');


  const onAssetIDChange = (event) => {
    setAssetID(event.target.value);
  };

  const onUserIDChange = (event) => {
    setUserID(event.target.value);
  };

  return (
   <ModalMain>
     
      <ModalContent>
        {/* Retrieve updated list of users when modal is closed. */}
        <CloseButton onClick={toggleActvityTracking}>&times;</CloseButton>
        <Header>Activity Tracking</Header>
        <Article>
          <div action="sign-up_submit" method="get" acceptCharset="utf-8">
            <FieldSet id="sign_up">
                <Label htmlFor="email-address">Start Date</Label>
                <ModalDate 
                  selected={startDate} 
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  showTimeInput
                  onChange={date => setStartDate(date)} 
                />
                <Label htmlFor="email-address">End Date</Label>
                <ModalDate
                  selected={endDate}       
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  showTimeInput 
                  onChange={date => setEndDate(date)} 
                />
                <Label htmlFor="asset-id">Asset ID</Label>
                <CustomDropDown isActivitySelection onChange={onAssetIDChange} type="text" name="asset-id"  id="asset-id" optionList={assets}/>
                <Label htmlFor="user-id">User ID</Label>
                <CustomDropDown isActivitySelection onChange={onUserIDChange} type="text" name="user-id"  id="user-id" optionList={users}/>
            </FieldSet>
            <ActivitySubmit onClick={toggleActvityReport} type = "submit" defaultValue="Submit"/>
          </div>
        </Article>
      </ModalContent>
      {
        seenActivityReport ? 
        <ActivityReport  
          startDate={startDate.getTime()} 
          endDate={endDate.getTime()}
          assetID={assetID}
          userID={userID} 
          /> 
        : null
      }
   </ModalMain>
  );
};

const mapStateToProps = createStructuredSelector({
  memberId: currentMemberId,
  assets: selectAssets,
  users: selectUsers,
  seenActivityReport
})

const mapDispatchToProps = (dispatch) => ({
  toggleActvityTracking : () => dispatch(toggleActvityTracking()),
  toggleActvityReport : () => dispatch(toggleActvityReport())
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityTracking);