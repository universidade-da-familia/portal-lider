import styled from 'styled-components';

export const Container = styled.div`
  user-select: none;
  display: flex;
  flex: 1;
  margin: 6px 0px;
  padding: 8px;
  background: #fff;
  border-radius: 6px;
  -webkit-box-shadow: 0px 2px 2px 0px rgba(125, 125, 125, 0.5);
  -moz-box-shadow: 0px 2px 2px 0px rgba(125, 125, 125, 0.5);
  box-shadow: 0px 2px 2px 0px rgba(125, 125, 125, 0.5);

  :hover {
    background: #efefef !important;
  }
`;

export const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
`;

export const RightContainer = styled.div`
  flex: 1;
`;

export const Name = styled.p`
  font-size: 13px;
  font-weight: bold;
  margin: 0;
`;

export const Age = styled.p`
  font-size: 13px;
  margin: 0;
`;

export const PersonIdContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PersonType = styled.span`
  padding: 0px 4px;
  background: ${props => (props.organizator ? '#6b2075' : '#ececec')};
  color: ${props => (props.organizator ? '#fff' : '#333')};
  font-size: 11px;
  border-radius: 4px;
`;

export const Identificator = styled.span`
  font-size: 12px;
`;
