import { Font } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';

Font.register({
  family: 'Open Sans',
  src:
    process.env.NODE_ENV === 'development'
      ? `http://${document.location.hostname}:3000/fonts/OpenSans-Bold.ttf`
      : 'https://lider.udf.org.br/fonts/OpenSans-Bold.ttf',
});

export const ContentView = styled.View`
  flex: 1;
  padding: 5px;
`;

// export const TextMarginView = styled.View`
//   margin-bottom: 10;
// `;

export const TextView = styled.View``;

export const NameText = styled.Text`
  font-size: 12px;
  font-family: 'Open Sans';
  font-weight: bold;
`;
