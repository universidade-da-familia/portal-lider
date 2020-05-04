import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import globals from '../../utils/globals';

const StyledItem = styled.a`
  background-image: url(${({ speaker }) => speaker.avatar});
  background-size: cover;
  background-position: center;
  height: 230px;
  display: block;
  border-radius: 50%;
  filter: grayscale(100%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 300ms ease;
  border: 5px solid ${globals.colors.primary};
  cursor: pointer;
  overflow: hidden;

  &:hover {
    filter: grayscale(0%);

    > img {
      opacity: 1;
    }
  }
`;

const Item = ({ children, ...props }) => (
  <StyledItem {...props}>{children}</StyledItem>
);

Item.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Item;
