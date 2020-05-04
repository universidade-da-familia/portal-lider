import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import globals from '../../utils/globals';

const StyledTheme = styled.h4`
  font-size: 1.2em;
  color: ${globals.colors.subheader};
  margin: 0 0 0.33em 0;
  text-align: center;
  font-weight: lighter;

  @media (max-width: 720px) {
    font-size: 1.4em;
  }
`;

const Link = styled.a`
  color: ${globals.colors.secondary};
  text-decoration: none;

  &:hover {
    color: ${globals.colors.subheader};
    text-decoration: underline;
  }
`;

const Theme = ({ theme, talk }) => (
  <StyledTheme className="notranslate">
    {talk ? <Link href={talk}>{theme}</Link> : theme}
  </StyledTheme>
);

Theme.defaultProps = {
  talk: '',
};

Theme.propTypes = {
  theme: PropTypes.string.isRequired,
  talk: PropTypes.string,
};

export default Theme;
