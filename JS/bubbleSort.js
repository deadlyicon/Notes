function bubbleSort(arr) {
  var len = arr.length;
  for(var i = len - 1; i >= 0; i--){
    for (var j = 1; j <= i; j++){
      if (arr[j-1] > arr[j]){
        swap(arr, j-1, j);
      }
    }
  }
  return arr;
}


function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

var arr = [7,4,6,10,2,9,3,5,8,1];
console.log(bubbleSort(arr));