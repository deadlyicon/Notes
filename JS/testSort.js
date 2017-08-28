


/*function insertionSort(arr) {
  const len = arr.length;

  for (var i = 1; i < len; i++){
    let tmp = arr[i];

    for (var j = i - 1; j >= 0 && arr[j] > tmp; j--){
      arr[j+1] = arr[j];
    }
    arr[j+1] = tmp;
   }
  return arr;
}

*/

/*function selectionSort(arr) {
  const len = arr.length;

  for (var i = 0; i < len; i++){
    let minIdx = i;
    for (var j = i + 1; j < len; j++){
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (i != minIdx) {
      swap(arr, i, minIdx);
    }

  }


  return arr;
}*/

/*function bubbleSort(arr){
  const len = arr.length;
  for(var i = len - 1; i >= 0; i--){
    for(var j = 1; j <= i; j++){
      if (arr[j-1] > arr[j]){
        swap(arr,j-1, j);
      }
    }
  }
  return arr;
}
*/

function swap(arr, i, j){
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

let arr = [5,3,6,9,2,10,7,4,1,8];
// console.log(bubbleSort(arr));
console.log(selectionSort(arr));
// console.log(insertionSort(arr));
