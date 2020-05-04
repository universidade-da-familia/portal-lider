import { Button as RButton } from 'reactstrap';

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const Button = styled(RButton)`
  background: #ebecf0 !important;
  font-size: 15px !important;
  color: #333 !important;
  border: none !important;
  padding: 6px 8px;
  margin: 8px;
  min-width: 180px;
  max-height: 40px;

  :hover {
    background: #dddde0 !important;
    border: none !important;
  }
`;
