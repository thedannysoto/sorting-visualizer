import * as sortingAlgorithms from '../Algorithms/sortingAlgorithms';

const SECONDARY_COLOR = 'yellow';
const finalColor = (height) => {
    const barHeight = parseInt(height.split("px")[0]);
    const multiplier = 1 - (barHeight / 510);
    const greenValue = Math.floor(255 * multiplier);
    return `rgb(0, ${greenValue}, 255)`;
};

// MERGE SORT

export function mergeSort(barArray, speed) {
    speed = speed === 'slow' ? 10 : 3;
    const animations = sortingAlgorithms.mergeSort(barArray);
    for (let i = 0; i < animations.length; i++) {
       const arrayBars = document.getElementsByClassName('array-bar');
       const isColorChange = i % 3 !== 2;
       if (isColorChange) {
           const [barOneIdx, barTwoIdx] = animations[i];
           const barOneStyle = arrayBars[barOneIdx].style;
           const barTwoStyle = arrayBars[barTwoIdx].style;
           if (i % 3 === 0) {
                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                }, i * speed);
           } else {
               setTimeout(() => {
                   barOneStyle.backgroundColor = finalColor(barOneStyle.height);
                   barTwoStyle.backgroundColor = finalColor(barTwoStyle.height);

               }, i * speed);
            } 
        } else {
           setTimeout(() => {
               const [barOneIdx, newHeight] = animations[i];
               const barOneStyle = arrayBars[barOneIdx].style;
               barOneStyle.height = `${newHeight}px`;
               barOneStyle.backgroundColor = finalColor(barOneStyle.height);
           }, i * speed);
       }
    }
    return animations.length * speed;
}

// BUBBLE SORT

export function bubbleSort(barArray, speed) {
    speed = speed === 'slow' ? .4 : .1;
    const animations = sortingAlgorithms.bubbleSort(barArray);
    for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const barOneIdx = animations[i][0];
        const barTwoIdx = animations[i][2];
        const isColorChange = i % 2 !== 1;
        // Color change for yellow bars
        if (isColorChange) {
            const [firstBarIdx, secondBarIdx] = animations[i];
            const firstBarStyle = arrayBars[firstBarIdx].style;
            const secondBarStyle = arrayBars[secondBarIdx].style;
            const color = SECONDARY_COLOR;
            setTimeout(() => {
                firstBarStyle.backgroundColor = color;
                secondBarStyle.backgroundColor = color;
            }, i * speed);
        // Color change back to red and switch bar heights
        } else {
            setTimeout(() => {
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                barOneStyle.backgroundColor = 'red';
                barTwoStyle.backgroundColor = 'red';
                barOneStyle.height = `${animations[i][1]}px`;
                barTwoStyle.height = `${animations[i][3]}px`;
            }, i * speed);
        }
        // Color change to blue if it's the final bar
        if (animations[i][4]) {
            setTimeout(() => {
                const barTwoStyle = arrayBars[barTwoIdx].style;
                barTwoStyle.backgroundColor = finalColor(barTwoStyle.height);
            }, i * speed);
        }
    }

    // Color change smallest bar to blue at the end
    const arrayBars = document.getElementsByClassName('array-bar');
    setTimeout(() => {
        arrayBars[0].style.backgroundColor = finalColor(arrayBars[0].style.height);
    }, animations.length * speed); 
    return animations.length * speed;
}
    
// QUICK SORT

export function quickSort(barArray, speed) {
    speed = speed === 'slow' ? 9 : 3.5;
    let animations = [];
    animations = sortingAlgorithms.quickSort(barArray, 0, barArray.length-1, animations);
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
        if (animations[i].length === 1) {
            // set pivot index and pivot bar to yellow
            setTimeout(() => {
            arrayBars[animations[i][0]].style.backgroundColor = SECONDARY_COLOR;
            }, i * speed);
        } else {
            // Set bars being switched to final blue color
            setTimeout(() => {
                const barOneIdx = animations[i][0];
                const barTwoIdx = animations[i][2];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                if (animations[i][4]) {
                    barOneStyle.height = `${animations[i][1]}px`;
                    barTwoStyle.height = `${animations[i][3]}px`;
                } else if (animations[i][1] !== animations[i][3]) {
                    barOneStyle.height = `${animations[i][1]}px`;
                    // barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = `${animations[i][3]}px`;
                }
                barOneStyle.backgroundColor = finalColor(barOneStyle.height);
                barTwoStyle.backgroundColor = finalColor(barTwoStyle.height);
            }, i * speed);
        }
    }
    return animations.length * speed;
}

// SELECTION SORT

export function selectionSort(barArray, speed) {
    speed = speed === 'slow' ? .5 : .1;
    let animations = [];
    animations = sortingAlgorithms.selectionSort(barArray, animations);
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
        if (animations[i].length === 1 && i !== animations.length - 1) {
            setTimeout(() => {
                const barCurrentIdx = animations[i];
                // Set previous bar back to red
                if (i > 0) {
                    const barPreviousStyle = arrayBars[barCurrentIdx - 1].style;
                    if (barPreviousStyle.backgroundColor === SECONDARY_COLOR) {
                        barPreviousStyle.backgroundColor = 'red';
                    }
                }
                // Set current bar to yellow
                const barCurrentStyle = arrayBars[barCurrentIdx].style;
                barCurrentStyle.backgroundColor = SECONDARY_COLOR;
            }, i * speed);
          // Switch bar heights and set lowest height to final blue color  
        } else if (animations[i].length === 4) {
            setTimeout(() => {
                const barOneIdx = animations[i][0];
                const barTwoIdx = animations[i][2];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                barOneStyle.height = `${animations[i][3]}px`;
                barTwoStyle.height = `${animations[i][1]}px`;
                barOneStyle.backgroundColor = finalColor(barOneStyle.height);
            }, i * speed);
        }
    }
    return animations.length * speed;
}

// HEAP SORT

export function heapSort(barArray, speed) {
    speed = speed === 'slow' ? 6 : 1;
    const animations = sortingAlgorithms.heapSort(barArray);
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
        console.log(animations[i]);
        const barOneIdx = animations[i][0];
        const barTwoIdx = animations[i][2];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        // Color change to yellow bars
        if (i % 2 === 0 && animations[i].length === 4) {
            setTimeout(() => {
                barOneStyle.backgroundColor = SECONDARY_COLOR;
                barTwoStyle.backgroundColor = SECONDARY_COLOR;
            }, i * speed);
        // Color change back to red during max heap reordering
        } else if (i % 2 === 1 && animations[i].length === 4) {
            setTimeout(() => {
                barOneStyle.height = `${animations[i][1]}px`;
                barTwoStyle.height = `${animations[i][3]}px`;
                barOneStyle.backgroundColor = 'red';
                barTwoStyle.backgroundColor = 'red';
            }, i * speed);
        // color change final swap to blue
        } else {
            setTimeout(() => {
                barOneStyle.height = `${animations[i][1]}px`;
                barTwoStyle.height = `${animations[i][3]}px`;
                barOneStyle.backgroundColor = 'red';
                barTwoStyle.backgroundColor = finalColor(barTwoStyle.height);
            }, i * speed);
        }
    }
    // Color change smallest bar to blue at the end
    setTimeout(() => {
        arrayBars[0].style.backgroundColor = finalColor(arrayBars[0].style.height);
    }, animations.length * speed);
    return animations.length * speed;
}

// INSERTION SORT

export function insertionSort(barArray, speed) {
    speed = speed === 'slow' ? .5 : .1;
    const animations = sortingAlgorithms.insertionSort(barArray);
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
        const barOneIdx = animations[i][0];
        const barOneStyle = arrayBars[barOneIdx].style;
        if (animations[i].length === 2) {
            const barTwoIdx = animations[i][0];
            const barTwoStyle = arrayBars[barTwoIdx].style;
            // set compared bars to yellow
            setTimeout(() => {
                barOneStyle.backgroundColor = SECONDARY_COLOR;
                barTwoStyle.backgroundColor = SECONDARY_COLOR;
            }, i * speed);
        } else {
            const barTwoIdx = animations[i][2];
            const barTwoStyle = arrayBars[barTwoIdx].style;
            // swap bar heights and set color to blue
            setTimeout(() => {
                barOneStyle.height = `${animations[i][1]}px`
                barTwoStyle.height = `${animations[i][3]}px`
                barOneStyle.backgroundColor = finalColor(barOneStyle.height);
                barTwoStyle.backgroundColor = finalColor(barTwoStyle.height);
            }, i * speed);
        }
    }
     // Color change smallest bar to blue at the end
     setTimeout(() => {
        arrayBars[0].style.backgroundColor = finalColor(arrayBars[0].style.height);
    }, animations.length * speed);
    return animations.length * speed;
}

// COCKTAIL SORT

export function cocktailSort(barArray, speed) {
    speed = speed === 'slow' ? .3 : .1;
    const animations = sortingAlgorithms.cocktailSort(barArray);
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
        const barOneIdx = animations[i][0];
        const barOneStyle = arrayBars[barOneIdx].style;
        if (i === 0) {
            // set first bar to blue
            setTimeout(() => {
                barOneStyle.backgroundColor = finalColor(barOneStyle.height);
            }, i * speed);
        } else if (animations[i].length === 1 && animations[i][0] !== animations[i-1][0]) {
            // set index value bar to yellow
            setTimeout(() => {
                barOneStyle.backgroundColor = SECONDARY_COLOR;
            }, i * speed);
        } else if (animations[i].length === 1) {
            // set index value bar to blue from yellow
            setTimeout(() => {
                barOneStyle.backgroundColor = finalColor(barOneStyle.height);
            }, i * speed);
        } else if (animations[i].length === 2) {
            // set compared bars to yellow
            setTimeout(() => {
                const barTwoIdx = animations[i][1];
                const barTwoStyle = arrayBars[barTwoIdx].style;
                barOneStyle.backgroundColor = SECONDARY_COLOR;
                barTwoStyle.backgroundColor = SECONDARY_COLOR;
            }, i * speed);
        } else {
            // switch heights of bars and set to blue
            setTimeout(() => {
                const barTwoIdx = animations[i][2];
                const barTwoStyle = arrayBars[barTwoIdx].style;
                barOneStyle.height = `${animations[i][1]}px`;
                barTwoStyle.height = `${animations[i][3]}px`;
                barOneStyle.backgroundColor = finalColor(barOneStyle.height);
                barTwoStyle.backgroundColor = finalColor(barTwoStyle.height);
            }, i * speed);
        }
    }
    return animations.length * speed;
}

// RADIX SORT

export function radixSort(barArray, speed) {
    speed = speed === 'slow' ? 8 : 4;
    const animations = sortingAlgorithms.radixSort(barArray);
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
        const barOneIdx = animations[i][0];
        if (i === 0) {
            // set first bar to blue
            setTimeout(() => {
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.backgroundColor = finalColor(barOneStyle.height);
            }, i * speed);
        } else if (animations[i].length === 1 && animations[i][0] !== animations[i-1][0]) {
            // set index value bar to yellow
            setTimeout(() => {
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.backgroundColor = SECONDARY_COLOR;
            }, i * speed);
        } else if (animations[i].length === 1) {
            // set index value bar to blue from yellow
            setTimeout(() => {
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.backgroundColor = finalColor(barOneStyle.height);
            }, i * speed);
        
        } else {
            // switch heights of bars and set to blue according to radix array
            setTimeout(() => {
                console.log(animations[i][0]);
                // iterate through radix array and match bar heights
                for (let x = 0; x < animations[i][0].length; x++) {
                    if (x % 2 === 0) {
                        let newBarIdx = animations[i][0][x];
                        let newBarStyle = arrayBars[newBarIdx].style;
                        newBarStyle.height = `${animations[i][0][x+1]}px`;
                        newBarStyle.backgroundColor = finalColor(newBarStyle.height);
                    }
                }
            }, i * speed);
        }
    }
    return animations.length * speed;
}
