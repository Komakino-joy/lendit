import React, { useState } from "react";
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";
import { currentMemberId } from "../../redux/site-member/site-member.selectors";

import { useAlert } from "react-alert";

import axios from "axios";
import { toggleAddModel } from "../../redux/modal/modal.actions";
import { requestModelDropDownOptions } from "../../redux/drop-downs/drop-down.actions";

import {
  SubModalMain,
  SubModalContent,
  CloseButton,
  Header,
  Article,
  FieldSet,
  Label,
  Input,
  Submit,
} from "./modal.styles";

const AddModel = ({ toggleAddModel, getModelOptions, memberId }) => {
  const alert = useAlert();

  let [model, setModel] = useState("");

  const onModelChange = (event) => {
    setModel(event.target.value);
  };

  const inputReset = () => {
    model = null;
    document.getElementById("model").value = "";
    document.getElementById("file").value = "";
  };

  const onFileUpload = () => {

    const file = document.querySelector("#file").files[0];

    if (!file || !model){
      alert.show('Model name and image are required.', { type:'error', position:'top center' })
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

        axios({
          method: "post",
          url: "http://localhost:3000/upload",
          data: {
            image: srcEncoded,
            model: model,
            memberId: memberId,
          },
        });

        alert.show(`${model} submitted`, {
          type: "success",
          position: "top center",
        });

        inputReset();
      };
    };
  };

  return (
    <SubModalMain>
      <SubModalContent>
        {/* Retrieve updated list of models when modal is closed. */}
        <CloseButton
          onClick={() => {
            toggleAddModel();
            getModelOptions(memberId);
          }}
        >
          &times;
        </CloseButton>

        <Header>Add Model</Header>
        <Article>
          <div action="sign-up_submit" method="get" acceptCharset="utf-8">
            <FieldSet>
              <Label htmlFor="model">Model Name</Label>
              <Input
                id="model"
                type="text"
                name="model"
                onChange={onModelChange}
              />

              <Label htmlFor="image">Image</Label>
              <form
                className="flex flex-column"
                encType="multipart/form-data"
                method="POST"
              >
                <Input
                  id="file"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  name="pic"
                />
              </form>
            </FieldSet>
            <Submit
              type="Submit"
              defaultValue="Submit"
              onClick={onFileUpload}
            />
          </div>
        </Article>
      </SubModalContent>
    </SubModalMain>
  );
};

const mapStateToProps = createStructuredSelector({
  memberId: currentMemberId,
});

const mapDispatchToProps = (dispatch) => ({
  toggleAddModel: () => dispatch(toggleAddModel()),
  getModelOptions: (memberId) => {
    dispatch(requestModelDropDownOptions(memberId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddModel);
