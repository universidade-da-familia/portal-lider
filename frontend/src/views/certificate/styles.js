import { Font } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';

Font.register({
  family: 'Shlyalln',
  src:
    process.env.NODE_ENV === 'development'
      ? `http://${document.location.hostname}:3000/fonts/Shlyalln.ttf`
      : 'https://lider.udf.org.br/fonts/Shlyalln.ttf',
});

Font.register({
  family: 'Gara',
  src:
    process.env.NODE_ENV === 'development'
      ? `http://${document.location.hostname}:3000/fonts/Gara.ttf`
      : 'https://lider.udf.org.br/fonts/Gara.ttf',
});

Font.register({
  family: 'Avenir',
  src:
    process.env.NODE_ENV === 'development'
      ? `http://${document.location.hostname}:3000/fonts/Avenir.ttf`
      : 'https://lider.udf.org.br/fonts/Avenir.ttf',
});

export const EventIdView = styled.View`
  position: absolute;
  margin-top: 322px;
  padding-left: 38px;
`;

export const EventIdText = styled.Text`
  font-size: 10;
`;

export const ContentView = styled.View`
  flex: 1;
  justify-content: ${props => props.justify};
  align-items: ${props => props.align};
`;

export const NameView = styled.View`
  margin-top: ${props => props.margin};
  margin-left: ${props => props.margin_left};
`;

export const NameText = styled.Text`
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
`;

export const EmissionDate = styled.View`
  margin-top: ${props => props.margin};
  margin-left: ${props => props.margin_left};
`;

export const EmissionText = styled.Text`
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
`;
