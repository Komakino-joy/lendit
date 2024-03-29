import React from 'react'
import Select from 'react-select';


import { 
    OptionImageContainer, 
    OptionImage, SelectOption, 
    OptionText
} from "./custom-select.styles.jsx";

const CustomSelect = ({ id, data, onChange, clearModelSelection, autoFocus, reference, ...props}) => {

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      margin: '15px 0 5px 17%',
      width: '67%'
    }),

    control: (provided, state) => ({
      ...provided,
    }),

    input: (provided, state) => ({
      ...provided,
    }),

    dropdownIndicator: (provided, state) => ({
      ...provided,
    }),

    menu: (provided, state) => ({
      ...provided,
      border: '1px solid lightgrey',
    }),
  
    menuList: (provided, state) => ({
      ...provided,
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

    const noImageOptions = data.map(option => (
      { 
        value: option.id, 
        label: option.id, 
      }
    ));

    return (
      props.hasImages ? 
        (<Select 
            id={id}
            options={options} 
            onChange={onChange} 
            styles={customStyles}
            value={clearModelSelection ? null : options[id]}
            maxMenuHeight={140}
        />) 
        :
        (<Select 
            id={id}
            ref={props.getSelectRef}
            autoFocus={autoFocus}
            options={noImageOptions} 
            onChange={onChange} 
            maxMenuHeight={240}
        />)
    )
}

export default CustomSelect
