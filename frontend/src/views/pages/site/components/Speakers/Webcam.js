import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import WebcamLib from 'react-webcam';
import globals from '../../utils/globals';
import { checkCameraPermission } from '../../utils/tools';
import Item from './Item';

const StyledWebcam = styled(WebcamLib)`
  height: 230px;
  border-radius: 50%;
`;

const StyledSurpriseSpeaker = styled.h4`
  color: ${globals.colors.main};
  padding: 0 30px;
  margin: 0;
  text-align: center;
  font-size: 0.9em;
`;

const SurpriseSpeaker = () => (
  <StyledSurpriseSpeaker>
    Clique aqui e libere o acesso a câmera para uma experiência fantástica
  </StyledSurpriseSpeaker>
);

const permissionsToUseWebcam = ['allow', 'requesting'];

const Webcam = () => {
  const [permission, setPermission] = useState(false);

  const fetch = async () => {
    const camPermission = await checkCameraPermission();
    setPermission(camPermission);
  };

  useEffect(() => {
    fetch();
  }, []);

  const isAllowed = permissionsToUseWebcam.includes(permission);

  return (
    <Item
      onClick={() => setPermission('requesting')}
      speaker={{
        avatar: '',
      }}
    >
      {isAllowed ? <StyledWebcam audio={false} /> : <SurpriseSpeaker />}
    </Item>
  );
};

export default Webcam;
