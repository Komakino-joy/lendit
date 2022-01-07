import React from 'react'
import Select from 'react-select';

import { 
    OptionImageContainer, 
    OptionImage, SelectOption, 
    OptionText
} from "./custom-select.styles.jsx";

const CustomSelect = ({ id, data, onChange }) => {

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      borderBottom: '1px dotted pink',
      color: state.selectProps.menuColor,
      padding: 20,
    }),
  
    control: (_, { selectProps: { width }}) => ({
      width: width
    }),
  
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    }
  };

  const options = data.map(option => (
      { 
        value: option.id, 
        label: <SelectOption style={{ cursor:'pointer' }}>
                  <OptionImageContainer>
                    <OptionImage 
                      src={option.image} 
                      alt={option.id} 
                      
                    />
                  </OptionImageContainer>
                  <OptionText>{option.id}</OptionText>
                </SelectOption> 
      }
    ));

    return (
        <Select 
            id={id}
            options={options} 
            onChange={onChange} 
            styles={customStyles}
            width='80%'
            menuColor='grey'
            // options={...}
        />
    )
}

export default CustomSelect
