import React from 'react';
import Icon from './Icon';
import globals from '../../utils/globals';

const Facebook = ({ data }) => (
  <Icon>
    <a
      title={`Visite o perfil de ${data.name}`}
      rel="noopener noreferrer"
      href={data.facebook}
      target="_blank"
    >
      <svg id="facebook" width="48px" height="48px" viewBox="0 0 510 510">
        <g>
          <g id="post-facebook">
            <path
              fill={globals.colors.primary}
              d="M459,0H51C22.95,0,0,22.95,0,51v408c0,28.05,22.95,51,51,51h408c28.05,0,51-22.95,51-51V51C510,22.95,487.05,0,459,0z
                       M433.5,51v76.5h-51c-15.3,0-25.5,10.2-25.5,25.5v51h76.5v76.5H357V459h-76.5V280.5h-51V204h51v-63.75
                      C280.5,91.8,321.3,51,369.75,51H433.5z"
            />
          </g>
        </g>
      </svg>
    </a>
  </Icon>
);

export default Facebook;
