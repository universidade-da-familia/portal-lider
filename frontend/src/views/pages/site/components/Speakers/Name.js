import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import globals from '../../utils/globals';

const StyledName = styled.h3`
  font-size: 1.7em;
  text-align: center;
  color: ${globals.colors.primary};
  font-weight: light;
  margin: 0.66em 0 0.15em 0;
  line-height: 1;

  @media (max-width: 720px) {
    font-size: 1.9em;
  }
`;

const Link = styled.a`
  text-decoration: none;
  color: #222;
`;

const Name = ({ name, github }) => (
  <StyledName>
    <Link
      href={github}
      rel="noopener noreferrer"
      target="_blank"
      className="notranslate"
    >
      {name}
    </Link>
  </StyledName>
);

Name.propTypes = {
  name: PropTypes.string.isRequired,
  github: PropTypes.string.isRequired,
};

export default Name;
