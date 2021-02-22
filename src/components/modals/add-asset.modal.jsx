import React, { useState, useEffect } from "react";
import { useAlert } from 'react-alert';
import {connect} from 'react-redux';

import { createStructuredSelector } from "reselect";
import { currentMemberId } from "../../redux/site-member/site-member.selectors";
import { selectModels } from "../../redux/drop-downs/drop-down.selectors";
import { seenAddModel } from "../../redux/modal/modal.selectors";

import AddModel from './add-model.modal';

import CustomDropDown from '../custom-drop-down/custom-drop-down.component'
import { createNewAsset } from "../../services/api";
import { toggleAddModel, toggleAddUnit } from "../../redux/modal/modal.actions";
import { requestAssetDropDownOptions, requestModelDropDownOptions } from '../../redux/drop-downs/drop-down.actions';

import { ModalMain, ModalContent, CloseButton, Header, Article,
        FieldSet, Label, Input, AddModelButton, Submit} from "./modal.styles";

const AddUnit = ( {toggleAddUnit, toggleAddModel, seenAddModel, getAssetOptions, getModelOptions, models, memberId}) => {

  const alert = useAlert();

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
      createNewAsset(assetID, assetName, assetModel, assetSerial, memberId);
      alert.show(`${assetID} submitted`, {type: 'success', position:'top center'});
      inputReset();
    } else {
      alert.show('Please ensure that all fields are filled out and model is selected.', {type: 'error', position:'top center'});
    }
  };
  
  return (
   <ModalMain>
      <ModalContent>
        {/* Retrieve updated list of assets when modal is closed. */}
        <CloseButton onClick={() => {toggleAddUnit(); getAssetOptions(memberId);}}>&times;</CloseButton>
        <Header>Add Asset</Header>
        <Article>
          <div action="sign-up_submit" method="get" acceptCharset="utf-8">
            <FieldSet id="sign_up">
                <Label htmlFor="asset-id">Asset ID</Label>
                <Input onChange={onAssetidChange} type="text" name="asset-id"  id="asset-id"/>
                <Label htmlFor="asset-name">Asset Name</Label>
                <Input onChange={onAssetNameChange} type="text" name="asset-name"  id="asset-name"/>
                <Label htmlFor="asset-model">Model</Label>
                <CustomDropDown onChange={onAssetModelChange} name="asset-model"  id="asset-model" optionList={models}/>
                <AddModelButton onClick={toggleAddModel}>Add New Model</AddModelButton>
                <Label htmlFor="asset-serial">Serial Number</Label>
                <Input onChange={onAssetSerialChange} type="text" name="asset-serial"  id="asset-serial"/>
            </FieldSet>
            <Submit type = "Submit" defaultValue="Submit" onClick={() => submitAsset()} />
          </div>
        </Article>
      </ModalContent>
      {seenAddModel ? <AddModel/> : null}
   </ModalMain>
  );
};

const mapStateToProps = createStructuredSelector({
  memberId: currentMemberId,
  models: selectModels,
  seenAddModel
});

const mapDispatchToProps = (dispatch) => ({
    toggleAddUnit   : () => {dispatch(toggleAddUnit())},
    toggleAddModel  : () => {dispatch(toggleAddModel())},
    getAssetOptions : (memberId) => { dispatch(requestAssetDropDownOptions(memberId))},
    getModelOptions : (memberId) => { dispatch(requestModelDropDownOptions(memberId))}
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUnit);