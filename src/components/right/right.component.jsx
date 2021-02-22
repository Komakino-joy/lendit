import React from 'react'
import { connect } from "react-redux";

import { toggleAvailableUnits, toggleUnitsInUse, toggleQuarantinedUnits, 
    toggleAddUser, toggleAddUnit, toggleActvityTracking } from "../../redux/modal/modal.actions";

import { RightContainer, RightInnerContainer,ActionHeader ,ReportLink } from "./right.styles";

const ReportsContainer = ({ toggleAvailableUnits, toggleUnitsInUse, toggleQuarantinedUnits, toggleAddUser, toggleAddUnit, toggleActvityTracking }) => {
    return (
        <RightContainer>
            <ActionHeader>ACTION PANEL</ActionHeader>
            <RightInnerContainer>
                <ReportLink onClick={toggleAddUser}          >ADD USER</ReportLink>
                <ReportLink onClick={toggleAddUnit}          >ADD ASSET</ReportLink>
                <ReportLink onClick={toggleUnitsInUse}       >ASSETS IN USE</ReportLink>
                <ReportLink onClick={toggleAvailableUnits}   >AVAILABLE ASSETS</ReportLink>
                <ReportLink onClick={toggleQuarantinedUnits} >QUARANTINED ASSETS</ReportLink>
                <ReportLink onClick={toggleActvityTracking} >ACTIVITY TRACKING </ReportLink>
            </RightInnerContainer>
        </RightContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    toggleAvailableUnits  : () => dispatch(toggleAvailableUnits()),
    toggleQuarantinedUnits: () => dispatch(toggleQuarantinedUnits()),
    toggleUnitsInUse      : () => dispatch(toggleUnitsInUse()),
    toggleAddUser         : () => dispatch(toggleAddUser()),
    toggleAddUnit         : () => dispatch(toggleAddUnit()),
    toggleActvityTracking : () => dispatch(toggleActvityTracking())
  });

export default connect(null, mapDispatchToProps)(ReportsContainer);
