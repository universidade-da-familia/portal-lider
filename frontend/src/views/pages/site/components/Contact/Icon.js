import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const shake = keyframes`
  0% {
    transform: rotate(4deg);
  };
  50% {
    transform: rotate(0);
  };
  100% {
    transform: rotate(-4deg);
  }
`;

const StyledIcon = styled.div`
  margin: 10px;
  display: inline;
  cursor: pointer;

  &:hover svg {
    animation: ${shake} 50ms ease infinite alternate;
  }
`;

const Icon = ({ children }) => <StyledIcon>{children}</StyledIcon>;

Icon.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Icon;
