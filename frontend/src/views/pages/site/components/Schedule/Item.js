import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-top: 1px solid #333;
  padding: 1em 0 0.5em;

  @media screen and (max-width: 600px) {
    padding: 0.9em;
  }
`;

const Time = styled.div`
  font-size: 1.5em;
  padding-left: 1.3em;
  min-width: 115px;
  width: 115px;

  @media screen and (max-width: 600px) {
    min-width: 70px;
    width: 70px;
  }
`;

const Event = styled.h2`
  width: 100%;
  margin: 0;
`;

const Description = styled.h3`
  font-weight: lighter
  font-size: 1.3em;
  margin: 0;
`;

const EventDescriptionWrapper = styled.div`
  margin-left: 10px;
`;

const Item = ({ time, event, description }) => (
  <StyledItem>
    <Time>{time}</Time>
    <EventDescriptionWrapper>
      <Event>{event}</Event>
      {!!description && <Description>{description}</Description>}
    </EventDescriptionWrapper>
  </StyledItem>
);

Item.defaultProps = {
  description: '',
};

Item.propTypes = {
  time: PropTypes.string.isRequired,
  event: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default Item;
