import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { handleMemberSignout } from '../../redux/site-member/site-member.actions';

import AssetContainer from '../../components/asset-container/asset-container.component';
import AssetsInUse from '../../components/modals/reporting/assets-in-use';
import MultipleAssetsByUser from '../../components/modals/reporting/multi-assets-by-user';
import ActionPanel from '../../components/action-panel/action-panel.component';
import AvailableAssets from '../../components/modals/reporting/available-assets';
import ScanboxContainer from '../../components/drop-down-container/drop-down-container.component';
import QuarantinedAssets from '../../components/modals/reporting/quarantined-assets';
import ActivityTracking from '../../components/modals/reporting/activity-tracking/activity-prompts';
import ManageEmailDistro from '../../components/modals/management/email-distro/email-distro';
import ManageUsersModal from '../../components/modals/management/users/manage-users';
import ManageAssetsModal from '../../components/modals/management/assets/manage-assets';

import { HomepageContainer } from "./homepage.styles";

const HomePage = () => {
    const dispatch = useDispatch();
    const memberId = useSelector(state => state.memberState.memberId);
    const modalState = useSelector(state => state.modalState);

    useEffect(() => {
        if (!memberId) {
            dispatch(handleMemberSignout());
        }
    }, [dispatch, memberId])

    const { 
        seenAvailableAssets, 
        seenAssetsInUse, 
        seenMultipleUnitsInUse,
        seenQuarantinedAssets, 
        seenActivityParameters ,
        seenEmailDistroReport,
        seenManageUsersModal,
        seenManageAssetsModal,
    } = modalState;
    return (
        <HomepageContainer>
            <ScanboxContainer/>
            <AssetContainer/>
            <ActionPanel    />
            {/* Toggle the Action Panel Modals */}
            {seenAssetsInUse && <AssetsInUse/> }
            {seenMultipleUnitsInUse && <MultipleAssetsByUser/> }
            {seenAvailableAssets && <AvailableAssets/> }
            {seenQuarantinedAssets && <QuarantinedAssets/> }
            {seenActivityParameters && <ActivityTracking/> }
            {seenEmailDistroReport && <ManageEmailDistro/> }
            {seenManageUsersModal && <ManageUsersModal/> }
            {seenManageAssetsModal && <ManageAssetsModal/>}
        </HomepageContainer>
    );
};


export default HomePage;