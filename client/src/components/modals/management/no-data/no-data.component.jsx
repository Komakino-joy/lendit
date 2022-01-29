import React from 'react';

import { NoDataContainer, NoDataMessage } from './no-data.styles';

const NoData = ({ children }) => {
  return (
      <NoDataContainer>
        <NoDataMessage>
            {children}
        </NoDataMessage>
      </NoDataContainer>
  )
};

export default NoData;
