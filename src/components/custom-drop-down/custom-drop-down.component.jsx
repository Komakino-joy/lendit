import React from 'react'
import { DropDownContainer, DropDown } from "./drop-down.styles";

const CustomDropDown =({ id, optionList, ...props }) => {
    
    return(
        <DropDownContainer autoFocus {...props} >
            <DropDown id={id} {...props}>
                <option> </option>
                {   
                    optionList ? (
                        optionList.map(option => (
                    <option key={option.id} text={option.id}>{option.id}</option> 
                    ))
                    ):(
                    <option> </option>
                    )
                }
            </DropDown>
        </DropDownContainer>
    )
}

export default CustomDropDown;
