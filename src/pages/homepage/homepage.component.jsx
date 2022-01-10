import React from 'react';
import { useSelector } from 'react-redux';

import Center from '../../components/asset-container/asset-container.component';
import AddUnit from '../../components/modals/add-asset.modal';
import AddUser from '../../components/modals/add-user.modal';
import UnitsInUse from '../../components/modals/assets-in-use.modal';
import MultipleAssetsInUse from '../../components/modals/multiple-assets-checked-out';
import ActionPanel from '../../components/action-panel/action-panel.component';
import AvailableUnits from '../../components/modals/available-assets.modal';
import ScanboxContainer from '../../components/drop-down-container/drop-down-container.component';
import QuarantinedUnits from '../../components/modals/quarantined-assets.modal';
import ActivityTracking from '../../components/modals/activity-tracking.modal';

import { HomepageContainer } from "./homepage.styles";

const HomePage = () => {
    const modalState = useSelector(state => state.modalState)

    const { 
        seenAvailableAssets, 
        seenAssetsInUse, 
        seenMultipleUnitsInUse,
        seenQuarantinedAssets, 
        seenAddUser, 
        seenAddAsset, 
        seenActivityParameters 
    } = modalState;
    return (
        <HomepageContainer>
            <ScanboxContainer/>
            <Center/>
            <ActionPanel    />
            {/* Toggle the Action Panel Modals */}
            {seenAddUser ? <AddUser/> : null}
            {seenAddAsset ? <AddUnit/> : null}
            {seenAssetsInUse ? <UnitsInUse/> : null}
            {seenMultipleUnitsInUse ? <MultipleAssetsInUse/> : null}
            {seenAvailableAssets ? <AvailableUnits/> : null}
            {seenQuarantinedAssets ? <QuarantinedUnits/> : null}
            {seenActivityParameters ? <ActivityTracking/> : null}
        </HomepageContainer>
    );
};


export default HomePage;