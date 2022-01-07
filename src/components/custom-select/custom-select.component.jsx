import React from 'react'
import Select from 'react-select';


import { 
    OptionImageContainer, 
    OptionImage, SelectOption, 
    OptionText
} from "./custom-select.styles.jsx";

const CustomSelect = ({ id, data, onChange, clearModelSelection }) => {

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      margin: '15px 0 5px 17%',
      width: '67%'
    }),

    control: (provided, state) => ({
      ...provided,
      // background: '#DAA520',
    }),

    input: (provided, state) => ({
      ...provided,
    }),

    dropdownIndicator: (provided, state) => ({
      ...provided,
      // background: 'lightblue',
    }),

    menu: (provided, state) => ({
      ...provided,
      // background: 'lightcoral',
      border: '1px solid lightgrey',
    }),
  
    menuList: (provided, state) => ({
      ...provided,
      // background: 'orange',

    }),

    option: (provided, state) => ({
      ...provided,
      color: '#545454',
      borderBottom: '1px solid grey',
    }),

    placeholder: (provided, state) => ({
      ...provided,
    })
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
            value={clearModelSelection ? null : options[id]}
            maxMenuHeight={140}
        />
    )
}

export default CustomSelect
