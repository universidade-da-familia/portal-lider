/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';

import { css } from 'glamor';

// import { format } from 'date-fns';
// import { pt } from 'date-fns/locale';

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
    fontSize: 40,
    margin: '0 auto',
  }),
  text: css({
    fontSize: 30,
    margin: '0 auto 10em auto',
  }),
};

export default function Infos() {
  const data = useSelector(state => state.event.data);

  return (
    <div {...styles.container}>
      {data !== null && (
        <>
          <p {...styles.header} className="text-center line-height-1">
            {data.defaultEvent.event_type}
            {/* Inicia{' '}
            {format(
              new Date(data.schedules[0].date),
              "dd 'de' MMMM 'de' yyyy",
              {
                locale: pt,
              }
            )} */}
          </p>
          <p {...styles.text}>
            {data.defaultEvent.ministery.name} - {data.defaultEvent.name}
            {/* {data.city}, {data.uf} - {data.country} */}
          </p>
        </>
      )}
    </div>
  );
}
