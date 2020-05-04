import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import globals from '../utils/globals';

const styles = {
  container: css({
    width: '100%',
    fontWeight: 'lighter',
    // maxWidth: 1000,
    margin: '0 auto',
    textAlign: 'center',
    color: globals.colors.primary,

    '> h1': {
      fontSize: '3.998em',
      margin: '1em',
    },
    '> h2': {
      margin: '1em',
      fontSize: '2.827em',
    },
    '> h3': {
      fontWeight: 'lighter',
      fontSize: '1.999em',
      margin: '1em',
    },
    '> h4': {
      color: globals.colors.topic,
      margin: '1em',
      fontWeight: 'lighter',
      fontSize: '1.414em',
    },
    '> h5': {
      color: globals.colors.topic,
      margin: '1em',
      fontWeight: 'lighter',
      fontSize: '1em',
    },
    '> p': {
      margin: '1em',
      fontSize: '1em',
    },
    '> span': {
      color: globals.colors.darken,
      display: 'inline-block',
      margin: '1em',
      fontSize: '1em',
    },
    '> p span': {
      fontSize: '1em',
      color: globals.colors.primary,
      display: 'inline-block',
      margin: '1em',
    },
    '> img': {
      maxWidth: '100%',
    },
  }),
};

class Text extends PureComponent {
  render() {
    const { title, subtitle, children } = this.props;

    return (
      <div {...styles.container}>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        {children}
      </div>
    );
  }
}

Text.defaultProps = {
  title: '',
  subtitle: '',
};

Text.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Text;
