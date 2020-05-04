import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
  border-radius: 6px;
  background: #ebecf0;
  width: 250px;
  min-width: 250px;
  height: 480px;
`;

export const Title = styled.h5`
  padding: 8px;
  margin: 0;
  font-weight: bold;
`;

export const PersonList = styled.div`
  padding: 8px;
  min-height: 100px;
  flex-grow: 1;
`;
