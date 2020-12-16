import React, { PureComponent } from 'react';

import { css } from 'glamor';

const styles = {
  container: css({
    '@media(min-width: 720px)': {
      margin: '1em',
    },
  }),
  light: css({ color: 'white' }),
};

class Item extends PureComponent {
  render() {
    const { day, startTime, children } = this.props;

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <div {...styles.container}>
        <h3>Dia {day + 1}</h3>
        <h2>{startTime}</h2>
        {children}
      </div>
    );
  }
}

export default Item;
