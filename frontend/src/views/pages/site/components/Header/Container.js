import React from 'react';
import { useSelector } from 'react-redux';

// import PropTypes from 'prop-types';
import styled from 'styled-components';

import globals from '../../utils/globals';

// import backgroundImage from '../../media/images/bannerhab.jpg';

const StyledContainer = styled.div`
  background: url(${props => props.banner});
  background-color: #220132;
  color: ${globals.colors.primary};
  width: 100%;
  min-width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;

  @media (max-width: 480px) {
    background-position: left;
  }

  @media (max-width: 768px) {
    background: url(${props => props.bannerMobile});
  }
`;

export default function Container({ children }) {
  const data = useSelector(state => state.event.data);

  return (
    data !== null && (
      <StyledContainer
        banner={data.defaultEvent.img_banner_dash_url}
        bannerMobile={data.defaultEvent.img_banner_mobile_site_url}
      >
        {children}
      </StyledContainer>
    )
  );
}
