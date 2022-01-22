import React, { useEffect, useState }  from 'react'
import { useDispatch, useSelector } from "react-redux";

import { 
    setSelectedUser, 
    fetchAssetDropDownOptionsStart,
    fetchUserDropDownOptionsStart
    } from '../../redux/drop-downs/drop-down.actions';

import { fetchSelectedAssetDetailsStart } from '../../redux/asset/asset.actions';

import { 
    Tag, 
    DropDownInner, 
    DropDownContainer, 
} from "./drop-down-container.styles";

import CustomSelect from '../custom-select/custom-select.component';

const ScanboxContainer = () => {
    const dispatch = useDispatch();

    const dropDownOptions = useSelector(state => state.dropDownOptions)
    const memberState = useSelector(state => state.memberState)
    const { memberId } = memberState;

    const { 
        assetDropDown: assets ,
        userDropDown: users,
     } = dropDownOptions;

    const [ userInputField, setUserInputField ] = useState(null);


    useEffect(() => {
        dispatch(fetchAssetDropDownOptionsStart({ memberId }));
        dispatch(fetchUserDropDownOptionsStart({ memberId }));
      }, [dispatch, memberId]);


    const handleAssetOnChange = (node) => {
        const selectedAssetId =  node.value
        dispatch(fetchSelectedAssetDetailsStart({selectedAssetId, memberId}));
        userInputField.focus()
    };

    const handleuserOnChange = (node) => {
        const selectedUser = users.filter(({id}) => id === node.value);
        dispatch(setSelectedUser(selectedUser[0]));
    };

    return (
        <DropDownContainer>
            <DropDownInner>
                <Tag>ASSET ID</Tag>
                {
                    assets &&
                    <CustomSelect 
                        autoFocus 
                        data={assets} 
                        id="asset-list" 
                        onChange={(node) => handleAssetOnChange(node)} 
                    />
                }
                <Tag>USER ID</Tag>
                {
                    users &&
                    <CustomSelect
                        getSelectRef={node => setUserInputField(node)}
                        onChange={ (node) => handleuserOnChange(node) } 
                        data={users} 
                        id="user-list" 
                    />
                }
            </DropDownInner>
        </DropDownContainer>
    )}


export default ScanboxContainer;