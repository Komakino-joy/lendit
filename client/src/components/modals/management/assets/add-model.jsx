import React, { useState } from "react";
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from "react-redux";

import { toggleAddModel } from "../../../../redux/modal/modal.actions";
import { fetchModelDropDownOptionsStart } from "../../../../redux/drop-downs/drop-down.actions";

import { httpAddModel } from "../../../../services/api";

import FileUpload from "../../../file-upload/file-upload.component";

import {
  ModalMain,
  ModalContent,
  CloseButton,
  Header,
  Article,
  FieldSet,
  ModalInput,
  Submit,
} from "../../modal.styles"

const AddModel = () => {
  const dispatch = useDispatch();

  const memberId = useSelector(state => state.memberState.memberId)

  let [model, setModel] = useState("");
  let [modelPreview, setModelPreview] = useState(true);
  const [newUserInfo, setNewUserInfo] = useState({
    modelImages: []
  });


  const onModelChange = (event) => {
    setModel(event.target.value);
  };

  const inputReset = () => {
    model = null;
    document.getElementById("model").value = "";
    document.getElementById("file").value = "";
    setModelPreview(false);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      
      const file = newUserInfo.modelImages[0];

      if (!file || !model){
        toast.error('Model name and image are required.', { 
          id: 'add-model-missing-fields'
        })
        return;
      } 

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const imgElement = document.createElement("img");
        imgElement.src = event.target.result;

        imgElement.onload = (e) => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 350;
          if (e.target.width > 350) {
            const scaleSize = MAX_WIDTH / e.target.width;
            canvas.width = MAX_WIDTH;
            canvas.height = e.target.height * scaleSize;
          } else {
            canvas.width = e.target.width;
            canvas.height = e.target.height;
          }

          const ctx = canvas.getContext("2d");

          ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);

          const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpg");

     
          const responseAlert = (message, type) => toast[type](message, {
            id: 'add-model',
          });

          httpAddModel(memberId, model, srcEncoded, responseAlert);

          inputReset();
        };
      };
    };
    
  const updateUploadedFiles = (files) => {
    setNewUserInfo({ ...newUserInfo, modelImages: files });
  }

  const handleOnClose = (e) => {
    e.preventDefault();
    dispatch(toggleAddModel())
    dispatch(fetchModelDropDownOptionsStart({ memberId }))
  }

  return (
    <ModalMain>
      <ModalContent>
        {/* Retrieve updated list of models when modal is closed. */}
        <CloseButton
          onClick={handleOnClose}
        >
          &times;
        </CloseButton>

        <Header>Add Model</Header>
        <Article>
          <div action="sign-up_submit" method="get" acceptCharset="utf-8">
            <FieldSet>
                <ModalInput
                  placeholder="Model Name (Required)"
                  id="model"
                  type="text"
                  name="model"
                  onChange={onModelChange}
                />

                <form
                  className="flex flex-column"
                  encType="multipart/form-data"
                  method="POST"
                  onSubmit={handleSubmit}
                >
                <FileUpload
                  id="file"
                  accept=".jpg,.png,.jpeg"
                  label="Model image"
                  updateFilesCb={updateUploadedFiles}
                  modelPreview={modelPreview}
                  setModelPreview={setModelPreview}
                />
            <Submit
              type="Submit"
              defaultValue="Submit"
            />
              </form>
            </FieldSet>
          </div>
        </Article>
      </ModalContent>
    </ModalMain>
  );
};


export default AddModel;
