// MERGE SORT
export function mergeSort(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxArray,
    animations
) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxArray, animations); 
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxArray,
    animations
) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx ) {
        // compared values pushed to change color
        animations.push([i, j]);
        // compared values pushed again to change to 2nd color
        animations.push([i, j]);
        if (auxArray[i] <= auxArray[j]) {
            // overwrite value at index k in the original array with
            // the value at index i in the auxilary array
            animations.push([k, auxArray[i]]);
            mainArray[k++] = auxArray[i++];
        } else {
            // overwrite value at index k in the original array with
            // value at index j in the aux array
            animations.push([k, auxArray[j]]);
            mainArray[k++] = auxArray[j++];
        }
    }
    while (i <= middleIdx) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxArray[i]]);
        mainArray[k++] = auxArray[i++];
    }
    while(j <= endIdx) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxArray[j]]);
        mainArray[k++] = auxArray[j++];
    }
}

// BUBBLE SORT
export function bubbleSort(array) {
    const animations = [];
    for (let x = 0; x < array.length; x++) {
        for (let y = 0; y < array.length-x-1; y++) {
            // compared values pushed for yellow color change
            animations.push([y, y+1]);
            // Swap bar values if the first bar is bigger than 2nd
            if (array[y] > array[y+1]) {
                bubbleSwap(array, y, y+1);
                animations.push([y, array[y], y+1, array[y+1]])
            } else {
                animations.push([y, array[y], y+1, array[y+1]])
            }
            // If end of the array, send 'true' to change bar color to blue
            if (y === array.length-x-2) {
                animations[animations.length-1] = [y, array[y], y+1, array[y+1], true];
            }
        }
    }
    return animations;
}

function bubbleSwap(array, a, b) {
    let temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

// QUICK SORT
export function quickSort(arr, start, end, animations) {
    if(start >= end) return;

    let index = quickSortPartition(arr, start, end, animations);
    quickSort(arr, start, index - 1, animations);
    quickSort(arr, index + 1, end, animations);

    return animations;
}

function quickSortPartition(arr, start, end, animations) {
    let pivotIndex = start;
    // push pivotIndex to highlight in yellow
    animations.push([pivotIndex]);
    let pivotValue = arr[end];
    // push end inded to highlight in yellow
    animations.push([end]);
    for (let i = start; i < end; i++) {
        if(arr[i] < pivotValue) {
            // swap values of bars
            bubbleSwap(arr, i, pivotIndex)
            // push index and bar height of bars to be switched
            animations.push([i, arr[i], pivotIndex, arr[pivotIndex]])
            pivotIndex++;
            // push new pivotIndex to highlight in yellow
            animations.push([pivotIndex]);
        }
    }
    bubbleSwap(arr, pivotIndex, end);
    // push index and bar height of final bar to be switched
    animations.push([pivotIndex, arr[pivotIndex], end, arr[end], true]);
    return pivotIndex;
}

// SELECTION SORT
export function selectionSort(arr, animations) {
    let index = 0;
    while (index < arr.length) {
        let min = arr[index];
        let minIndex = index;
        for (let x = index; x < arr.length; x++) {
            // push index of bar to be highlighted in yellow
            animations.push([x]);
            if (arr[x] < min) {
                min = arr[x];
                minIndex = x;
            }
        }
        animations.push([index, arr[index], minIndex, arr[minIndex]]);
        let temp = arr[index];
        arr[index] = arr[minIndex];
        arr[minIndex] = temp;
        index++;
    }
    return animations;
}

// HEAP SORT
export function heapSort(array) {
    const animations = [];
    if (array.length < 2) return array;
    let arrayLength = array.length;
    // orders array in Max Heap format
    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
        sortParentAndChild(array, arrayLength, i, animations);
    }
    for (let i = array.length - 1; i > 0; i--) {
        // swap largest value to end of array
        animations.push([0, array[0], i, array[i]]);
        bubbleSwap(array, 0, i);
        animations.push([0, array[0], i, array[i], true]);
        arrayLength--;
        sortParentAndChild(array, arrayLength, 0, animations);
    }
    return animations;
}

function sortParentAndChild(array, arrayLength, parentIndex, animations) {
    const leftIndex = parentIndex * 2 + 1;
    const rightIndex = parentIndex * 2 + 2;
    let maxIndex = parentIndex;
    if (leftIndex < arrayLength && array[leftIndex] > array[maxIndex]) {
        maxIndex = leftIndex;
    }
    if (rightIndex < arrayLength && array[rightIndex] > array[maxIndex]) {
        maxIndex = rightIndex;
    }
    if (maxIndex !== parentIndex) {
        animations.push([parentIndex, array[parentIndex], maxIndex, array[maxIndex]]);
        bubbleSwap(array, parentIndex, maxIndex);
        animations.push([parentIndex, array[parentIndex], maxIndex, array[maxIndex]]);
        sortParentAndChild(array, arrayLength, maxIndex, animations);
    }
}

// INSERTION SORT
export function insertionSort(array) {
    const animations = []
    for (let a = 0; a < array.length; a++) {
        let b = a;
        // animations.push([b]);
        while (b > 0 && array[b-1] > array[b]) {
            animations.push([b, b-1]);
            bubbleSwap(array, b, b-1);
            animations.push([b, array[b], b-1, array[b-1]]);
            b--;
        }
    }
    return animations;

}

// COCKTAIL SORT
export function cocktailSort(array) {
    const animations = [];
    if (array.length < 2) return array;
    let swapped;
    let indexForward = 0;
    let indexBackward = array.length - 1;
    do {
        swapped = false;
        for (let i = indexForward; i < indexBackward; i++) {
            animations.push([i]);
            animations.push([i]);
            if (array[i] > array[i + 1]) {
                animations.push([i, i+1]);
                bubbleSwap(array, i, i + 1);
                animations.push([i, array[i], i+1, array[i+1]]);
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
        indexBackward--;
        for (let i = indexBackward - 1; i >= indexForward; i--) {
            animations.push([i]);
            animations.push([i]);
            if (array[i] > array[i+1]) {
                animations.push([i, i+1]);
                bubbleSwap(array, i, i + 1);
                animations.push([i, array[i], i+1, array[i+1]]);
                swapped = true;
            }
        }
        indexForward++;
    } while(swapped)
    return animations;
}
