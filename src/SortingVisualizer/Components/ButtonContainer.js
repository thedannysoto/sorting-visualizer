import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import SpeedContainer from './SpeedContainer';


const GenerateButton = withStyles({
  root: {
    boxShadow: 'none',
    color: 'white',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    marginTop: '30px',
    marginLeft: '50px',
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
      }));
      
      
        const classes = useStyles();
        const [state, setState] = useState({
            algorithm: '',
            generator: '',    
        });
      
        const handleChange = (event) => {
          const name = event.target.name;
          setState({
            ...state,
            [name]: event.target.value,
            generator: event.target.value
          });
          console.log(state);
        };

    return (

        <div className="button-container">
            <div className="generate-button-container">
                <GenerateButton className="generate-button" variant="contained">Reset Array</GenerateButton>
            </div>
            <div className="algorithm-select">
            <FormControl className={classes.formControl}>
                <InputLabel className={classes.input} htmlFor="sorting-algorithm">Sorting Algorithm</InputLabel>
                    <Select
                    className={classes.input}
                    native
                    value={state.algorithm}
                    onChange={handleChange}
                    inputProps={{
                        name: 'algorithm',
                        id: 'sorting-algorithm',
                    }}
                    >
                        <option aria-label="None" value="" />
                        <option value={'BubbleSort'}>Bubble Sort</option>
                        <option value={'CocktailSort'}>Cocktail Sort</option>
                        <option value={'HeapSort'}>Heap Sort</option>
                        <option value={'InsertionSort'}>Insertion Sort</option>
                        <option value={'MergeSort'}>Merge Sort</option>
                        <option value={'QuickSort'}>Quick Sort</option>
                        <option value={'RadixSort'}>Radix Sort</option>
                        <option value={'SelectionSort'}>Selection Sort</option>
                    </Select>
            </FormControl>
          </div>
            {/* <button className="generate-button" onClick={props.onClickGenerateHandler}>Generate New Array</button> */}
            {/* <button className="button" onClick={props.onClickMergeHandler}>Merge Sort</button>
            <button className="button" onClick={props.onClickBubbleHandler}>Bubble Sort</button>
            <button className="button" onClick={props.onClickQuickHandler}>Quick Sort</button>
            <button className="button" onClick={props.onClickSelectionHandler}>Selection Sort</button>
            <button className="button" onClick={props.onClickHeapHandler}>Heap Sort</button>
            <button className="button" onClick={props.onClickInsertionHandler}>Insertion Sort</button>
            <button className="button" onClick={props.onClickCocktailHandler}>Cocktail Sort</button>
            <button className="button" onClick={props.onClickRadixHandler}>Radix Sort</button> */}

            <SpeedContainer />
        </div>


    );
}

export default ButtonContainer;