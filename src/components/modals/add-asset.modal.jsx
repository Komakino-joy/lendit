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
        FieldSet, Input, AddModelButton, Submit} from "./modal.styles";

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

  const fetchDuplicateIdCheck= async (assetID, memberId) => {
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: assetID,
        owner_id: memberId
      }),
    };
    try {
      const response = await fetch(
        `http://localhost:3000/duplicateIdCheck`,
        settings
      );
      const isDuplicate = await response.json();
      console.log(isDuplicate)
      return isDuplicate;
    } catch (error) {
      console.log(error);
    }
  };

  const submitAsset = (event) => {

    fetchDuplicateIdCheck();
    
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
                <Input onChange={onAssetidChange}   placeholder="Asset ID (Required)" type="text" name="asset-id"  id="asset-id"/>
                <Input onChange={onAssetNameChange} placeholder="Asset Name (Required)" type="text" name="asset-name"  id="asset-name"/>
                <CustomDropDown isModelSelection onChange={onAssetModelChange} defaultOption="Model (Required)" name="asset-model"  id="asset-model" optionList={models}/>
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