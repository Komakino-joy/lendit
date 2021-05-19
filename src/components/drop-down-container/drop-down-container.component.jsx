import React, {useEffect}  from 'react'
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';

import  selectedListItemID  from "../custom-drop-down/drop-down.utils";

import { requestSelectedUserData } from "../../redux/user/user.actions";
import { requestSelectedAssetData } from "../../redux/asset/asset.actions";

import { 
    requestAssetDropDownOptions, 
    requestUserDropDownOptions 
    } from '../../redux/drop-downs/drop-down.actions'

import { currentMemberId } from "../../redux/site-member/site-member.selectors";
import { selectUsers, selectAssets } from "../../redux/drop-downs/drop-down.selectors";

import CustomDropDown from '../custom-drop-down/custom-drop-down.component';
import {DropDownContainer, DropDownInner, Tag } from "./drop-down-container.styles";


const ScanboxContainer = ({ 
    memberId, assets, users, 
    requestAssetDropDownOptions, 
    requestUserDropDownOptions, 
    requestSelectedAssetData, 
    requestSelectedUserData}) => {
    
    useEffect(() => {
        // Get Data from /allunits.
        requestAssetDropDownOptions(memberId)
      }, [requestAssetDropDownOptions, memberId]); //

      useEffect(() => {
        // Get Data from /allusers when component mounts.
        requestUserDropDownOptions(memberId)
      }, [requestUserDropDownOptions, memberId]);  

    return (
        <DropDownContainer>
            <DropDownInner>
                <Tag>ASSET ID</Tag>
                <CustomDropDown isHomePage  onChange={() => requestSelectedAssetData(selectedListItemID('asset-list'), memberId)} id="asset-list" optionList={assets}/> 
                <Tag>USER ID</Tag>
                <CustomDropDown isHomePage onChange={requestSelectedUserData} id="user-list" optionList={users}/> 
            </DropDownInner>
        </DropDownContainer>
    )}

const mapStateToProps = createStructuredSelector({
    memberId: currentMemberId,
    assets: selectAssets,
    users: selectUsers
})

const mapDispatchToProps = (dispatch) => ({
    requestSelectedAssetData: (assetId, ownerId) => { dispatch(requestSelectedAssetData({assetId, ownerId}))},
    requestAssetDropDownOptions: (memberId) => { dispatch(requestAssetDropDownOptions(memberId))},
    requestUserDropDownOptions: (memberId) => { dispatch( requestUserDropDownOptions(memberId)) },
    requestSelectedUserData: () => { dispatch( requestSelectedUserData ( selectedListItemID('user-list') ) )},
})


export default connect(mapStateToProps, mapDispatchToProps)(ScanboxContainer);