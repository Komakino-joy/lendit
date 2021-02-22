import React            from 'react';
import { connect }      from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { seenAvailableAssets, seenAssetsInUse, seenQuarantinedAssets, seenAddUser, seenAddAsset, seenActivityParameters } from "../../redux/modal/modal.selectors";
import Center           from '../../components/center/center.component';
import ScanboxContainer from '../../components/left/left.component'
import ReportsContainer from '../../components/right/right.component';
import AvailableUnits   from '../../components/modals/available-assets.modal';
import QuarantinedUnits from '../../components/modals/quarantined-assets.modal';
import ActivityTracking from '../../components/modals/activity-tracking.modal';
import UnitsInUse       from '../../components/modals/assets-in-use.modal';
import AddUser          from '../../components/modals/add-user.modal';
import AddUnit          from '../../components/modals/add-asset.modal';

import { HomepageContainer } from "./homepage.styles";

const HomePage = ({seenAvailableAssets, seenAssetsInUse, seenQuarantinedAssets, seenAddUser, seenAddAsset, seenActivityParameters}) => {

    return (
        <HomepageContainer>
            <ScanboxContainer/>
            <Center/>
            <ReportsContainer/>
            {/* Toggle the Action Panel Modals */}
            {seenAvailableAssets    ? <AvailableUnits/>   : null}
            {seenAssetsInUse        ? <UnitsInUse/>       : null}
            {seenQuarantinedAssets  ? <QuarantinedUnits/> : null}
            {seenAddUser            ? <AddUser/>          : null}
            {seenAddAsset           ? <AddUnit/>          : null}
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