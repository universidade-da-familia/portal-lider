/* eslint-disable consistent-return */
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

            {(() => {
              if (tag.addresses.length > 0) {
                let auxCount = 0;

                let tag_main_address = null;

                tag.addresses.forEach(address => {
                  if (address.main_address === true) {
                    tag_main_address = address;
                    auxCount += 1;
                  }
                });

                if (tag_main_address !== null) {
                  return (
                    <>
                      <TextView>
                        <NameText>
                          {tag_main_address.street.toUpperCase()},{' '}
                          {tag_main_address.street_number.toUpperCase()}
                        </NameText>
                      </TextView>
                      <TextView>
                        <NameText>
                          BAIRRO: {tag_main_address.neighborhood.toUpperCase()}
                        </NameText>
                      </TextView>
                      {!!tag_main_address.complement && (
                        <TextView>
                          <NameText>
                            COMP: {tag_main_address.complement.toUpperCase()}
                          </NameText>
                        </TextView>
                      )}
                      <TextView>
                        <NameText>
                          CIDADE: {tag_main_address.city.toUpperCase()} -{' '}
                          {tag_main_address.uf.toUpperCase()}
                        </NameText>
                      </TextView>
                      <TextView>
                        <NameText>CEP: {tag_main_address.cep}</NameText>
                      </TextView>
                    </>
                  );
                }
                if (auxCount === 0) {
                  return (
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
                  );
                }
              } else {
                return (
                  <TextView>
                    <NameText>SEM ENDERECO</NameText>
                  </TextView>
                );
              }
            })()}
          </ContentView>
        </Page>
      ))}
    </Document>
  );
}
