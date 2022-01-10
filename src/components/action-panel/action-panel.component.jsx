import React from 'react'
import { useDispatch } from "react-redux";

import { toggleAvailableUnits, toggleUnitsInUse, toggleQuarantinedUnits, 
    toggleAddUser, toggleAddUnit, toggleActvityTracking, toggleMultipleUnitsInUse 
    } from "../../redux/modal/modal.actions";

import { 
    ActionPanelContainer, 
    ActionPanelInnerContainer,
    ActionHeader ,ReportLink 
} from "./action-panel.styles";

const ReportsContainer = () => {
    const dispatch = useDispatch()
    
    return (
        <ActionPanelContainer>
            <ActionHeader>ACTION PANEL</ActionHeader>
            <ActionPanelInnerContainer>
                <ReportLink onClick={() => dispatch(toggleAddUser())}>ADD USER</ReportLink>
                <ReportLink onClick={() => dispatch(toggleAddUnit())}>ADD ASSET</ReportLink>
                <ReportLink onClick={() => dispatch(toggleUnitsInUse())}>ASSETS IN USE</ReportLink>
                <ReportLink onClick={() => dispatch(toggleMultipleUnitsInUse())}>MULTIPLE ASSETS BY USER</ReportLink>
                <ReportLink onClick={() => dispatch(toggleAvailableUnits())}>AVAILABLE ASSETS</ReportLink>
                <ReportLink onClick={() => dispatch(toggleQuarantinedUnits())}>QUARANTINED ASSETS</ReportLink>
                <ReportLink onClick={() => dispatch(toggleActvityTracking())}>ACTIVITY TRACKING </ReportLink>
            </ActionPanelInnerContainer>
        </ActionPanelContainer>
    )
}

export default ReportsContainer;
