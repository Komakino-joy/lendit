import React, { useState, useEffect, useRef } from "react";
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';

import { toggleAddModel, toggleAddUnit } from "../../../../redux/modal/modal.actions";
import { fetchAssetDropDownOptionsStart, fetchModelDropDownOptionsStart } from '../../../../redux/drop-downs/drop-down.actions';
import { addNewAssetStart } from "../../../../redux/asset/asset.actions";

import { hasWhiteSpace } from '../../../../utils';

import AddModel from './add-model';

import { ModalMain, ModalContent, CloseButton, Header, Article,
        FieldSet, Input, AddModelButton, Submit} from "../../modal.styles";
import CustomSelect from "../../../custom-select/custom-select.component";

const AddAsset = () => {
  const dispatch = useDispatch();

  const seenAddModel = useSelector(state => state.modalState.seenAddModel);
  const memberId = useSelector(state => state.memberState.memberId);
  const models = useSelector(state => state.dropDownOptions.modelDropDown);

  let [assetModel,  setAssetModel ] = useState(null);
  let [clearModelSelection, setClearModelSelection] = useState(false);

  const assetIdInput = useRef(null);
  const assetNameInput = useRef(null);
  const assetSerialInput = useRef(null);

  useEffect(() => {
    dispatch(fetchModelDropDownOptionsStart({memberId}));
  }, [dispatch, memberId]);

  const onAssetModelChange = (option) => {
    setClearModelSelection(false);
    setAssetModel(option.value);
  };

  const inputReset = () => {
    setClearModelSelection(true);
    setAssetModel(null);
    assetIdInput.current.value = null;
    assetNameInput.current.value = null;
    assetSerialInput.current.value = null;
    assetIdInput.current.focus();
  };

  const submitAsset = (e) => {
    e.preventDefault();

    const assetId = assetIdInput.current.value;
    const assetName = assetNameInput.current.value;
    const assetSerial = assetSerialInput.current.value;

    if (assetId && assetName && assetSerial && assetModel){

      if  ( hasWhiteSpace(assetId) ) {
        assetIdInput.current.focus();
        toast.error('White space is not allowed in asset ID.', {
          id: 'asset-id-white-space',
        });
      }

      const responseAlert = (message, type) => toast[type](message, {
        id: 'add-asset',
      });
      
      const formattedAssetId = assetId.toUpperCase();

      dispatch(addNewAssetStart({formattedAssetId, assetName, assetModel, assetSerial, memberId, responseAlert, inputReset }));

    } else {
      toast.error('Please ensure that all fields are filled out and model is selected.', {
          id: 'asset-input-missing-fields', 
        }
      );
    }
  };

  const handleClose = (memberId) => {
    dispatch(toggleAddUnit());
    dispatch(fetchAssetDropDownOptionsStart({memberId}));
  };

  return (
   <ModalMain>
      <ModalContent>
        {/* Retrieve updated list of assets when modal is closed. */}
        <CloseButton onClick={() => handleClose(memberId)}>&times;</CloseButton>
        <Header>Add Asset</Header>
        <Article>
          <form 
            id="create-asset-form" 
            acceptCharset="utf-8"
            >
            <FieldSet id="sign_up">
                <Input 
                  id="asset-id"
                  ref={assetIdInput}
                  name="asset-id"  
                  type="text" 
                  placeholder="Asset Name (Required)"   
                />
                <Input 
                  id="asset-name"
                  ref={assetNameInput}
                  name="asset-name"  
                  type="text" 
                  placeholder="Asset Tag (Required)" 
                />
                <CustomSelect 
                  id='asset-model'
                  data={models} 
                  hasImages
                  onChange={onAssetModelChange} 
                  clearModelSelection={clearModelSelection}
                />
                <AddModelButton onClick={() => dispatch(toggleAddModel())}>Add New Model</AddModelButton>
                <Input 
                  id="asset-serial"
                  ref={assetSerialInput}
                  name="asset-serial"  
                  type="text" 
                  placeholder="Serial Number (Required)" 
                />
            </FieldSet>
            <Submit type = "Submit" onClick={submitAsset} />
          </form>
        </Article>
      </ModalContent>
      {seenAddModel ? <AddModel/> : null}
   </ModalMain>
  );
};


export default AddAsset;