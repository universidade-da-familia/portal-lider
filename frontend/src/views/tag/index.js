/* eslint-disable react/prop-types */
import React from 'react';

import { Document, Page } from '@react-pdf/renderer';

import { ContentView, NameText, TextView } from './styles';

// Create Document Component
export default function Tag({ tags }) {
  return (
    <Document>
      {tags.map(tag => (
        <Page
          size={{
            width: 377.952755906,
            height: 3.5 * 37.7952755906,
          }}
        >
          <ContentView>
            <TextView>
              <NameText>A/C: {tag.name.toUpperCase()}</NameText>
            </TextView>
            <TextView>
              <NameText>EVENTOS: {tag.events.join(', ')}</NameText>
            </TextView>
            {tag.addresses.length > 0 ? (
              <>
                <TextView>
                  <NameText>
                    {tag.addresses[0].street.toUpperCase()},{' '}
                    {tag.addresses[0].street_number.toUpperCase()}
                  </NameText>
                </TextView>
                <TextView>
                  <NameText>
                    BAIRRO: {tag.addresses[0].neighborhood.toUpperCase()}
                  </NameText>
                </TextView>
                {!!tag.addresses[0].complement && (
                  <TextView>
                    <NameText>
                      COMP: {tag.addresses[0].complement.toUpperCase()}
                    </NameText>
                  </TextView>
                )}
                <TextView>
                  <NameText>
                    CIDADE: {tag.addresses[0].city.toUpperCase()} -{' '}
                    {tag.addresses[0].uf.toUpperCase()}
                  </NameText>
                </TextView>
                <TextView>
                  <NameText>CEP: {tag.addresses[0].cep}</NameText>
                </TextView>
              </>
            ) : (
              <TextView>
                <NameText>SEM ENDERECO</NameText>
              </TextView>
            )}
          </ContentView>
        </Page>
      ))}
    </Document>
  );
}
