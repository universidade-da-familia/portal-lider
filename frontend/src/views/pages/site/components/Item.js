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
    const { title, subtitle, children, color } = this.props;

    return (
      <div {...styles.container}>
        <h3>
          {title}
        </h3>
        {color
          ? <h2 {...css({ color: color })}>
              {subtitle}
            </h2>
          : <h2>
              {subtitle}
            </h2>}
        {children}
      </div>
    );
  }
}

export default Item;
