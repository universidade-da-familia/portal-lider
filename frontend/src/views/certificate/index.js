/* eslint-disable react/prop-types */
import React from 'react';

import { Page, Image, Document, StyleSheet } from '@react-pdf/renderer';

import {} from 'date-fns';

import {
  EventIdView,
  EventIdText,
  ContentView,
  NameView,
  NameText,
  EmissionDate,
  EmissionText,
} from './styles';

// Create styles
const styles = StyleSheet.create({
  pageBackground: {
    position: 'absolute',
    minWidth: '100%',
    minHeight: '100%',
    display: 'block',
    height: '50%',
    width: '100%',
  },
});

// Create Document Component
export default function Certificate({ certificates }) {
  return (
    <Document>
      {!!certificates &&
        certificates.participants.map(participant => (
          <Page orientation="portrait" size="A4">
            {certificates.checkBackground && (
              <Image
                src={certificates.imgBackground}
                style={styles.pageBackground}
              />
            )}

            <EventIdView>
              <EventIdText>{certificates.event_id}</EventIdText>
            </EventIdView>

            <ContentView
              flex={1}
              justify={certificates.layout_certificado.content_justify}
              align={certificates.layout_certificado.content_align}
            >
              <NameView
                margin={certificates.layout_certificado.name_margin}
                margin_left={certificates.layout_certificado.name_margin_left}
              >
                <NameText
                  fontfamily={certificates.layout_certificado.name_font_family}
                  fontsize={certificates.layout_certificado.name_font_size}
                >
                  {participant}
                </NameText>
              </NameView>
              <EmissionDate
                margin={certificates.layout_certificado.emission_margin}
                margin_left={
                  certificates.layout_certificado.emission_margin_left
                }
              >
                <EmissionText
                  fontfamily={
                    certificates.layout_certificado.emission_font_family
                  }
                  fontsize={certificates.layout_certificado.emission_font_size}
                >
                  {certificates.city} - {certificates.uf}, {certificates.date}
                </EmissionText>
              </EmissionDate>
            </ContentView>
          </Page>
        ))}
    </Document>
  );
}
