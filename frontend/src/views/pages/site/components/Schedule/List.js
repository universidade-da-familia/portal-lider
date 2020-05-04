import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledList = styled.ol`
  list-style: none;
  padding: 0;
  max-width: 600px;
  margin: 0 auto;

  @media screen and (max-width: 600px) {
    width: 90%;
  }
`;

const List = ({ children }) => <StyledList>{children}</StyledList>;

List.propTypes = {
  children: PropTypes.node.isRequired,
};

export default List;
