import React, {useEffect}  from 'react'
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';

import { currentMemberId } from "../../redux/site-member/site-member.selectors";
import { requestSelectedUserData } from "../../redux/user/user.actions";
import { requestUserDropDownOptions } from '../../redux/drop-downs/drop-down.actions'
import { selectUsers } from "../../redux/drop-downs/drop-down.selectors";
import { requestSelectedAssetData } from "../../redux/asset/asset.actions";
import { requestAssetDropDownOptions } from '../../redux/drop-downs/drop-down.actions'
import { selectAssets } from "../../redux/drop-downs/drop-down.selectors";

import  selectedListItemID  from "../custom-drop-down/drop-down.utils";

import CustomDropDown from '../custom-drop-down/custom-drop-down.component';
import {DropDownContainer, DropDownInner, Tag } from "./drop-down-container.styles";


const ScanboxContainer = ({ memberId, assets, users, getAssetOptions, getAssetDetails, getUserOptions, getUserDetails}) => {
    
    useEffect(() => {
        // Get Data from /allunits.
        getAssetOptions(memberId)
      }, [getAssetOptions, memberId]); //

      useEffect(() => {
        // Get Data from /allusers when component mounts.
        getUserOptions(memberId)
      }, [getUserOptions, memberId]);  

    return (
        <DropDownContainer>
            <DropDownInner>
                <Tag>ASSET ID</Tag>
                <CustomDropDown isHomePage  onChange={() => getAssetDetails(selectedListItemID('asset-list'), memberId)} id="asset-list" optionList={assets}/> 
                <Tag>USER ID</Tag>
                <CustomDropDown isHomePage onChange={getUserDetails} id="user-list" optionList={users}/> 
            </DropDownInner>
        </DropDownContainer>
    )}



const mapStateToProps = createStructuredSelector({
    memberId: currentMemberId,
    assets: selectAssets,
    users: selectUsers
})

const mapDispatchToProps = (dispatch) => ({
    getAssetDetails: (assetId, ownerId) => { dispatch(requestSelectedAssetData({assetId, ownerId}))},
    getAssetOptions: (memberId) => { dispatch(requestAssetDropDownOptions(memberId))},
    getUserOptions: (memberId) => { dispatch( requestUserDropDownOptions(memberId)) },
    getUserDetails: () => { dispatch( requestSelectedUserData ( selectedListItemID('user-list') ) )},
})


export default connect(mapStateToProps, mapDispatchToProps)(ScanboxContainer);