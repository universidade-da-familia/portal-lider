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

export const ContentView = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0 50px 0 50px;
`;

export const NameView = styled.View`
  display: block;
  justify-content: center;
  width: 100%;
  height: 210.3pt;
`;

export const NameText = styled.Text`
  font-family: Gara;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
`;

// export const NameMeaningView = styled.Text`
//   display: block;
//   justify-content: center;
//   align-items: center;
//   width: 50%;
//   height: 179pt;
// `;

export const NameMeaningText = styled.Text`
  font-family: Gara;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;
