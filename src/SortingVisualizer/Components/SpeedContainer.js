import React from 'react';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import FastForwardIcon from '@material-ui/icons/FastForward';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const SpeedContainer = () => {
    const [speed, setSpeed] = React.useState('slow');

    const handleSpeed = (event, newSpeed) => {
      setSpeed(newSpeed);
    };
  
    return (
      <ToggleButtonGroup
        value={speed}
        exclusive
        onChange={handleSpeed}
        aria-label="visualization speed"
        className="toggle-button-group"
      >
        <ToggleButton value="slow" aria-label="slow">
          <PlayArrowIcon className="toggle-button" />
        </ToggleButton>
        <ToggleButton value="fast" aria-label="fast">
          <FastForwardIcon className="toggle-button"/>
        </ToggleButton>
      </ToggleButtonGroup>
    );
}


export default SpeedContainer;