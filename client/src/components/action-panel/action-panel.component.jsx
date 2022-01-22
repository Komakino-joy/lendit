import React from 'react'
import { useDispatch, useSelector } from "react-redux";

import { 
    toggleAvailableUnits, 
    toggleUnitsInUse, 
    toggleQuarantinedUnits, 
    toggleActvityTracking, 
    toggleMultipleUnitsInUse ,
    toggleEmailDistroReport,
    toggleManageUsersModal,
    toggleManageAssetsModal,
} from "../../redux/modal/modal.actions";


import { 
    ActionPanelContainer, 
    ActionPanelInnerContainer,
    ActionHeader ,ReportLink 
} from "./action-panel.styles";

const ReportsContainer = () => {
    const dispatch = useDispatch();
    const assetBreakdown = useSelector(state => state.dropDownOptions.assetBreakdown);

    return (
        <ActionPanelContainer>
            <ActionHeader>ACTION PANEL</ActionHeader>
            <ActionPanelInnerContainer>
            {
                assetBreakdown &&
                <>
                <ReportLink onClick={() => dispatch(toggleUnitsInUse())}>ASSETS IN USE <span>{assetBreakdown.assetsInUse}</span> </ReportLink>
                <ReportLink onClick={() => dispatch(toggleAvailableUnits())}>AVAILABLE ASSETS <span>{assetBreakdown.availableAssets}</span></ReportLink>
                <ReportLink onClick={() => dispatch(toggleQuarantinedUnits())}>QUARANTINED ASSETS <span>{assetBreakdown.quarantineAssets}</span></ReportLink>
                </>
            }
            <ReportLink onClick={() => dispatch(toggleMultipleUnitsInUse())}>MULTIPLE ASSETS BY USER</ReportLink>
            <ReportLink onClick={() => dispatch(toggleActvityTracking())}>ACTIVITY TRACKING </ReportLink>
            <ReportLink onClick={() => dispatch(toggleManageUsersModal())}>MANAGE USERS</ReportLink>
            <ReportLink onClick={() => dispatch(toggleManageAssetsModal())}>MANAGE ASSETS</ReportLink>
            <ReportLink onClick={() => dispatch(toggleEmailDistroReport())}>MANAGE EMAIL DISTRIBUTION </ReportLink>
            </ActionPanelInnerContainer>
        </ActionPanelContainer>
    )
}

export default ReportsContainer;
