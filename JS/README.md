# Javascript Notes


# Table of Contents
1. [Array Methods](#Array-Methods)
  * [Array soriting](#Array-Sorting)
2. [Object Keys and Values](#Object-Keys-and-Values)
3. [Functions](#Functions)
4. [Closure](#Closure)
5. [getElementById](#getElementById)
6. [Callbacks](#Callbacks)
7. [ECMAScript 2015](#ECMAScript-2017)
9. [MVC](#MVC)
10.[String Manipulation](#String-Manipulation)


<a name="Array-Methods"></a>
## Array Methods
A list of common array methods.

**array.push**
```myArray.push(3) //adds 3 to the end of an array```

**array.pop**
```myArray.pop() //removes the last item on the end of an array.```

**array.shift**
```myArray.shift(3) //adds 3 to the start of an array.```

**array.unshift**
```myArray.unshift() //removes the first item in an array```

**array.forEach**
Executes the function on each item of the array.
```myArry.forEach(function(i){console.log(i)})```

**array.map**
Takes an array and outputs another array based on the function that is passed to .map
```javascript
const floats = [12.34,66.44,23.121,0.12,14.3]
const integers = floats.map(function(n){
  return Math.round(n)
```

**array.filter**
.filter returns any item in the array that test for true based on the function provided.
```javascript
const numbers = [1,2,3,4,5,6,7,8,9]
const lessThan5 = numbers.filter(function(n){ return n < 5 })
```

**array.reduce**
.reduce reduces the array to a single value. For example:
```javascript
const numbers = [1,2,3,4,5,6,7,8,9]

let sum = numbers.reduce(function(sum, number){
  return sum + number
}, 0)
```
The end value is a starting value, if not provided then the first item in the array will be used. Can be used to reduce an array to a single value.



<a name="Array-Sorting"></a>
## Array Sorting

* ```Array#sort```
* Bubble agorithm sorting

1. You compare the first item with the second item. Acuatlly you start your loop at position ```arr[1]``` and then compare to the one behind it, ```arr[0]```. If the first item is bigger, ```arr[0]``` in the first loop, you swap them so the bigger item is in the second position.
2. You step into the next loop for j, and compare the second and third item. You swap them if the second item is bigger than the third, such that the largest of the two compared is always in the next arry position, ```arr[j]```.
3. Keep doing that, hence bubbling up the biggest item in the array to the last position.
4. Once we complete this first pass, we repeat this bubble process, starting from the first but ending at the second to last position in the array, because we already know the last position is the largest number from our previous pass.
5. These passes continue, comparing and swapping starting at the first position until the third to last, then fourth to last, fifth to last until we arrive at the first position in the array.
6. In the end you will have an ordered array.

```
function bubbleSort(arr){
   var len = arr.length;
   for (var i = len-1; i>=0; i--){
     for(var j = 1; j<=i; j++){
       if(arr[j-1]>arr[j]){
           var temp = arr[j-1];
           arr[j-1] = arr[j];
           arr[j] = temp;
        }
     }
   }
   return arr;
}
bubbleSort([7,5,2,4,3,9]); //[2, 3, 4, 5, 7, 9]
bubbleSort([9,7,5,4,3,1]); //[1, 3, 4, 5, 7, 9]
bubbleSort([1,2,3,4,5,6]); //[1, 2, 3, 4, 5, 6]
```

[Yay pictures!](http://codingmiles.com/sorting-algorithms-bubble-sort-using-javascript/)

* Insertion sort
* Selection sort

1. We start by assuming the that the first number in the array is the minimum.
2. We then look through the array and see if any value is smaller than what we have in the first first position.
3. If (when) we find that array location that contains a lesser value that our initial, in the first pass position ```arr[0]```, we change ```mindIdx``` to whatever value can be put in the index to give us our true, smaller value.
4. Now that we've found the locaiton of the smallest value, we swap some values.
  * a temp variable gets the value of our previsouly assumed lowest number
  * The actual smallest value gets put into our current array position, which starts at the first and works it's way up during the loops.
  * Finally, the previous current vaule that was our current position, that was our assumed smallest number, is placed into the ```arr[minIdx]``` location, essentially swapping values of ```arr[i]``` and ```arr[minIdx]```.
5. Repeat this process starting from the next position up in the array, ```arr[1]``` for example, and continune until the end of the array. You will have an ordered array.


```javascript
function selectionSort(arr){
  var len = arr.length;

  for(var i = 0; i < len; i++){
    var minIdx = i;
    for(var j = i + 1; j < len; j++){
      if(arr[j] < arr[minIdx]){
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
```


<a name="Object-Keys-and-Values"></a>
## Object Keys and Values
* How to return all the keys of an object:

```javascript
Object.keys(obj);
```

* How to return all the values of an object:

```javascript
values = Object.keys(obj).map(function(key){
  return obj(key);
})
````


<a name="Functions"></a>
## Functions

**Named Functions**

A regular, named function declaration looks like the following. It will not run until it is explicitly called.

```javascript
function area(width, height){
  return width * height;
}

var size = area(4,5);
```


**Function Expressions**

A Function expression requires a ```;``` and the end and is used when the interpreter was expecting  an expression but got a function instead. This will not run until the variable that stores th function is called.

```javascript
var area = function(width, height){
  return width * height;
};

var size = area(3,4);
```


**IIFEs**

An immediately-invoked functions expression is a function expression, named or unnamed, that is executed right after it's creation. There are two slightly different syntax patterns:

```javascript
// variant 1, the preferred pattern
(function () { alert('something!');
})();

//variant 2
(function () { alert('something!');
}());
```

To turn your regular function into an IIFE you need to preform two steps.

1. You need to wrap the whole function in parentheses. As the name suggests, an IIFE must be a function expression, not a function definition. So, the purpose of the enclosing parentheses is to transform a function definition into an expression. This is because, in JavaScript, everything in parentheses is treated as an expression.

2. You need to add a pair of parentheses at the very end (variant 1), or right after the closing curly brace (variant 2), which causes the function to be executed immediately.

Here are three things to keep in mind when writing IIFEs.

1. If you assign a function to a variable, you don't need to enclose the whole function in parens, because it is already an expression.

```javascript
var sayWoohoo = function(){
  alert('Woohoo!');
}();
```

2. A semicolon is required at the end of an IIFE, otherwise your code may not work properly.

3. You can pass arguments to an IIFE, like so:

```javascript
(function (name, profession){
  console.log("My name is " + name + ". I'm an " + profession + ".");
})("Jackie Chan", "actor");  //output: My name is Jackie Chan, I'm an actor.
```


An IIFE is often used to create scope to encapsulate modules. Within the module there is a private scope that is self-contained and safe from unwanted or accidental modification. This technique, called the module pattern, is a powerful example of using closures to manage scope, and it’s heavily used in many of the modern JavaScript libraries (jQuery and Underscore, for example).



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

There are three points to remember with closures:

1. You can refer to variables defined outside of the current functions

```javascript
function setLocation(city){
  var country = 'France';

  function printLocation(){
    console.log('You are in ' + city + ', '' + country);
  }

  printLocation();
}
```
setLocation('Paris'); // output: You are in Paris, France


2. Inner functions can refer to variables defined in outer functions even after the latter have returned.

```javascript
function setLocation(city) {
  var country = "France";

  function printLocation() {
    console.log("You are in " + city + ", " + country);
  }

  return printLocation;
}

var currentLocation = setLocation ("Paris");

currentLocation();

```

3. Inner functions store their our function's variables by reference, not by value.

```javascript
function cityLocation() {
  var city = "Paris";

  return {
    get: function() { console.log(city); },
    set: function(newCity) { city = newCity; }
  };
}

var myLocation = cityLocation();

myLocation.get();           // output: Paris
myLocation.set('Sydney');
myLocation.get();           // output: Sydney
```



3.


<a name="getElementById"></a>
## getElementById
This is a hand function for grabbing something with JS from an html page.
Identify an element with an ```id``` tag in your html doc:
```html
<td>Lenny Bear: </td>
<td id="lennyBear">!</td>
```
Then in your JS file, run the following to get at and change that textContent:
```javascript
var lenny = 'He is a puppy face'
var elLennyBear = document.getElementById('lennyBear');
elLennyBear.textContent = lenny;
```

<a name="Callbacks"></a>
## Callbacks
Callbacks are functions that are executed asynchronously, or at a later time. Instead of the code reading top to bottom procedurally, async programs may execute different functions at different times based on the order and speed that earlier functions like http requests or files system reads happen.

A function that takes other functions as arguments or returns functions as its result is called a higher-order function, and the function that is passed as an argument is called a callback function. It’s named “callback” because at some point in time it is “called back” by the higher-order function.

Determining if a function is asynchronous or not depends a lot on context. Here is an example of a sync function, or one that uses blocking code. It runs sequentially from top to bottom.
```javascript
var myNumber = 1
function addOne() { myNumber++ } // define the function
addOne() // run the function
console.log(myNumber) // logs out 2
```

However, here is an example of an async function built for Node:
```javascript
var fs = require('fs')
var myNumber = undefined

function addOne(callback) {
  fs.readFile('number.txt', function doneReading(err, fileContents) {
    myNumber = parseInt(fileContents)
    myNumber++
    callback()
  })
}

function logMyNumber() {
  console.log(myNumber)
}

addOne(logMyNumber)
```

Callbacks are functions that get executed at some later time. You will want to use callbacks when you don't know _when_ some async operation will complete, but you do know _where_ the operations will complete, the last line of the async function! The top-to-bottom order that you declare callbacks does not matter so much, only the logical/hierarchical nesting of them. First your split your code up into functions, and then use callbacks to declare if one function depends on another function finishing.

In the above example, the ```logMyNumber``` function can get passed as an argument that will become the ```callback``` variable inside the ```addOne``` function. After ```readFile``` is done the ```callback``` variable will be invoked (```callback()```). Only functions can be invoked, anything else will cause an error.

When a function gets invoked in javascript the code inside that function will immediately get executed. In this case our log statement will execute since ```callback``` is actually ```logMyNumber```. Just because you _define_ a function doesn't mean it will execute, you have to _invoke_ a function for that to happen.

* Let's break down the example even more:

  1. The code is parsed, which means if there are any syntax errors they would make the program break. During this initial phase, fs and myNumber are declared as variables while addOne and logMyNumber are declared as functions. Note that these are just declarations. Neither function has been called nor invoked yet.

  2. When the last line of our program gets executed addOne is invoked with the logMyNumber function passed as its callback argument. Invoking addOne will first run the asynchronous fs.readFile function. This part of the program takes a while to finish.

  3. With nothing to do, node idles for a bit as it waits for readFile to finish. If there was anything else to do during this time, node would be available for work.

  4. As soon as readFile finishes it executes its callback, doneReading, which parses fileContents for an integer called myNumber, increments myNumber and then immediately invokes the function that addOne passed in (its callback), logMyNumber.

Here is a pseudocode example of the above:
```javascript
function addOne(thenRunThisFunction) {
  waitAMinuteAsync(function waitedAMinute() {
    thenRunThisFunction()
  })
}

addOne(function thisGetsRunAfterAddOneFinishes() {})
```

Below are three examples of how you could structure your callbacks with javascript.

* Example 1

```javascript
var fs = require('fs');
fs.readFile('movie.mp4', finishedReading)

function finishedReading(err, data){
  if (err) return console.error(err);

  //do something with the data
}
```

* Example 2

```javascript
var fs = require('fs');

function finishedReading(err, data){
  if (err) return console.error(err);
  //do something with the data
}

fs.readFile('movie.mp4', finishedReading);
```

* Example 3

```javascript
var fs = require('fs');

fs.readFile('movie.mp4', function finishedReading(err, data){
  if (err) return console.error(err);
  //do something with the data
});
```

Here is another example of a type of callback function that does not involve Node:
```javascript
function fullName(firstName, lastName, callback){
  console.log("My name is " + firstName + " " + lastName);
  callback(lastName);
}

var greeting = function(ln){
  console.log('Welcome Mr. ' + ln);
};

fullName("Jackie", "Chan", greeting);
```

* We are passing the function definition, not the function call. This prevents the callback from being executed immediately, which is not the idea behind the callbacks. Passed as function definitions, they can be executed at any time and at any point in the containing function. Also, because callbacks behave as if they are actually placed inside that function, they are in practice closures: they can access the containing function’s variables and parameters, and even the variables from the global scope.

You could write the above example with an anonymous function like so:

```javascript
function fullName(firstName, lastName, callback){
  console.log("My name is " + firstName + " " + lastName);
  callback(lastName);
}

fullName("Jackie", "Chan", function(ln){console.log('Welcome Mr. ' + ln);});
```

Callbacks are also great when you need to transform your unnecessary repeated code patter into more abstract/generic functions.

Let’s say we need two functions – one that prints information about published articles and another that prints information about sent messages. We create them, but we notice that some part of our logic is repeated in both of the functions. We know that having one and the same piece of code in different places is unnecessary and hard to maintain. So, what is the solution? Let’s illustrate it in the next example:

```javascript
function publish(item, author, callback){   // Generic function with common data
  console.log(item);
  var date = new Date();

  callback(author, date);
}

function messages(author, time){   // Callback function with specific data
  var sendTime = time.toLocaleTimeString();
  console.log("Sent from " + author + " at " + sendTime);
}

function articles(author, date){   // Callback function with specific data
  var pubDate = date.toDateString();
  console.log("Written by " + author);
  console.log("Published " + pubDate);
}

publish("How are you?", "Monique", messages);

publish("10 Tips for JavaScript Developers", "Jane Doe", articles);
```

* Resources

[Callbacks in Node](https://github.com/maxogden/art-of-node#callbacks)

[Callbacks, IIFEs and Closures](https://www.sitepoint.com/demystifying-javascript-closures-callbacks-iifes/)



<a name="ECMAScript-2017"></a>
## ECMAScript 2017

[ECMAScript](https://en.wikipedia.org/wiki/ECMAScript) or **ES6** is a scripting language specification standardized by Ecma International. It was created to standardize JavaScript so as to foster faster and multiple independent implementations.

With each iteration of ES new features are added. ES2015 included the ```=>``` function operators. [Here are some more details about **ES2015**](https://babeljs.io/learn-es2015/).



<a name="MVC"></a>
## MVC
Model–view–controller (MVC) is a software architectural pattern for implementing user interfaces on computers. It divides a given application into three interconnected parts. This is done to separate internal representations of information from the ways information is presented to, and accepted from, the user. The MVC design pattern decouples these major components allowing for efficient code reuse and parallel development.





<a name="String-Manipulation"></a>
## String Manipulation

Let's say you need to take a string of DNA characters and transcribe them to RNA. Here's a script to do that:

```javascript
//transcriber constructor
var Transcriber = function() {

  //Create rna string
  this.toRna = function(dna){
    return dna.split('').map(this.transcribeLetter).join('');
  };

  //Transcribe the string, now an array
  this.transcribeLetter = function(letter){
    if (letter === 'C') return 'G';
    if (letter === 'G') return 'C';
    if (letter === 'A') return 'U';
    if (letter === 'T') return 'A';

    throw new Error('Invalid input');
  };
};

module.exports = Transcriber;
```

The receiving file would need to require this one, whatever it is named. Lets' look at it.

1. Our first method is a bit complicated. It will return a another string according to the ```.map``` method we run on it. ```.map``` is good here because we have a number of things that we want to turn into other things based on some logic that will appear in a separate method. But ```.map``` only works on arrays?
2. Before we call ```.map``` we call ```.split('')``` on our original dna string, which splits each character into it's own array value, so now ```.map``` works.
3. ```.map``` needs a callback, so for that we call the function that will be our logic for decoding this DNA.
4. Lastly, we ```.join``` this array back up into a string. All of this is returned as a single string with ```.toRna``` is called.
6. Of note on that translation logic, you don't need to specify any ```for``` or ```while``` loops because this method is being called by ```.map```, which by it's nature goes over each of the array elements one at a time, like a for loop. So you can simply return the translated value if it matches.

**_NEAT_**
