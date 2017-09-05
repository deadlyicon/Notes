# Javascript Notes


# Table of Contents
1. [Array Methods](#Array-Methods)
  * [Array soriting](#Array-Sorting)
2. [Objects](#Objects)
3. [Functions](#Functions)
4. [Closure](#Closure)
5. [getElementById](#getElementById)
6. [Callbacks](#Callbacks)
7. [ECMAScript 2015](#ECMAScript-2017)
9. [MVC](#MVC)
10. [String Manipulation](#String-Manipulation)
11. [Error Handling](#Error-Handling)
12. [Regular Expressions](#Regular-Expressions)

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
```

[Yay pictures!](http://codingmiles.com/sorting-algorithms-bubble-sort-using-javascript/)


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
```


* Insertion sort

```javascript
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
```

With Insertion Sort you follow these steps:

1. Starting at the start of the array (```arr[1]``` actually), You temporaly store the value of that element.
2. You then compare that array element to the previous.
3. Built into the for loop, as long as the previous elment, ```arr[j]``` is larger than whatever value was in the element you started this loop on, shift the previous value up.
4. Repeat this until you reach the start of the array, or until the value you saved in the outer loop is larger than ```arr[j]```.
5. Once that happens, put the value of ```tmp``` into whereever ```arr[j+1]``` is that the time.

This basically saves the value of the element in the outer loop and shifts everything in the array up by one until that value that you saved is greater than the value you are able to shift up, thus it's correct spot.`


* Array.sort

The built in sorting method. This is somewhat unstable without using a compare function, as it natievly compares values based on unicode, so 10 comes before 2, for example.

```javascript
arr = [5,3,7,9,2,10,7,4,3,8]

arr.sort();

console.log(arr); //[ 10, 2, 3, 3, 4, 5, 7, 7, 8, 9 ]
```

A compare function is really the way to do it:

The "compare" function must take two arguments, often referred to as a and b. Then you make the compare function return 0, greater than 0, or less than 0, based on these values, a and b.

Return greater than 0 if a is greater than b
Return 0 if a equals b
Return less than 0 if a is less than b
With these three return values, and only two arguments, it is possible to write a compare function that can sort any type of input data type, or complex data structures.

Then, when you call sort(), with your custom compare function, the compare function is called on pairs in your to-be-sorted list, to determine the proper ordering.

Lets walk through a simple example... Suppose you're only sorting some numbers, so we have a very simple compare function:

```javascript
function compare(a,b) {
    return a - b;
}
```

Simply subtracting b from a will always return greater than zero if a is larger than b, 0 if they are equal, or less than zero if a is less than b. So it meets the requirements for a compare function.

Now lets suppose this is our list of numbers to sort:

```var numbers = [1,5,3.14];```
When you call numbers.sort(compare), internally it will actually execute:

```
compare(1,5);     // Returns -4, a is less than b
compare(1,3.14);  // Return -2.14, a is less than b
compare(5,3.14);  // returns 1.86, a is greater than b
```

If you've ever done manual sorting or alphabetizing, you've done precisely the same thing, probably without realizing it. Even though you may have dozens or hundreds of items to compare, you're constantly comparing only two numbers (or author's last names, or whatever) at a time. Going through or short list of three numbers again, you'd start by comparing the first two numbers:

Is 1 greater than or less than 5? Less than, so put these two numbers in our list: 1,5
Is 3.14 greater than or less than 1? Greater than, so it goes after 1 in the new list
Is 3.14 greater than or less than 5 in our new list? Less than, so it goes before 5. Our new list is now [1,3.14,5]
Because you can provide your own compare() function, it is possible to sort arbitrarily complex data, not just numbers.


<a name="Objects"></a>
## Objects

Objects in Javascript are super important, as OOB is the prevelant coding paradigm.

Basic object:
```javasript
let obj = {
  a: 1
  b: 2
  sum: function(){
    return a + b
  }
}

obj['a'] // <= 1
obj.b    // <= 2
obj.sum  // <= 3
```

You can turn objects into constructors to build more objects. While ```class``` is a new tool, constructors are still the more common method:

```javascript
function Viechle(engine, wheels)}
  this.engine = engine;
  this.wheels = wheels;
  this.status = function(){
    return 'running';
  }
}

var pulsar = new Veichle(V-7, 4);
pulsar.wheels // <= 4
```

You can add methods to constructs and build a new constructors based off the original:

```javascript

function SportsCar(){
}

SportsCar.prototype.goFast = function(){
  console.log('VROOM!')
}

object.assign(SportsCar.prototype, Vehicle.prototype)
```

The last line there is known and _prototypal inheritance_

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

setLocation('Paris'); // output: You are in Paris, France
```

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


<a name="getElementById"></a>
## getElementById
This is a handy function for grabbing something with JS from an html page.
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


<a name='Error-Handling'></a>
## Error Handling
check out [This Guy](https://www.youtube.com/watch?v=Vv1CLj4vLjE) for a great tutorial on 3 different kinds of try-catch blocks.

**Error Handling, or ```try``` and ```catch```**

Considered good practice to check for errors more locally in functions rather than at the periphery of your application.



Let's look at some examples of error handling. Note these examples have been written in an html doc.

* Given:

```javascript
  a = 1;
  b = 2;
  c = 3;

  // document.write(d);
```

You will get an error generated by the browser only availabe in the console and when this error is encountered the whole app / page will stop. Catching these errors allows you to log them, do handel them and keep things moving. Let's take a look at some differnt ways to generate and catch errors:

```javascript
  function getVarVaule(variable) {
    document.write(variable + '<br/><br/');
  }

  try {
    getVarVaule(d);
  } catch(ex) {
    document.write(ex + '<br/><br/>');
  }

```

1. First up a helper function. This thing just trys to write the value of whatever it is passed straight to the document. We're testing for d, which is suppose to fail so we'll never see it.
2. Now, we want to do something that may not work, in this case referencing ```d```. So we ```try {}``` to do the thing.
3. If it works, then ```catch``` never runs and things proceed along.
4. If there is an error then catch, which is just like a function, runs, with the error that was generated by the browser as it's arugment.
5. In this example we just write it to the page.

Of note, the ablove lets the browser write the error. Below is another example but this time we will specify an error.

```javascript
  function divide(number, demon) {
    if (demon === 0){
      throw new Error('Whadday want a black hole in your computer?!');
    }
    document.write(number/demon);
  }


  try {
    divide(10,0);
  } catch(err) {
    document.write(err + '<br/><br/>');
  }
```

1. Here, in ```divide()``` we are checking for ```0```, because we can't divide by 0.
2. If ```demon === 0``` then we ```throw new Error``` with some kind of comment.
3. If there denom != 0 then we just happily go along.
4. Now in our try block below, we try do to the thing that may error and if it does err..
5. That error actually comes from our divide function and that error that we threw is what ends up in the argument for the ```catch()``` function.
6. Then again, we do something.

Of note, in the above we generate our own custom error in our function rather than let the browser do it like the first example. The error that we threw is passed to the ```catch()``` function.

One more example below:

```javascript
  const list = ['Ben', 'ben@abc.com', 'Jenna', 'jenna@abc.com', 'Lenny', 'lenny@abc.com'];
  let i = 0
  let names = [];
  let errMsgs = [];
  let error_count = 0;
```

1. Given an array with name and emails, we want to print out just the names and log anything that's an email to the array ```errMsgs``` as well as increment ```error_count```.  We define ```i``` here b/c we will be using a couple while loops down the line.

```javascript
  while (i < list.length){
    try {
      result = list[i].search(/@/); //regular expression
      if (result == - 1) {
        names.push(list[i]);
      } else {
        throw new Error(list[i] + ' is not a valid name');
      }
    } catch (err) {
      errMsgs.push(err);
      error_count++;
    } finally {
      i++;
    }
  }
```

2. Loop through the list using a while loop. We will increment the i at the bottom of this try block with ```} finally {```. That runs every time ```try{}``` runs, so that works.
3. In result we store the resutl of a regular expression search which is looking for ```@```. If not found in that spot of the array it will return -1, which mean we have a not email, which is a name.
4. We will push now push this name to the names array.
5. Else, if we get something besies -1, which means there was a match _which means_ that it is an email, then we throw a new ```Error```.
6. This error is passed to the ```catch(err)``` function as err.
7. In this ```catch``` function we push the err, which actually says ```'<name> is not a valid name.'``` to the errMsg array that we set up earlier. We also increment up the error count.
8. Finally, finally runs. finally.....

```javascript
  document.write(names + '<br/><br/>');

  document.write('An error was caught ' + errMsgs.length + ' time(s)<br/><br/>');

  i = 0;
  while (i < errMsgs.length){
    document.write(errMsgs[i] + '<br/>');
    i++;
}
```

9. The above prints out all the data we collected. We say how many errors were found, and then loop through the errMsg array, printing each error found.

* How to Re-throw an error

It can be helpful to know where an error origingated in your tree of functions and calls. So it's possible to re-throw and error, up the chaing of functions as long as you prepare for it, like anything else. Let's look:

```javascript

// Here we are going to call a method chain that will throw and error:
// --> method1() [catches error]
// ----->method2()[catches / rethrows error]
// ---------->method3()[throws error]


function method1(){
  try {
    method2();
  } catch (err) {
    console.log('Error caught in method1():' , err.message);
    console.log(err.stack);
  }
}

function method2(){
  try {
    method3();
  } catch (err) {
    console.log('Error caught in method2()', err.message);
    throw(err);
  }
}

function method3(){
  throw Error('Error message from method3');

}

method1();
```

1. So, method1(), calls method2() which calls method3() which just throws an error.
2. method1() catches any error that came from method2().
3. method2() catches any error that cames from method3(), and then re-throws that same error that it caught from moethod3() to whatever called it, in this case method1().
4. Finally, method() is defined and it simply throws the original error.

Running the above with node will demonstrate that each method fired and they passed the same error that oringinaled from method3(). You didn't have to define that err specifically in the function declrations, since this err variable seems to be passed between try / catch blocks on it's own private error route.


**A note on ```} finally {```**
If the finally block returns a value, this value becomes the return value of the entire try-catch-finally production, regardless of any return statements in the try and catch blocks:

```javascript
function f() {
  try {
    console.log(0);
    throw 'bogus';
  } catch(e) {
    console.log(1);
    return true; // this return statement is suspended
                 // until finally block has completed
    console.log(2); // not reachable
  } finally {
    console.log(3);
    return false; // overwrites the previous "return"
    console.log(4); // not reachable
  }
  // "return false" is executed now
  console.log(5); // not reachable
}
f(); // console 0, 1, 3; returns false
```

Overwriting of return values by the finally block also applies to exceptions thrown or re-thrown inside of the catch block:

```javascript
function f() {
  try {
    throw 'bogus';
  } catch(e) {
    console.log('caught inner "bogus"');
    throw e; // this throw statement is suspended until
             // finally block has completed
  } finally {
    return false; // overwrites the previous "throw"
  }
  // "return false" is executed now
}

try {
  f();
} catch(e) {
  // this is never reached because the throw inside
  // the catch is overwritten
  // by the return in finally
  console.log('caught outer "bogus"');
}

// OUTPUT
// caught inner "bogus"
```

Consider the following problem. You have a function that outputs a correct answer half of the time. When it fails it will throw a particular kind of error. How can you write a script to make this unreliable tool, reliable? Here are a couple ways:

```javascript
//our custom error object.
function MultiplicatorUnitFailure(){}

//our tool that works half the time
function primitiveMultiply(a,b){
  if (Math.random() < 0.5) {
    return a * b;
  } else{
    console.log('trying again'); //just so we can see what's going on
  }
}

//here is one way to solve the problem
function reliableMultiply1(a,b){
  try {
  return primitiveMultiply(a,b);
  } catch (err) {
  if (err instanceof MultiplyUnitFailure){
    return reliableMultiply1(a,b);
    } else {
      throw err;
    }
  }
}
```

1. Ok, so we try to call the result of our primitiveMultiply(). If it works then great, if it fails then we catch that err and look at it.
2. If that err is an ```instanceof MultiplyUnitFailure```, then we return the result of the same function we are in, thus trying again.
3. If it is some other kind of err, them we throw that and stop the app.

Here is a second solution to the above problem:

```javascript

function reliableMultiply(a,b){
  for {;;}{  //this means keep doing it forever until something tells you to stop, like a return, a throw or the like.

  try {
    return primitiveMultiply(a,b);
  } catch (err) {
    if (err instanceof MultiplicationUnitFailure){
      continue;
      } else {
        throw err;
      }
    }
  }
}
```

1. Very similar to the first solution, just this time we start with an infinite for loop. We will exit this loop on a successful return of ```primitiveMultiply()``` or of we throw some other err.
2. In order to loop this one we just say continue, no need to call the function again like in the first solution.


Below is a common try catch block

```javascript
try {
  var goingToThrow = null;
  console.log(goingToThrow.myProperty); //very common
  } catch(error){
    console.log(error);
  }
}
```

When an error is generated it usually has at least three properties. ```name```, ```message```, and ```stack```.

## TODO: get methods
* Let's make some notes about ```get``` methods, or [getters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get).



<a name="Regular-Expressions"></a>
## Regular Expressions

Regular expressions are declared withing ```/ regular expression / ```. They have a number of methods. ```.test(string)``` will return true/false if the string provided is found contains the regular expression that ```.test()``` was called on. For example

```javavscript
console.log(/wow/.test('so amaze wow such doge'));
```

Will return true. You can add ```^``` to the start of the regExp to only search for the match at the start of the string.

```javascript
console.log(/^amaze/.test('so amaze wow such doge'));
```

will return false. You can add ```$``` to return true only if the regExp is found at the end of the string:

```javascript
console.log(/doge$/.test('so amaze wow such doge'));
```

Below, you can test for a range of letters or numbers:
```javascript
console.log(/^[a-z0-9]/.test('so amaze wow such doge'));
```

In the next example we have negated the characters we are looking for by including a ```^``` before the first character within the ```[]```. Kind of confusing but it works. Below we are testing that the first number is _not_ a digit and the _second_ number is _not_ a capital A-Z.

```javascript
console.log(/^[^0-9][^A-Z]/.test('so amaze wow such doge'));
```

* handy shortcuts for character
classes:

  * \d - [0-9]        any digit
  * \w - [A-Za-z_]    word character
  * \s - [ \t\r\n\f]  whitespace

Capitalize the shortcut escape characters to negate them:

  * \D - [^0-9]        not a digit
  * \W - [^A-Za-z_]    not a word character
  * \S - [^ \t\r\n\f]  not whitespace


As expected you can get at special characters as literals, like ``` . * + ? [ ] ( ) ^ $ { } | \ ``` by putting a ```\``` before the character in question. The example below tests for a ```.``` (dot) at the end of a string.

```javascript
console.log(/\.$/.test('so amaze wow such doge.'));
```

Here is a tricky one. Let's say you wanted to test whether a string containing an entire filename is a sequence of one or more digits followed by ```.jpg``` or ```.jpeg```.

```javascript
console.log(/^\d+\.jpe?g$/.test('5465181.jpg'));
```

How does the above work? Let's see:

1. Open with ```/```
2. ```^``` indicates we are starting at the start of the string. If we were negating we would have used a ```\D```.
3. ```\d``` says to look for digits.
4. ```+``` is saying look for one or more digits
5. ```\.``` is just our escape character to include a search for ```.```
6. ```jpe?g$``` is saying look for zero or one times of ```jpe``` or ```jpeg``` at the end of the string.


You can also regular expressions to split strings. For example, lets say you wanted to split a string along commas and an arbitrary amount of whitespace. By combining our whitespace short cut ```\s``` and the ```*``` operator we can achieve this. Remember that ```*``` indicates returning true if found zero or more times.

```javascript
string = 'much, amaze  \n, wow \t\r, such,  doge';
console.log(string.split(/\s*\,\s*/));
```

1. First we check for any number of white space characters,
2. Then a comma,
3. Then again any number of white space characters.
4. This grouping of characters found becomes what we split on (and discard) when building the desired array.
5. It would appear that each time the split is run on the string, the regExp re-evaluates what to split on. _neat_


Alright, let's look at ```.exec()```. This regExp method will return a match object for the given string. For example

```javascript
var string = 'am doge such x=5843 amaze';
var match = /x=(d+)/.exec(string);
console.log(match[1])
```

In the above example, we are looking for anything that comes after ```x=``` and I want it to return whatever does come after ```x=```. Index 1 happens to be the spot that the match shows up in the array of the match object. In the exercise there was this return  that I couldn't figure out at the time:

```javascript
return m ? m[1]: null;
```

Another good tool is ```\b``` which stands for [word boundary](http://www.regular-expressions.info/wordboundaries.html) Building off the example above, we can use ```\b``` to pull out the number after x= but only if there are no characters around it:

```javascript
str = beep x=353134 boop
match = /\bx=(\d+)\b/.exec(str);
console.log(match[1]);
```

**Alteration** is handy. You can use the alteration operator ```|``` to match among possible options. for example:

```javascript
/xyz|qrs|tuv/.test('tuv') // true
/0x(ff|00|80)/.test('0x80') // true
```

Another test would be to see if a string stated with cat, dog, or robot followed by an arbitrary number of digits:

```javascript
console.log(/^(cat|dog|robot)\d+$/.test('string'));
```

**Quantifiers** can be used to specify how many times a thing much appear in the thing to be searched. They look like this:

  {n,m}  must occur at least n times but no more than m times
  {n,}   must occur at least n times
  {n}    must occur exactly n times

Let's take a look. Below is a expression that will take a string and return whether the string contains exactly 8 entries of hex codes formatted like: 0xFF with one more more characters of trailing whitespace after each code to separate the columns.

```javascript
  return /^(0x[a-fA-F0-9]{2}\s+){8}$/.test(str);
```

* Lets take a closer look

1. ```^``` To start at the start of the string.
2. ```()``` around our major expression followed by ```{8}$```. This means you will only return true if you find exactly 8 matches.
3. Back to the main expression, ```0x``` b/c that is what the hex codes start with.
4. Now our range of characters withing the ```[]```.
5. ```{2}``` b/c we want exactly 2 character of that range,
6. ```\s+``` for one or more of any whitespace character.
7. Then again the last part as described in step 2.


* .match();

This regExp method can return an array of string matches with you have the ```/g``` flag enabled. For example, given the string:

```
string = ('\'cool "beans" "beep boop" whatever "yay"');
```

You could only return items in ```""``` like the following
```
['"beans"', '"beep boop"', '"yay"']
```

By using this expression:
```javascript
return str.match(/"[^"]*"/g);
```

How's that work?

1. First we match for a ".
2. Then we match for any number of things that are not more quotes, like words, anywhere from 0 to n times.
3. Finally we hit the last ".
4. /g is global(I think) so it will return any matches in the string.





return str.match(/"[^"]*"/g);



* Let's also look up how regExs and their constructor work


* Resources:

[O'reilly Docs](https://docstore.mik.ua/orelly/webprog/jscript/ch10_01.htm)


* Exercises:

[Regex Paper Scissors](https://codegolf.stackexchange.com/questions/129941/regex-paper-scissors-lizard-spock)
[Regex Adventure](https://github.com/workshopper/regex-adventure)
[Regex @ FreeCodeCamp](https://www.freecodecamp.com/challenges/sift-through-text-with-regular-expressions)