import React, { PureComponent } from 'react';
import { css } from 'glamor';

import Button from './Button';
import ButtonPattern from '../media/images/buttonPattern.png';

const styles = {
  container: css({
    textAlign: 'center',
    margin: '30px',
    '> h2': {
      margin: 0,
      letterSpacing: 6,
    },
    '@media(max-width: 720px)': {
      margin: '5px',
    },
  }),
};

class ActionButton extends PureComponent {
  render() {
    return (
      <div {...styles.container}>
        <Button label="Early Birds" pattern={ButtonPattern} />

        <Button label="Newsletter" pattern={ButtonPattern} />
      </div>
    );
  }
}

export default ActionButton;
