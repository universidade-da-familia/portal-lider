import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import globals from '../../utils/globals';

const StyledContainer = styled.div`
  background: ${globals.colors.white};
  width: 100vw;
  align-items: center;

  @media (max-width: 720px) {
    align-self: auto;
  }
`;

const Container = ({ children }) => (
  <StyledContainer>{children}</StyledContainer>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
