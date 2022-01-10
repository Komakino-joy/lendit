import React, { useState, useEffect } from "react";
import {connect, useSelector, useDispatch} from 'react-redux';

import { toggleAddModel, toggleAddUnit } from "../../redux/modal/modal.actions";
import { requestAssetDropDownOptions, requestModelDropDownOptions } from '../../redux/drop-downs/drop-down.actions';

import { useAlert } from 'react-alert';

import { httpCreateNewAsset } from "../../services/api";

import AddModel from './add-model.modal';

import { ModalMain, ModalContent, CloseButton, Header, Article,
        FieldSet, Input, AddModelButton, Submit} from "./modal.styles";
import CustomSelect from "../custom-select/custom-select.component";

const AddUnit = ( { getModelOptions }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const seenAddModel = useSelector(state => state.modalState.seenAddModel);
  const memberId = useSelector(state => state.memberState.memberId);
  const models = useSelector(state => state.dropDownOptions.modelDropDown);

  useEffect(() => {
    getModelOptions(memberId);
  }, [getModelOptions, memberId]);

  let [assetID,     setAssetID    ] = useState('');
  let [assetName,   setAssetName  ] = useState('');
  let [assetModel,  setAssetModel ] = useState([]);
  let [assetSerial, setAssetSerial] = useState('');
  let [clearModelSelection, setClearModelSelection] = useState(false);

  const onAssetidChange = (event) => {
    setAssetID(event.target.value); 
  };

  const onAssetNameChange = (event) => {
    setAssetName(event.target.value);
  };
  
  const onAssetModelChange = (option) => {
    setClearModelSelection(false);
    setAssetModel(option.value);
  };

 const onAssetSerialChange = (event) => {
    setAssetSerial(event.target.value);
  };

  const inputReset = () => {
    assetID = null;
    assetName = null;
    assetSerial = null;
    setClearModelSelection(true);
    document.getElementById('asset-id').value = '';
    document.getElementById('asset-name').value = '';
    document.getElementById('asset-serial').value = '';
    document.getElementById('asset-id').focus();
  };

  const submitAsset = () => {
    if (assetID && assetName && assetSerial && assetModel.length && assetModel !== 'Select a model'){
      httpCreateNewAsset(assetID, assetName, assetModel, assetSerial, memberId);

      alert.show(
        `${assetID} submitted`, 
        {
          type: 'success', 
          position:'top center'
        }
      );

      inputReset();

    } else {
      alert.show(
        'Please ensure that all fields are filled out and model is selected.', 
        {
          type: 'error', 
          position:'top center'
        }
      );
    }
  };



  const handleClose = (memberId) => {
    dispatch(toggleAddUnit());
    dispatch(requestAssetDropDownOptions(memberId))
  }
  
  return (
   <ModalMain>
      <ModalContent>
        {/* Retrieve updated list of assets when modal is closed. */}
        <CloseButton onClick={() => handleClose(memberId)}>&times;</CloseButton>
        <Header>Add Asset</Header>
        <Article>
          <div action="sign-up_submit" method="get" acceptCharset="utf-8">
            <FieldSet id="sign_up">
                <Input 
                  id="asset-id"
                  name="asset-id"  
                  type="text" 
                  placeholder="Asset Name (Required)" 
                  onChange={onAssetidChange}   
                />
                <Input 
                  id="asset-name"
                  name="asset-name"  
                  type="text" 
                  placeholder="Asset Tag (Required)" 
                  onChange={onAssetNameChange} 
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
                  name="asset-serial"  
                  type="text" 
                  placeholder="Serial Number (Required)" 
                  onChange={onAssetSerialChange} 
                />
            </FieldSet>
            <Submit type = "Submit" defaultValue="Submit" onClick={() => submitAsset()} />
          </div>
        </Article>
      </ModalContent>
      {seenAddModel ? <AddModel/> : null}
   </ModalMain>
  );
};

const mapDispatchToProps = (dispatch) => ({
    getModelOptions : (memberId) => { dispatch(requestModelDropDownOptions(memberId))}
});

export default connect(null, mapDispatchToProps)(AddUnit);