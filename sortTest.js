//jshint esversion: 6
let array = [6,7,3,4,6,1,3,8];

function Swap(arr, i, j){
  var tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

function BubbleSort(arr) {
  for (var i = arr.length -1; i > 0; i--){
    for (var j = 1; j <= i; j++){
      if (arr[j-1] > arr[j]){
        Swap(arr, j-1, j);
      }
    }
  }
  return arr;
}

function SelectionSort(arr) {
  for (var i = 0; i < arr.length; i++){
    let minIdx = i;
    for (var j = i+1; j < arr.length; j++){
      if (arr[j] < arr[minIdx]){
        minIdx = j;
      }
    }
    if (i != minIdx){
      Swap(arr, minIdx, i);
    }
  }
  return arr;
}

function InsertionSort(arr) {
  for (var i = 1; i < arr.length; i++){
    var tmp = arr[i];
    for (var j = i -1; j > 0 && arr[j] > tmp; j--){
      arr[j+1] = arr[j];
    }
    arr[j+1] = tmp;
  }
  return arr;
}

console.log(BubbleSort(array));
console.log(SelectionSort(array));
console.log(SelectionSort(array));