import React, { useState } from 'react';
import 'react-modal-video/css/modal-video.min.css';
import ModalVideo from 'react-modal-video';

import { useSelector } from 'react-redux';

import Container from './Container';
import Cards from './Cards';
import Speaker from './Speaker';
import { Title } from '../Title';

export default function Speakers() {
  const [video, setVideo] = useState('');
  const [isOpen, setOpen] = useState(false);

  const data = useSelector(state => state.siteEvent.data);

  const handleSpeakerClick = speaker => {
    if (speaker.videoId) {
      setVideo(speaker.videoId);
      setOpen(true);
    }
  };

  return (
    data !== null && (
      <Container>
        <Title title="Organizadores" />
        <Cards>
          {data.organizators.map(speaker => (
            <Speaker
              key={speaker.id}
              speaker={speaker}
              handleSpeakerClick={() => handleSpeakerClick(speaker)}
            />
          ))}
        </Cards>

        <ModalVideo
          channel="youtube"
          isOpen={isOpen}
          videoId={video}
          onClose={() => setOpen(false)}
        />
      </Container>
    )
  );
}
