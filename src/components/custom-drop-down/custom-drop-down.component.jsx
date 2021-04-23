import React from 'react'
import { DropDownContainer, DropDown } from "./drop-down.styles";

const CustomDropDown =({ optionList, defaultOption, ...props }) => {
    
    return(
        <DropDownContainer autoFocus {...props}>
            <DropDown {...props}>
                <option selected="selected">{defaultOption}</option>
                {   
                    optionList ? (
                        optionList.map(option => (
                    <option key={ option.id }> { option.id } </option> 
                    ))
                    ):(
                    <option selected="selected">{defaultOption}</option>
                    )
                }
            </DropDown>
        </DropDownContainer>
    )
}

export default CustomDropDown;
