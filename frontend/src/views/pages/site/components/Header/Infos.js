import React from 'react';
import { css } from 'glamor';

import { useSelector } from 'react-redux';

import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

import globals from '../../utils/globals';

const styles = {
  container: css({
    // alignSelf: 'flex-end',
    display: 'flex',
    margin: '0',
    color: globals.colors.white,
    fontSize: 40,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '@media(max-width: 720px)': {
      display: 'flex',
      width: '80%',
      margin: '0 auto',
    },
  }),
  header: css({
    fontSize: 30,
    margin: '0 auto',
  }),
  text: css({
    fontSize: 20,
    margin: '0 auto 4em auto',
  }),
};

export default function Infos() {
  const data = useSelector(state => state.siteEvent.data);

  return (
    <div {...styles.container}>
      {data !== null && (
        <>
          <p {...styles.header} className="text-center line-height-1">
            Inicia{' '}
            {format(new Date(data.start_date), "dd 'de' MMMM 'de' yyyy", {
              locale: pt,
            })}
          </p>
          <p {...styles.text}>
            {data.address.city}, {data.address.uf} - {data.address.country}
          </p>
        </>
      )}
    </div>
  );
}
