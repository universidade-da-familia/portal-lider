import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import globals from '../../utils/globals';

const StyledSubTitle = styled.div`
  height: ${props => (props.contact ? 40 : 70)}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.h3`
  font-size: 1.78em;
  font-weight: lighter;
  color: ${({ light }) =>
    light ? globals.colors.white : globals.colors.primary};
`;

const Link = styled.a`
  color: ${globals.colors.primary};
  text-decoration: underline;
`;

const SubTitle = ({ title, contact, link, ...props }) => (
  <StyledSubTitle contact={contact}>
    {!!link ? (
      <Text {...props}>
        Email:{' '}
        <Link href={`mailto:${link}`} rel="noopener noreferrer">
          {link}
        </Link>
      </Text>
    ) : (
      <Text {...props}>{title}</Text>
    )}
  </StyledSubTitle>
);

SubTitle.defaultProps = {
  light: false,
};

SubTitle.propTypes = {
  title: PropTypes.string.isRequired,
  light: PropTypes.bool,
};

export default SubTitle;
