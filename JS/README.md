# Javascript Notes

# Table of Contents
1. [Array Methods](#Array-Methods)
2. [Closure](#Closure)

<a name="Array-Methods"></a>
## Array Methods
A list of common array methods.

* array.push
```myArray.push(3) //adds 3 to the end of an array```

* array.pop
```myArray.pop() //removes the last item on the end of an array.```

* array.shift
```myArray.shift(3) //adds 3 to the start of an array.```

* array.unshift
```myArray.unshift() //removes the first item in an array```

* array.forEach
Executes the function on each item of the array.
```myArry.forEach(function(i){console.log(i)})```

* array.map
Takes an array and outputs another array based on the function that is passed to .map
```javascript
const floats = [12.34,66.44,23.121,0.12,14.3]
const integers = floats.map(function(n){
  return Math.round(n)
```

array.filter
.filter returns any item in the array that test for true based on the function provided.
```javascript
const numbers = [1,2,3,4,5,6,7,8,9]
const lessThan5 = numbers.filter(function(n){ return n < 5 })
```

array.reduce
.reduce reduces the array to a single value. For example:
```javascript
const numbers = [1,2,3,4,5,6,7,8,9]

let sum = numbers.reduce(function(sum, number){
  return sum + number
}, 0)
```
The end value is a starting value, if not provided then the first item in the array will be used. Can be used to reduce an array to a single value.



<a name="Closure"></a>
## Closure
A _closure_ is a combination of a function and the lexical environment within which that function was declared. For example:

```javascript
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
```

```add5``` and ```add10``` are _closures_. Basically we made ```makeAdder``` a function factory and now ```add5``` and ```add10``` are functions which have access to the code in the original makeAdder function but have different parameters as were declared when ```add5``` and ```add10``` were created. Given the similarly to OOP, you may use a closure when you have an object with just one method.