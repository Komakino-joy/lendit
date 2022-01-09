import React, {useEffect}  from 'react'
import { useDispatch, useSelector } from "react-redux";

import { requestSelectedUserData } from "../../redux/user/user.actions";
import { requestSelectedAssetData } from "../../redux/asset/asset.actions";

import { 
    requestAssetDropDownOptions, 
    requestUserDropDownOptions 
    } from '../../redux/drop-downs/drop-down.actions'

import { 
    Tag, 
    DropDownInner, 
    DropDownContainer, 
} from "./drop-down-container.styles";

import CustomSelect from '../custom-select/custom-select.component';

const ScanboxContainer = () => {

    const dispatch = useDispatch();

    const memberState = useSelector(state => state.memberState)
    const { memberId } = memberState;

    const dropDownOptions = useSelector(state => state.dropDownOptions)
    const { 
        assetDropDown: assets ,
        userDropDown: users,
     } = dropDownOptions;

    useEffect(() => {
        dispatch(requestAssetDropDownOptions(memberId));
      }, [dispatch, memberId]);

      useEffect(() => {
        dispatch(requestUserDropDownOptions(memberId));
      }, [dispatch, memberId]);  

    const handleAssetOnChange = (e) => {
        dispatch(
            requestSelectedAssetData({ 
                assetId: e.value, 
                ownerId: memberId 
            })
        );
    };

    const handleuserOnChange = (e) => {
        dispatch(requestSelectedUserData(e.value ));
    };

    return (
        <DropDownContainer>
            <DropDownInner>
                <Tag>ASSET ID</Tag>
                <CustomSelect 
                    data={assets} 
                    id="asset-list" 
                    onChange={handleAssetOnChange} 
                />
                <Tag>USER ID</Tag>
                <CustomSelect 
                    data={users} 
                    id="user-list" 
                    onChange={ handleuserOnChange} 
                />
            </DropDownInner>
        </DropDownContainer>
    )}


export default ScanboxContainer;