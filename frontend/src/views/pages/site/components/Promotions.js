import React, { PureComponent } from 'react';
import { css } from 'glamor';
import globals from '../utils/globals';

import Text from './Text';

import dneImg from '../media/images/sponsors/dne.svg';
import jsladiesImg from '../media/images/sponsors/jsladies.png';
import infoqImg from '../media/images/sponsors/infoqbrasil.png';

const styles = {
  container: css({
    background: globals.colors.white,
    width: '100vw',
    alignItems: 'center',
    '@media(max-width: 720px)': {
      alignSelf: 'auto',
    },
  }),
  link: css({
    color: '#666666',
  }),
  card: css({
    width: 150,
    height: 75,
    '@media(min-width: 721px)': {
      height: 150,
    },
    padding: '0',
    backgroundColor: globals.colors.white,
    borderRadius: 0,
    margin: 10,
    position: 'relative',
    '> a > img': {
      maxWidth: 120,
      maxHeight: 55,
      margin: '0 auto',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  }),
  cards: css({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 1000,
    margin: '30px auto',
  }),
};

const Promotions = [
  {
    id: 15,
    name: 'InfoQ Brasil',
    avatar: infoqImg,
    link: 'https://www.infoq.com/br',
  },
  {
    id: 8,
    name: 'DevNaEstrada',
    avatar: dneImg,
    link: 'http://devnaestrada.com.br/',
  },
  {
    id: 11,
    name: 'jsladies',
    avatar: jsladiesImg,
    link: 'https://github.com/jsladiesbr',
  },
];

class TextPromotions extends PureComponent {
  render() {
    return (
      <div {...styles.container}>
        <Text title="Promoção" reverse />
        <div {...styles.cards}>
          {Promotions.map(promotion => (
            <div key={promotion.id} {...styles.card}>
              <a
                href={`${
                  promotion.link
                }?utm_source=reactconfbr-site&utm_medium=logo&utm_campaign=reactconfbr-2017`}
                title={promotion.name}
                rel="noopener noreferrer"
                target="_blank"
              >
                <img src={promotion.avatar} alt={promotion.name} />
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TextPromotions;
