import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import globals from '../../utils/globals';

const { colors } = globals;

const disabledStyle = `
  background-color: ${colors.gray};
  color: ${colors.lightGray};
  cursor: initial;
  pointer-events: none;
`;

const defaultStyle = `
  color: ${colors.primary};
  background: ${colors.secondary};
  border: 2px solid ${colors.transparent};

  &:hover {
    background-color: ${colors.transparent};
    color: ${colors.secondary};
    border: 2px solid ${colors.secondary};
  };
`;

const reverseStyle = `
  color: ${colors.secondary};
  background: ${colors.transparent};
  border: 2px solid ${colors.secondary};

  &:hover {
    background-color: ${colors.secondary};
    color: ${colors.primary};
  };
`;

const lightStyle = `
  color: ${colors.primary};
  background: ${colors.white};
  border: 2px solid ${colors.transparent};

  &:hover {
    background-color: ${colors.primary};
    color: ${colors.white};
  };
`;

const secondaryStyle = `
  color: ${colors.white};
  background: ${colors.main};
  border: 2px solid ${colors.transparent};

  &:hover {
    background-color: ${colors.white};
    color: ${colors.main};
  };
`;

const StyledButton = styled.a`
  padding: 10px ${props => (props.medium ? '70px' : '30px')};
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  text-decoration: none;
  font-size: ${(props) => {
    if (props.medium) return '1.2em';
    if (props.big) return '1.5em';

    return '1em';
  }};
  border-radius: ${(props) => {
    if (props.medium) return '24px';
    if (props.big) return '27px';

    return '22px';
  }};
  transition: background-color 200ms ease;

  &:hover {
    transition: background-color 200ms ease;
  }

  @media screen and (max-width: 768px) {
    font-size: 0.85em;
  }

  ${(props) => {
    if (props.disabled) return disabledStyle;
    if (props.reverse) return reverseStyle;
    if (props.light) return lightStyle;
    if (props.secondary) return secondaryStyle;

    return defaultStyle;
  }};
`;

const Button = ({ children, ...props }) => (
  <StyledButton {...props} rel="noopener noreferrer">
    {children}
  </StyledButton>
);

Button.defaultProps = {
  disabled: false,
  reverse: false,
  light: false,
  target: '_blank',
  href: '',
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  target: PropTypes.string,
  disabled: PropTypes.bool,
  reverse: PropTypes.bool,
  light: PropTypes.bool,
};

export default Button;
