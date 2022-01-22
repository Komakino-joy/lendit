import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ActivityReport from "./activity-report";
import { toggleActvityTracking, toggleActvityReport } from "../../../../redux/modal/modal.actions";

import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

import CustomSelect from "../../../custom-select/custom-select.component";

import { ModalMain, ModalContent, CloseButton, Header, Article,
  FieldSet, Label, Submit, ModalDate
} from "../../modal.styles";

import "react-datepicker/dist/react-datepicker.css";

const ActivityTracking = () =>{
  const dispatch = useDispatch();

  const dropDownOptions = useSelector(state => state.dropDownOptions);
  const { assetDropDown , userDropDown} = dropDownOptions

  const seenActivityReport = useSelector(state => state.modalState.seenActivityReport);

  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), 24)
  );
  const [endDate, setEndDate] = useState(
    setHours(setMinutes(new Date(), 0), 24)
  );

  const filterPassedTime = time => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  }

  const [assetID, setAssetID] = useState('%');
  const [userID, setUserID] = useState('%');


  const onAssetIDChange = (event) => {
    if (event.value === "") {
      return setAssetID('%');
    }
    setAssetID(event.value);
  };

  const onUserIDChange = (event) => {
    if (event.value === "") {
      return setUserID('%');
    }
    setUserID(event.value);
  };

  const handleOnClose = (e) => {
    e.preventDefault()
    dispatch(toggleActvityTracking());
  }

  const handleSubmit = (e) => {    
    e.preventDefault()
    dispatch(toggleActvityReport());
  }
  

  const captionStyles = {fontSize: '12px', fontFamily: 'Verdana', color:'grey'}

  return (
   <ModalMain>
      <ModalContent>
        {/* Retrieve updated list of users when modal is closed. */}
        <CloseButton onClick={handleOnClose}>&times;</CloseButton>
        <Header>Activity Tracking</Header>
        <Article>
          <div action="activity-tracking" method="get" acceptCharset="utf-8">
            <FieldSet id="activity-tracking">
                <Label htmlFor="start-date">Start Date <span style={captionStyles}>(required)</span></Label>
                <ModalDate 
                  selected={startDate} 
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  showTimeInput
                  filterTime={filterPassedTime}
                  onChange={date => setStartDate(date)} 
                  fixedHeight
                />
                <Label htmlFor="end-date">End Date <span style={captionStyles}>(required)</span></Label>
                <ModalDate
                  selected={endDate}       
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  showTimeInput 
                  onChange={date => setEndDate(date)} 
                  fixedHeight
                />
                <Label htmlFor="asset-id">Asset Name <span style={captionStyles}>(optional)</span></Label>
                <CustomSelect 
                    data={assetDropDown} 
                    id="asset-id" 
                    onChange={onAssetIDChange} 
                />
                <Label htmlFor="user-id">User ID <span style={captionStyles}>(optional)</span></Label>
                <CustomSelect 
                    data={userDropDown} 
                    id="user-id"
                    onChange={onUserIDChange} 
                />
            </FieldSet>
            <Submit onClick={handleSubmit} type = "submit" defaultValue="Submit"/>
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

export default ActivityTracking;