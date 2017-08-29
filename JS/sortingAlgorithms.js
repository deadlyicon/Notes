function bubbleSort( array ) {
  const len = array.length;
  for (var i = len - 1; i >= 0; i--){
    for (var j = 1; j <= i; j++){
      if (array[j-1] > array[j]){
        swap(array, j-1, j);
      }
    }
  }
  return array;
}


function selectionSort( array ) {
  const len = array.length;
  for ( var i = 0; i < len; i++){
    let minIdx = i;
    for ( var j = i + 1; j < len; j++){
      if (array[j] < array[minIdx]){
        minIdx = j;
      }
    }
    if (i != minIdx) {
      swap(array, i, minIdx);
    }
  }
  return array;
}


function insertionSort( array ) {
  const len = array.length;
  for (var i = 1; i < len; i++){
    let tmp = array[i];
    for (var j = i - 1; j >= 0 && array[j] > tmp; j--){
      array[j+1] = array[j];
    }
    array[j+1] = tmp;
  }

  return array;
}


function swap( array, i ,j ){
  let tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}

/*
 * Validate your sorting implementation by calling your functions on the
 * input, below, and comparing their results to the results of using JavaScript's
 * Array.prototype.sort()
 */


var testInput = [ 9, 3, 1, 2, 1000, 15, 83, 75, 84, 200000, 42 ];
var testInput2 = [ 9, 3, 1, 2, 1000, 15, 83, 75, 84, 200000, 42 ];
var testInput3 = [ 9, 3, 1, 2, 1000, 15, 83, 75, 84, 200000, 42 ];
var testInput4 = [ 9, 3, 1, 2, 1000, 15, 83, 75, 84, 200000, 42 ];


console.log(bubbleSort(testInput));
console.log(selectionSort(testInput2));
console.log(insertionSort(testInput3));

testInput4.sort(function(a,b){
  return a - b;
});

console.log(testInput4);
