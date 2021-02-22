import React from 'react'
import { DropDownContainer, DropDown } from "./drop-down.styles";

const CustomDropDown =({ optionList, ...props }) => {
    
    return(
        <DropDownContainer autoFocus >
            <DropDown {...props}>
                    <option text=' '/>
                {   
                    optionList ? (
                        optionList.map(option => (
                    <option key={ option.id }> { option.id } </option> 
                    ))
                    ):(
                    <option></option>
                    )
                }
            </DropDown>
        </DropDownContainer>
    )
}

export default CustomDropDown;
