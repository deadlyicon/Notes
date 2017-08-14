# Node Notes

## Accessing the File System with Node
You can get access to the file system using the ```fs``` module.


### Here is the Synchronous method to reading and writing files on the disk:
```javascript
var fs = require('fs');

var readMe = fs.readFileSync('readMe.txt', 'utf8');
fs.writeFileSync('writeMe.txt', readMe);

console.log(readMe);
```

```fs.readFileSync('readMe.txt', 'utf8');``` Is a synchronous method, meaning that it will need to complete before moving on to the next code. This is also knowns as blocking code because it blocks the computer from continuing until it is completed. The file name is relative in this example, and ```utf8``` is passed as the second parameter to indicate the type of encoding.


### Here is the Asynchronous method for reading and writing files to disk:
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



### Creating and Removing Directories with Node

This is where I will type the next thing
