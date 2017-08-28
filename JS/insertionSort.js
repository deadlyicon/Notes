function insertionSort(arr) {
  const len = arr.length;

  for (var i = 1; i < len; i++){
    var tmp = arr[i];
    for (var j = i -1; j >= 0 && arr[j] > tmp; j--){
      arr[j + 1] = arr[j];
    }
    arr[j+1] = tmp;
  }

  return arr;
}

arr = [5,3,7,9,2,10,7,4,3,8];
console.log(insertionSort(arr));