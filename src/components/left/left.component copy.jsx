import React from 'react'

import AssetDropDown from '../custom-drop-down/asset-drop-down.component';
import UserDropDown from "../custom-drop-down/user-drop-down.component";

import {LeftContainer, LeftInner, Tag } from "./left.styles";

const ScanboxContainer = () => (
        <LeftContainer>
            <LeftInner>
                <Tag>ASSET ID</Tag>
                <AssetDropDown/>
                <Tag>USER ID</Tag>
                <UserDropDown/>
            </LeftInner>
        </LeftContainer>
    )

export default ScanboxContainer;
