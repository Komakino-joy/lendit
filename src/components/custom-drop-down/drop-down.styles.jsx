import styled , { css } from 'styled-components';

const dropdownStyles = css`
  border: 1px solid rgba(0, 0, 0, 0.2);
  height: 2rem;
`

const homePageDropDownContainer = css`
  ${dropdownStyles}
  margin-bottom: 0.5rem;
  @media screen and (max-width: 1500px) {
    width: 85%;
  }
`;

const modelDropDownContainer = css`
${dropdownStyles}
  width: 66%;
  margin-top: 1rem;
  margin-left:18%;
`;

const activityDropDownContainer = css`
${dropdownStyles}
  width: 100%;
  margin-top: 1rem;
`;

const getDropDownStyles = (props) => {
    if (props.isHomePage) {
        return homePageDropDownContainer;
    };

    if (props.isModelSelection) {
      return modelDropDownContainer;
    };

    if (props.isActivitySelection) {
      return activityDropDownContainer
    }
};

export const DropDownContainer = styled.div`
  ${getDropDownStyles}
`
export const DropDown = styled.select`
  width: 100%;
  height: 100%;
  border: none;
  font-size: 1rem;
  font-family: sans-serif;
  padding-left: 0.2rem;

  &:focus {
    padding-left: 0.2rem;
    border: 0.5px solid black;
  }
`