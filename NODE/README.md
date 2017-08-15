# What is Node.js?
Basically anything you could do with PHP or Ruby you can now do with Javascript and Node.js. Node gives Javascript access to the file system, network traffic and all sorts of things normally outside the scrope of the web browser.



# Table of Contents
1. [Modules](#Modules)
2. [Accessing the File System with Node](#Accessing-the-File-System-with-Node)
3. [Editing the File Systeh](Editing-the-file-system)
3. [REPL](#REPL)
4. [NPM](#NPM)

* **Two basic things are being done with Node.js**
  1. Building utilities on the Machine.
  2. web server or web application with Node.

**Differences between Node and Javascript**
* Node has a global, global object, while Javascript has a window global object.








<a name="Modules"></a>
## Modules
You can use modules to pass stuff between files.

How you basically load one file into another. You use ```require()```
```javascript
var m2 = require('./folder2/module2');
console.log(m2.a);
```
The above loads module2 into the file as long as module2 has the below somwhere:
```javascript
var a = 1;
module.exports.a = a //for example
```


_Interestingly_, you could overwrite this export method with your own function:
```javascript
module.exports = function(){
  console.log('Hello There');
};
```



<a name="Accessing-the-File-System-with-Node"></a>
## Accessing the File System
You can get access to the file system using the ```fs``` module.

* Here is the Synchronous method to reading and writing files on the disk:

```javascript
var fs = require('fs');

var readMe = fs.readFileSync('readMe.txt', 'utf8');
fs.writeFileSync('writeMe.txt', readMe);

console.log(readMe);
```

```fs.readFileSync('readMe.txt', 'utf8');``` Is a synchronous method, meaning that it will need to complete before moving on to the next code. This is also knowns as blocking code because it blocks the computer from continuing until it is completed. The file name is relative in this example, and ```utf8``` is passed as the second parameter to indicate the type of encoding.


* Here is the Asynchronous method for reading and writing files to disk:

```javascript
var fs = require('fs');

var readMe = fs.readFile('readMe.txt', 'utf8', function(err, data){
  console.log(data);
});
```

```fs.readFile('readMe.txt', 'utf8', function(err, data){};``` is the synchronous method and as such you need to pass it a callback function to run when readFile() has completed. In that function you need to pass it an err, if there was one, and then the data. Finally, the callback function itself does something once readFile() has completed. **The benefit of asynchronous is that we are not blocking the code below. For example:**
```javascript
var fs = require('fs');

var readMe = fs.readFile('readMe.txt', 'utf8', function(err, data){
  console.log(data);
});

console.log('test');
```
When run you will see that ```test``` output before the contents of the file.


Here is the same code but with the ```writeFile()``` method in place, also asynchronous.
```javascript
var fs = require('fs');

var readMe = fs.readFile('readMe.txt', 'utf8', function(err, data){
  fs.writeFile('writeMe.txt', data);
});
```

* The above is a better way to write your code as it will be faster. This is because it's not blocking and the computer can continue to execute more code while the filesystem is looking up the file.


<a name="Editing-the-file-system"></a>
## Editing the file system
* How to delete files

Easy enough:
```javascript
fs.unlink('fileName.txt');
```


* Creating and Removing Directories with Node
**Synchronous version:**
```javascript
fs.mkdirSync('stuff'); //make dir
fs.rmdirSync('stuff'); //remove dir
```


**Asynchronous version:**
```javascript
var fs = require('fs');

fs.mkdir('stuff', function(){
  fs.readFile('readMe.txt', 'utf8', function(err, data){
    fs.writeFile('./stuff/writeMe.txt', data);
  });
});
```

1. First, ```fs.mkdir()``` is called and a callback function is provided.
2. Once the FS completes the task it goes on to ```fs.readFile()```, which then reads the specified file, sets the encoding to....that, and then we pass another call back function
3. ```fs.readFile()``` is asynchronous so it's callback is ```fs.writeFile()```, which then writes the data to the specified file.
4. Structuring your code this way is faster at runtime and allows the computer to run the next lines while waiting for the file system to do it's thing.


**To remove folders**
```javascript
var fs = require('fs');

fs.unlink('./stuff/writeMe.txt', function(){
  fs.rmdir('stuff');
});
```

1. In order to delete folders we must first clear them out. So, first run ```fs.unlink()```, passing it the file to be deleted.
2. Also, pass the method a callback function, this time use ```fs.rmdir()``` which will delete our folder only after it is empty but in a non-blocking way.


<a name="REPL"></a>
## REPL
The Run Evaluate Print Loop, it's like the console in Chrome Dev Tools, but for Node.

* Run ```node``` to enter Node REPL.
* You can define functions in REPL.

```
function add(a, b){
  return a + b;
}
```
```add(1,2)``` will return what you would expect.


In addition you can use this interface to debug code or test ideas. Here's some quick tips:

**Accessing the date**
```var d = new Date()```

**Access timestamp since the 70?s**
```var ts = Date.now()```


<a name="NPM"></a>
## NPM
What is it?
