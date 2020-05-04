import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWorksIn = styled.p`
  font-size: 1em;
  font-weight: lighter;
  text-align: center;
  margin: 0 0 0.33em 0;
`;

const Link = styled.a`
  text-decoration: none;
  color: #555;
  font-weight: bold;
`;

const WorksIn = ({ name, link }) => (
  <StyledWorksIn>
    {!!name && (
      <Link
        href={link || ''}
        rel="noopener noreferrer"
        target="_blank"
        className="notranslate"
      >
        {`@${name}`}
      </Link>
    )}
  </StyledWorksIn>
);

WorksIn.defaultProps = {
  name: '',
  link: '',
};

WorksIn.propTypes = {
  name: PropTypes.string,
  link: PropTypes.string,
};

export default WorksIn;
