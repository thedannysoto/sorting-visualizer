import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import SpeedContainer from './SpeedContainer';
import * as algorithmAnimations from '../Animations/animations';



const GenerateButton = withStyles({
  root: {
    boxShadow: 'none',
    color: 'white',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    marginTop: '30px',
    height: '40px',
    lineHeight: 1.5,
    backgroundColor: 'rgb(87, 87, 191)',
    borderColor: 'rgb(87, 87, 191)',
    '&:hover': {
      backgroundColor: 'rgb(73, 73, 164)',
      borderColor: 'rgb(87, 87, 191)',
      boxShadow: 'none',
    }
  },
})(Button);

const ButtonContainer = props => {

    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: 150,
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
        input: {
            color: 'white',
        },
        underline: {
          color: 'white'
        }
      }));
      
        const classes = useStyles();

        const [state, setState] = useState({
            algorithm: '',    
        });

        const [resetButton, setResetButton] = useState(true);
        const [sortButton, setSortButton] = useState(false);
        const [selectView, setSelectView] = useState(true);

        const [speed, setSpeed] = useState('slow');
      
        const handleChange = (event) => {
          const name = event.target.name;
          setState({
            ...state,
            [name]: event.target.value,
          });
          if (event.target.value !== '') {
            setSortButton(true);
          } else {
            setSortButton(false);
          }
        };

        const onClickResetHandler = () => {
          props.onClickGenerateHandler();
          if (state.algorithm !== '') {
            setSortButton(true);
          }
          setSelectView(true);
        }

        const onClickSortHandler = () => {
          const barArray = props.barArray;
          setResetButton(false);
          setSortButton(false);
          setSelectView(false);
          switch(state.algorithm) {
            case 'bubbleSort':
              let bubbleTime = (algorithmAnimations.bubbleSort(barArray, speed));
              setTimeout(() => {
                setResetButton(true);
              }, bubbleTime);
              break;
            case 'cocktailSort':
              let cocktailTime = algorithmAnimations.cocktailSort(barArray, speed);
              setTimeout(() => {
                setResetButton(true);
              }, cocktailTime);
              break;
            case 'heapSort':
              let heapTime = algorithmAnimations.heapSort(barArray, speed);
              setTimeout(() => {
                setResetButton(true);
              }, heapTime);
              break;
            case 'insertionSort':
              let insertionTime = algorithmAnimations.insertionSort(barArray, speed);
              setTimeout(() => {
                setResetButton(true);
              }, insertionTime);
              break;
            case 'mergeSort':
              let mergeTime = algorithmAnimations.mergeSort(barArray, speed);
              setTimeout(() => {
                setResetButton(true);
              }, mergeTime);
              break;
            case 'quickSort':
              let quickTime = algorithmAnimations.quickSort(barArray, speed);
              setTimeout(() => {
                setResetButton(true);
              }, quickTime);
              break;
            case 'radixSort':
              let radixTime = algorithmAnimations.radixSort(barArray, speed);
              setTimeout(() => {
                setResetButton(true);
              }, radixTime);
              break;
            case 'selectionSort':
              let selectionTime = algorithmAnimations.selectionSort(barArray, speed);
              setTimeout(() => {
                setResetButton(true);
              }, selectionTime);
              break;
            default:
              break;
          }
        }

    return (

        <div className="button-container">
            <div className="generate-button-container">
                <GenerateButton
                disabled={!resetButton} 
                variant="contained"
                onClick={onClickResetHandler}
                >
                  Reset Array
                </GenerateButton>
            </div>
            <div className="algorithm-select">
            <FormControl className={classes.formControl} id="algorithm-select">
                <InputLabel className={classes.input} htmlFor="sorting-algorithm">Sorting Algorithm</InputLabel>
                    <Select
                    disabled={!selectView}
                    className={classes.input}
                    native
                    value={state.algorithm}
                    onChange={handleChange}
                    disableUnderline
                    inputProps={{
                        name: 'algorithm',
                        id: 'sorting-algorithm',
                    }}
                    >
                        <option aria-label="None" value="" />
                        <option value={'bubbleSort'}>Bubble Sort</option>
                        <option value={'cocktailSort'}>Cocktail Sort</option>
                        <option value={'heapSort'}>Heap Sort</option>
                        <option value={'insertionSort'}>Insertion Sort</option>
                        <option value={'mergeSort'}>Merge Sort</option>
                        <option value={'quickSort'}>Quick Sort</option>
                        <option value={'radixSort'}>Radix Sort</option>
                        <option value={'selectionSort'}>Selection Sort</option>
                    </Select>
            </FormControl>
          </div>
            <SpeedContainer speed={speed} setSpeed={setSpeed}/>
            <GenerateButton
                disabled={!sortButton} 
                className="sort-array" 
                variant="contained"
                onClick={onClickSortHandler}
            >
                  Sort Array
            </GenerateButton>
        </div>


    );
}

export default ButtonContainer;