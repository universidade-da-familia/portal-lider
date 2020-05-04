import React, { PureComponent } from 'react';
import { css } from 'glamor';
import globals from '../utils/globals';

import Text from './Text';

import englishthingImg from '../media/images/sponsors/englishthing.png';

const styles = {
  container: css({
    background: globals.colors.white,
    width: '100vw',
    alignItems: 'center',
    '@media(max-width: 720px)': {
      alignSelf: 'auto',
    },
  }),
  sponsorbtn: css({
    color: globals.colors.background,
    fontSize: 20,
    textAlign: 'center',
    maxWidth: 200,
    borderRadius: 20,
    padding: '10px 20px',
    backgroundColor: globals.colors.main,
    display: 'block',
    margin: '4em auto',
    textDecoration: 'none',
  }),
  paragraphAfterParty: css({
    textAlign: 'center',
    ':first-letter': {
      textTransform: 'uppercase',
    },
  }),
  link: css({
    color: '#666666',
  }),
  card: css({
    width: 250,
    height: 150,
    '@media(min-width: 721px)': {
      height: 100,
    },
    padding: '0',
    backgroundColor: globals.colors.white,
    borderRadius: 0,
    margin: 10,
    '> a > img': {
      maxWidth: 250,
      maxHeight: 150,
      margin: '0 auto',
      display: 'block',
    },
  }),
  cards: css({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 1000,
    margin: '80px auto',
  }),
};

const AfterParty = [
  {
    id: 8,
    name: 'An English Thing',
    avatar: englishthingImg,
    link: 'http://www.anenglishthing.com.br/',
  },
];

class TextAfterParty extends PureComponent {
  render() {
    return (
      <div {...styles.container}>
        <Text title="AfterParty por" reverse />
        <div {...styles.cards}>
          {AfterParty.map(promotion => (
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
        <p {...styles.paragraphAfterParty}>
          <b>Mono Club, Rua Augusta, 480</b>
        </p>
        <p {...styles.paragraphAfterParty}>
          Festa fechada com DJ e Open Bar exclusivo para os participantes da
          React Conf Brasil após o evento.
        </p>
      </div>
    );
  }
}

export default TextAfterParty;
