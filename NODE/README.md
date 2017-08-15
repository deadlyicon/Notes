# What is Node.js?
Basically anything you could do with PHP or Ruby you can now do with Javascript and Node.js. Node gives Javascript access to the file system, network traffic and all sorts of things normally outside the scrope of the web browser.

* **Two basic things are being done with Node.js**
  1. Building utilities on the Machine.
  2. web server or web application with Node.

**Differences between Node and Javascript**
* Node has a global, global object, while Javascript has a window global object.


# Table of Contents
1. [Modules](#Modules)
2. [Accessing the File System with Node](#Accessing-the-File-System-with-Node)
3. [Editing the File System](#Editing-the-file-system)
4. [REPL](#REPL)
5. [NPM](#NPM)
6. [HTTP](#HTTP)


<a name="Modules"></a>
## Modules
You can use modules to pass stuff between files.

```require()``` to get things in.
```modules.require()``` to get things out.

How you basically load one file into another. You use ```require()```
```javascript
var m2 = require('./folder2/module2');
console.log(m2.a);
```
So you get things into your script by using ```require()```. In order to get things out of your scripts you use ```module.exports()```.

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

Here's an interesting way that you can export functions using ```module.exports```. Sometimes you may find something like the code below:

```javascript
module.exports = function(a, b){
  return a + b;
};

function one() {}

function one() {}

function one() {}
```

You could rework that so that you export an object with each of these functions individually.

```javascript
module.exports = {
  one: function () { console.log('One!'); },

  two: function () { console.log('Two!'); },

  three: function () { console.log('Three!'); } ,
};
```

In the above, now you can call each of the functions like

```javascript
console.log(exportedModule.two) //Prints Two!
```

You could also export stuff like this

```javascript
function one(){
  console.log('one');
}

function two(){
  console.log('two');
}

modules.export = { one, two};
```

Lastly, you could even export like this:

```javascript
exports.one = function(){
  console.log('one');
}

exports.two = function(){
  console.log('two');
}
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

* More notes on ```fs```

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
The Read Eval Print Loop, it's like the console in Chrome Dev Tools, but for Node.

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

* Node REPl can also do multiline expression similar to javascript. Check out the following do-while loop in action

```
$ node
> var x = 0
undefined
> do {
... x++;
... console.log("x: " + x);
... } while ( x < 5 );
x: 1
x: 2
x: 3
x: 4
x: 5
undefined
>
```

* You can use ```_``` to get the last result:

```
$ node
> var x = 10
undefined
> var y = 20
undefined
> x + y
30
> var sum = _
undefined
> console.log(sum)
30
undefined
>
```

* REPL Commands

  **ctrl + c** − terminate the current command.

  **ctrl + c twice** − terminate the Node REPL.

  **ctrl + d** − terminate the Node REPL.

  **Up/Down Keys** − see command history and modify previous commands.

  **tab Keys** − list of current commands.

  **.help** − list of all commands.

  **.break** − exit from multiline expression.

  **.clear** − exit from multiline expression.

  **.save** filename − save the current Node REPL session to a file.

  **.load** filename − load file content in current Node REPL session.

<a name="NPM"></a>
## NPM
The Node package manager. It's a super easy way of installing common things and you can create your own packaged JSON package and manage your Node dependencies.

There is also an online component to npm. The packages there and via the command line can be used on the frontend, backend and command line.

For example, could install the underscore library with
```npm install underscore```

And this would allow you to:
```javascript
var _ = require('underscore');

console.log(_);
```
Also, you can save your dependencies in a package.
The following will start a package and output a Json file.
```npm init```
This is really important because you can now easily share your project and all it's dependencies with others as long as you keep this package.json file up to date.

* Output

```json
{
  "name": "b",
  "version": "1.0.0",
  "description": "Yay, you read me!",
  "main": "add.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```


**NPM INSTALL**

If you want to add another package / dependency, you can use:
```npm install <package> -S```
Which will install the package to your node modules as well as add it to your JSON package that you are planning on having people download.

**Another Example**

1. Create a new folder and run ```npm init -y```
2. Find some pacakge you want at [NPMjs](https://www.npmjs.com/)
3. Install it will ```npm install <package name> -S```
4. cd to node_modules/packageName
5. ```ls``` and look at all that packages dependencies! _Neato_

You can also run ```npm install <package> --save-dev```. This will do the same thing but save the new package to a dev key in your package file. This separation is so those who wish to contribute to the development of your app. The regular user will not get this dependency.

* You can also point npm to a tar all.
* You can also install a specific version with ```npm install package@10```
  * Specifying a version number will lock it in, preventing it from being upgraded later on.


**Of note:**
```npm install```
If you pull down a gitHub project and run ```node start```, it may not run. But you will have the package.json file that came with it. so run: ```npm install``` and it will pull down all the dependencies listed. Make it a habit to run ```npm install``` as soon as you pull down large(?) gitHub project

* [Read more about package.json](https://docs.npmjs.com/files/package.json)



<a name="HTTP"></a>
## HTTP
The node HTTP package. You can quickly create a basic webserver. Create your file:
```javascript
var http = require('http');

var server = http.createServer(function(request, response) {
  console.log('got a request!');
  response.write('hi!');
  response.end();
});

server.listen(3000);
```

1. First you require the http module. It's built in, so no need for ./
2. ```server``` is now the webserver. It will take a request, and a response.
3. When this server is accessed, it will provide a console message, and respond to the requester on the webpage.
4. Lastly, the server starts listening on port 3000.
5. Actually start the server with ```node <fileName>```
6. Point your browser to localhost:3000 and watch your console.

