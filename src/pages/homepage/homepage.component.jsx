import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { 
    seenAvailableAssets, 
    seenAssetsInUse, 
    seenQuarantinedAssets, 
    seenAddUser, 
    seenAddAsset, 
    seenActivityParameters 
} from "../../redux/modal/modal.selectors";

import Center from '../../components/asset-container/asset-container.component';
import AddUnit from '../../components/modals/add-asset.modal';
import AddUser from '../../components/modals/add-user.modal';
import UnitsInUse from '../../components/modals/assets-in-use.modal';
import ActionPanel from '../../components/action-panel/action-panel.component';
import AvailableUnits from '../../components/modals/available-assets.modal';
import ScanboxContainer from '../../components/drop-down-container/drop-down-container.component'
import QuarantinedUnits from '../../components/modals/quarantined-assets.modal';
import ActivityTracking from '../../components/modals/activity-tracking.modal';

import { HomepageContainer } from "./homepage.styles";

const HomePage = ({
    seenAvailableAssets, 
    seenAssetsInUse, 
    seenQuarantinedAssets, 
    seenAddUser, 
    seenAddAsset, 
    seenActivityParameters
    }) => {

    return (
        <HomepageContainer>
            <ScanboxContainer/>
            <Center/>
            <ActionPanel    />
            {/* Toggle the Action Panel Modals */}
            {seenAddUser ? <AddUser/> : null}
            {seenAddAsset ? <AddUnit/> : null}
            {seenAssetsInUse ? <UnitsInUse/> : null}
            {seenAvailableAssets ? <AvailableUnits/> : null}
            {seenQuarantinedAssets ? <QuarantinedUnits/> : null}
            {seenActivityParameters ? <ActivityTracking/> : null}
        </HomepageContainer>
    );
};

const mapStateToProps = createStructuredSelector({
    seenAvailableAssets,
    seenAssetsInUse,
    seenQuarantinedAssets,
    seenAddUser,
    seenAddAsset,
    seenActivityParameters
})

export default connect(mapStateToProps)(HomePage);