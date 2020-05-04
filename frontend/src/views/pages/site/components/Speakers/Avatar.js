import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Webcam from './Webcam';

import ytIcon from '../../media/icons/ytIcon.png';
import Item from './Item';

const YoutubeIcon = styled.img`
  opacity: 0.5;
  height: 80px;
`;

const Avatar = ({ speaker, handleSpeakerClick }) => (speaker.isYou ? (
  <Webcam />
) : (
  <Item speaker={speaker} onClick={handleSpeakerClick}>
    {!!speaker.videoId && <YoutubeIcon alt="youtube" src={ytIcon} />}
  </Item>
));

Avatar.propTypes = {
  speaker: PropTypes.shape({
    isYou: PropTypes.bool,
    videoId: PropTypes.string,
  }).isRequired,
  handleSpeakerClick: PropTypes.func.isRequired,
};

export default Avatar;
