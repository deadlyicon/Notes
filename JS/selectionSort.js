function selectionSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len; i++){
    var minIdx = i;
    for ( var j = i + 1; j < len; j++){
      if (arr[j] < arr[minIdx]){
        minIdx = j;
      }
    }
    if (minIdx != i){
      swap(arr, i, minIdx);
    }
  }
  return arr;
}

function swap(arr, i, j){
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
 }

var arr = [7,4,6,10,2,9,3,5,8,1];
console.log(selectionSort(arr));