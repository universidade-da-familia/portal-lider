import React, { Component } from 'react';
import {
  Page,
  Image,
  Document,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';
import {} from 'date-fns';

import {
  ContentView,
  NameView,
  NameText,
  EmissionDate,
  EmissionText,
} from './styles';

import Spinner from '../../components/spinner/spinner';

import PropTypes from 'prop-types';

import layoutCertificado from '../../assets/data/layoutCertificado';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as CertificateActions } from '../../store/ducks/certificate';

// Create styles
const styles = StyleSheet.create({
  pdfview: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
});

const names = [
  'Lucas Alves',
  'Adriane Alves',
  'Erick Alves',
  'Jaqueline Alves',
  'Diego Alvares',
];

// Create Document Component
class Certificate extends Component {
  static propTypes = {
    error: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  handleRedirect = () => {
    const { match } = this.props;

    if (window.confirm('Você precisa gerar o certificado novamente!')) {
      window.location = `/eventos/grupo/${match.params.event_id}/editar`;
    } else {
      // They clicked no
    }
  };

  render() {
    const { loading } = this.props;

    return (
      <PDFViewer style={styles.pdfview}>
        <Document>
          <Page size={{ width: 549.92, height: 895.75 }}>
            <ContentView>
              {names.map((name, index) => {
                return (
                  <NameView>
                    <NameText>{name}</NameText>
                  </NameView>
                );
              })}
              {names.length % 2 === 1 && <NameView />}
            </ContentView>
          </Page>
        </Document>
      </PDFViewer>
    );
  }
}

const mapStateToProps = state => ({
  error: state.certificate.error,
  loading: state.certificate.loading,
  data: state.certificate.data,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CertificateActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Certificate);
