import React from 'react';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import FastForwardIcon from '@material-ui/icons/FastForward';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';


const SpeedContainer = props => {
    // const [speed, setSpeed] = React.useState('slow');

    const handleSpeed = (event, newSpeed) => {
      if (newSpeed !== null) {
          props.setSpeed(newSpeed);
      }
    };

    const style = {
        color: 'white',
        '&:hover': {
            backgroundColor: 'blue'
        } 
    }
  
    return (
        <div className="toggle-div">
        <div className="toggle-label">
            <label>Speed</label>
        </div>
        <ToggleButtonGroup
                value={props.speed}
                exclusive
                onChange={handleSpeed}
                aria-label="visualization speed"
                className="toggle-button-group"
                
            >
                <ToggleButton 
                    value="slow" 
                    aria-label="slow" 
                    // className="toggle"
                    style={style}
                    
                >
                <PlayArrowIcon className="toggle" />
                </ToggleButton>
                <ToggleButton value="fast" aria-label="fast" style={style}>
                <FastForwardIcon className="toggle-button"/>
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
}


export default SpeedContainer;