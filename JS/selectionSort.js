function selectionSort(arr){
  var len = arr.length;

  for (var i = 0; i < len; i++){
    var minIdx = i;
    for (var j = i + 1; j < len; j++){
      if (arr[j] < arr[minIdx]){
        minIdx = j;
      }
    }
    var temp = arr[i];
    arr[i] = arr[minIdx];
    arr[minIdx] = temp;
  }
  return arr;
}

console.log(selectionSort([8,5,2,6]));