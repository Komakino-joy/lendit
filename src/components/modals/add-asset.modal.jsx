import React, { useState, useEffect } from "react";
import {connect, useSelector, useDispatch} from 'react-redux';

import { toggleAddModel, toggleAddUnit } from "../../redux/modal/modal.actions";
import { requestAssetDropDownOptions, requestModelDropDownOptions } from '../../redux/drop-downs/drop-down.actions';

import { useAlert } from 'react-alert';

import Select from 'react-select';
import DefaultImage from '../../images/default.svg'

import { httpCreateNewAsset } from "../../services/api";

import AddModel from './add-model.modal';
import CustomDropDown from '../custom-drop-down/custom-drop-down.component'

import { ModalMain, ModalContent, CloseButton, Header, Article,
        FieldSet, Input, AddModelButton, Submit} from "./modal.styles";

const AddUnit = ( {toggleAddUnit, toggleAddModel, getAssetOptions, getModelOptions }) => {
  const alert = useAlert();

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

  const onAssetidChange = (event) => {
    setAssetID(event.target.value); 
  };

  const onAssetNameChange = (event) => {
    setAssetName(event.target.value);
  };

  const onAssetModelChange = (event) => {
    setAssetModel(event.target.value);
  };

 const onAssetSerialChange = (event) => {
    setAssetSerial(event.target.value);
  };

  const inputReset = () => {
    assetID = null;
    assetName = null;
    assetSerial = null;
    document.getElementById('asset-id').value = '';
    document.getElementById('asset-name').value = '';
    document.getElementById('asset-serial').value = '';
    document.getElementById('asset-model').value = 'Select A Model';
    document.getElementById('asset-id').focus();
  };

  const submitAsset = (event) => {
    
    if (assetID && assetName && assetSerial && assetModel.length && assetModel !== 'Select a model'){
      httpCreateNewAsset(assetID, assetName, assetModel, assetSerial, memberId);
      alert.show(`${assetID} submitted`, {type: 'success', position:'top center'});
      inputReset();
    } else {
      alert.show('Please ensure that all fields are filled out and model is selected.', {type: 'error', position:'top center'});
    }
  };

  const options = models.map(model => (
    { 
      value: model.id, 
      label: <div>
                <img 
                  src={model.image} 
                  alt={model.id} 
                  height="60px" 
                  width="60px"
                />
                {model.id}
             </div> 
    }
  ));
  
  return (
   <ModalMain>
      <ModalContent>
        {/* Retrieve updated list of assets when modal is closed. */}
        <CloseButton onClick={() => {toggleAddUnit(); getAssetOptions(memberId);}}>&times;</CloseButton>
        <Header>Add Asset</Header>
        <Article>
          <div action="sign-up_submit" method="get" acceptCharset="utf-8">
            <FieldSet id="sign_up">
                <Input onChange={onAssetidChange}   placeholder="Asset ID (Required)" type="text" name="asset-id"  id="asset-id"/>
                <Input onChange={onAssetNameChange} placeholder="Asset Name (Required)" type="text" name="asset-name"  id="asset-name"/>
                <CustomDropDown 
                  isModelSelection 
                  onChange={onAssetModelChange} 
                  defaultOption="Model (Required)" 
                  name="asset-model"  
                  id="asset-model" 
                  optionList={models}
                />
                <Select 
                  options={options} 
                  onChange={onAssetModelChange} 
                />
                <AddModelButton onClick={toggleAddModel}>Add New Model</AddModelButton>
                <Input onChange={onAssetSerialChange} placeholder="Serial Number (Required)" type="text" name="asset-serial"  id="asset-serial"/>
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
    toggleAddUnit   : () => {dispatch(toggleAddUnit())},
    toggleAddModel  : () => {dispatch(toggleAddModel())},
    getAssetOptions : (memberId) => { dispatch(requestAssetDropDownOptions(memberId))},
    getModelOptions : (memberId) => { dispatch(requestModelDropDownOptions(memberId))}
});

export default connect(null, mapDispatchToProps)(AddUnit);