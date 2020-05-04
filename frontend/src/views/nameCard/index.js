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
  NameMeaningView,
  NameMeaningText,
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
  {
    name: 'Erick1',
    nameMeaning: 'Teste nome significado',
  },
  {
    name: 'Lucas2',
    nameMeaning: 'Significado do nome do Lucas aqui, te',
  },
  {
    name: 'Erick3',
    nameMeaning: 'Teste nome significado',
  },
  {
    name: 'Lucas4',
    nameMeaning:
      'Significado do nome do Lucas aqui, testooo grann deeeasdasd dasdasd dasdasde',
  },
  {
    name: 'Erick5',
    nameMeaning: 'Teste nome significado',
  },
  {
    name: 'Lucas6',
    nameMeaning: 'Significado do nome do Lucas aqui, testooo grann deeee',
  },
  {
    name: 'Erick5',
    nameMeaning: 'Teste nome significado',
  },
  {
    name: 'Lucas6',
    nameMeaning: 'Significado do nome do Lucas aqui, testooo grann deeee',
  },
  {
    name: 'Erick5',
    nameMeaning: 'Teste nome significado',
  },
  {
    name: 'Lucas6',
    nameMeaning: 'Significado do nome do Lucas aqui, testooo grann deeee',
  },
  {
    name: 'Erick5',
    nameMeaning: 'Teste nome significado',
  },
  {
    name: 'Lucas6',
    nameMeaning: 'Significado do nome do Lucas aqui, testooo grann deeee',
  },
];

// Create Document Component
class NameCard extends Component {
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
          <Page orientation="portrait" size="A4">
            <ContentView>
              {names.map((name, index) => {
                return (
                  <NameView>
                    <NameText>{name.name}</NameText>
                    <NameMeaningText>{name.nameMeaning}</NameMeaningText>
                  </NameView>
                );
              })}
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
)(NameCard);
