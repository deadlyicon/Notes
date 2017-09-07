# What is Node.js?
Basically anything you could do with PHP or Ruby you can now do with Javascript and Node.js. Node gives Javascript access to the file system, network traffic and all sorts of things normally outside the scrope of the web browser.

* **Two basic things are being done with Node.js**
  1. Building utilities on the Machine.
  2. web server or web application with Node.

**Differences between Node and Javascript**
* Node has a global, global object, while Javascript has a window global object.


# Table of Contents
1. [Modules](#Modules)
2. [Node Console](#Node-Console)
3. [Accessing the File System with Node](#Accessing-the-File-System-with-Node)
4. [Editing the File System](#Editing-the-file-system)
5. [REPL](#REPL)
6. [NPM](#NPM)
7. [HTTP](#HTTP)
8. [BABEL](#BABEL)
9. [Webpack](#Webpack)
10. [Debuggin in Node](#Debugging-in-Node)



<a name="Modules"></a>
## Modules
You can use modules to pass stuff between files.

```require()``` to get things in.
```modules.exports()``` to get things out.

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
Note that there is a difference between ```module.exports.a = a;``` and ```module.exports = a;``` The difference is whether your module is a container of exported values or not.

_Interestingly_, you could overwrite this export method with your own function:
```javascript
module.exports = function(){
  console.log('Hello There');
};
```

* _Exports_ is an object so you can atach properties or methods to it. For example:
**Message.js**

```
exports.SimpleMessage = 'Hello Word';
// or
module.exports.SimpleMessage = 'Hello World';
```
In the above example we have attatched a property "SimpleMessage" to the export object. Now we can import and use this module as shown below:
**app.js**

```javascript
var mesg = require('./Message.js')
console.log(msg.SimpleMessage);
```
You can also attach anonymous functions to exports objects as show below:
**Log.js**

```javascript
module.exports = function(msg){
  console.log(msg);
}
```
and then use it like so:
```javascript
var msg = require('./Log.js')
msg('Hello World');
```

In the above example, the msg variable becomes the function expression that was exported. So, you can invoke the function using ```()```.

**Exporting function as a class:**
In the JavaScript, a function can be treated like a class. The following example exposes a function which can be used like a class.

```javascript
module.exports = function(firstName, lastName)P
  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = function(){
    return this.firstName + ' ' + this.lastName;
  }
}
```
The above module can be used as shown below.
```javascript
var person = require('./Person.js');
var person1 = new person('James', 'Bond');
console.log(person1.fullName());
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

You could rework that so that you _export an object_ with each of these functions individually.

```javascript
module.exports = {
  one: function () { console.log('One!'); },

  two: function () { console.log('Two!'); },

  three: function () { console.log('Three!'); } ,
};
```

In the above, now you can call each of the functions like this

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

<a name="Node-Console"></a>
## Node Console

You can create a custom console object and with a simple way to log to actual files. Below is a simple example found in the [documentation](https://nodejs.org/api/console.html).

```javascript
const output = fs.createWriteStream('./stdout.log');
const errorOutput = fs.createWriteStream('./stderr.log');
// custom simple logger
const logger = new Console(output, errorOutput);
// use it like console
const count = 5;
logger.log('count: %d', count);
// in stdout.log: count 5
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


* Opening a file:

You would use the following. Note the callback function will require two prams, ```err``` and ```fd```.

```fs.open(path, flags[, mode], callback )```

For example:

```javascript
//Async opening a file
console.log('Going to open file!');
fs.open('input.txt', 'r+', (err, fd) => {
  if (err) {
    return console.error(err);
  }
  console.log('File opened successfully!');
});
```

The above opens the file ```input.txt``` which is in the current directory. note the ```r+``` flag, which means open the file for reading and writing. a List of flags can be found [here](https://www.tutorialspoint.com/nodejs/nodejs_file_system.htm)

* Getting information about a file:

```fs.stat(path, callback)```

fs.Sats has a bunch of handy methods:

| Method | Description |
|--------|:-----------:|
|stats.isFile() | Returns true if file type of a simple file. |


stats.isDirectory() Returns true if file type of a directory.
stats.isBlockDevice() Returns true if file type of a block device.
stats.isCharacterDevice() Returns true if file type of a character device.
stats.isSymbolicLink()  Returns true if file type of a symbolic link.
stats.isFIFO()  Returns true if file type of a FIFO.
stats.isSocket()  Returns true if file type of asocket.





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
2. Once the FS completes the task it goes on to ```fs.readFile()```, which then reads the specified file, sets the encoding to utf8, and then we pass another callback function
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

```javascript
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

```bash
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

```bash
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

  **process.env.envVar** - Print out the given environment variable.

<a name="NPM"></a>
## NPM
**NPM provides two main functionalities**

1. Online repositories for node.js packages/modules which are searchable on search.nodejs.org

2. Command line utility to install Node.js packages, do version management and dependency management of Node.js packages.

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

You could install the underscore module with via commandline
```npm install underscore```

And this would allow you to:
```javascript
var _ = require('underscore');

console.log(_);
```

You can check the installed modules locally:
```npm ls```
or globally:
```npm ls -g```

You can uninstall a module with:
```npm uninstall moduleName```

You can update with:
```npm update moduleName```

You can search with:
```npm search moduleName```


You can save your dependencies in a package.
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

You can publish your own module with:
```npm pubish```

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

You can also start a quick server by entering the following in your working directory:
```bash
http-server -c-1
```


<a name = 'BABEL'></a>
## BABEL
Babel is a tool for transpiling (compiling) ES6/ES7 code to ECMAScript 5 code (ES5), which can be used today in any modern browser. Babel and it's presets can be installed via ```npm```.

ES6 is a significant update to Javascript. Implementation of these new features in major JavaScript engines is still ongoing at present, and a conversion is required to enable the use of these latest features in older JavaScript engines.

The Babel compiler allows us to use the new JavaScript features in our apps. Bascially, Bable is a JavaScript compiler that enables us to use next generations Javascript, today.

You can tell Bable how to transform your JavaSript files with a ```.babelrc``` file in the root of your project. These are in JSON format, and a simple one would like like this:

```JSON
{
  "presets": ["es2015"]
}
```

**Babel CLI Guide**

You have some code written with ES2016 things and you try to run node ```fileName.js```. It will fail b/c node doesn't have ES2016 capability right out the gate. In order to get it working do the following:

1. npm init -y
2. npm install babel-cli babel-register babel-preset-es2015 babel-preset-stage-2 --save-dev
  * The cli is the command line interface. The Register is not good for production but development. It compile files on the fly as long as you require it before the file. Then we want two presets; preset-2015, which is the stable build of the new features, stage-2 is really current build.
3. Configure babel to use these two presets. Make a new file ```.babelrc``` in your root.

```json
{
  "presets": ["es2015", "stage-2"],
}

* You could also do this in your package.json file but it is not recommended.
4. Time to compile with babel! ```-o``` flag is for output. Below you are saying take this file and compile it, then name it the following:

```bash
babel server/index.js -o server/index.babel.js
```

5. Now you will get a new file that has been transpiled from es2015 to plain old javaScript.
6. Editing your original index.js file and recompiling will update index.babel.js



**Babel-Register Guide**

You probably don't want to have to do the above for each and every file. Instead use register for dev.

1. Make a new folder, ```bin```, then make two new files, ```dev``` and ```production``` in ```bin```. No .js extensions.
2.In ```dev``` require ```babel-register``` and give it an entry point, in this case, ./../server/index.

dev
```
require('babel-register');
require('./../server/index')
```

3. Now run ```node bin/dev``` for success. This is compiling our code on the fly with babel-register.
4. If it's running you now have your development build work flow thing ready to go.
5. You can also add a key to your package.json file like so

```"start": "node bin/dev"```

6. Now running ```npm start``` will do the same as above, build your development build.



**Now for Production**

What you are doing here is compiling your server folder, spit out a compiled directory called ```dist```, and then go host it somewhere like heruko.

1. Make a few new scripts in ```package.json``` like so:

```"clean": "rm-rf dist"```

* The above removes the dist folder.

```"build": "npm run clean && mkdir dist && babel server -s -d dist"```

* The above makes the dist folder and has babel compile everything in the server folder.
* -s is source map and it will refer it back to uncompiled code if need be.
* -d flags where to distribute this output directory.

```"production": "npm run build && node bin/production"```

* The above is a short hand way to compile your production code and run it. See step 5 on how to configure your production file.

2. Run ```npm run build``` to build your distribution build, or your final render so to speak.
3. Check the new ```dist``` folder for the outputed files.
4. Test with ```node dist/index``` to see how both the distribution and the devleopment builds run the same.
5. For your ```bin/production``` file you will want to point it it back to your distribution index:

```javascript
require('./../dist/index')
```

**Conclusion**

Now you should be able to write any ES2015, ES2017 code you want to and then run the following commands in your new environment:

```npm run start``` -  test your code
```npm run build``` - build your dist module
```npm run production``` - output your distribution module and run it for a test.


* Resources

[Video Tutorial, ES2017 with Babel + Node.js](https://www.youtube.com/watch?v=LtEP_-3a5CY)

[More information about ES6 and Babel 6](http://jamesknelson.com/the-complete-guide-to-es6-with-babel-6/)


<a name="Webpack"></a>
## Webpack
Webpack is a _modular bundler_ for modern JavaScript apps. When Webpack processes your app, it recursively builds a dependency graph that includes every module your application needs, then packages all those modules into a small number of bundles - often only one, to be loaded by the browser.

To use webpack, initialize npm and install webpack locally in a clean directory.
```
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install --save-dev webpack
```


You'll want to setup your folder structure like so:

```
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
  |- bundle.js
  |- index.html
|- /src
  |- index.js
|- /node_modules
```

If you are previously getting a module from a link, you can download that locally via npm, and then include the following in your ```index.js``` file. The following is using lodash as an example:

```javascript
import _ from 'lodash';
...
```

Webpack will understand what to do with the ```import``` and ```export``` commands.

Next up you will want to remove your ```<script src="link"></script>``` line in your index.html as well as ```<script src="./src/index.js"></script>``` and point that script to the bundle.js that will be made the first time you run webpack. So like this:

```html
  <html>
   <head>
     <title>Getting Started</title>
   <script src="https://unpkg.com/lodash@4.16.6"></script> //remove this
   </head>
   <body>
   <script src="./src/index.js"></script> //remove this
   <script src="bundle.js"></script> //add this
   </body>
  </html>
```

Now you can either run webpack through it's CLI, or API. The CLI runs like this, by specifying the entry point and exit point.
``` webpack src/index.js dist/bundle.js```


To use the API, create a ```webpack.config.js``` file in your root. It should look like this:
```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

Now you can simply run ```webpack`` to compile a new distribution bundle.

You can even adjust your ```package.json``` file to save some time:
```json
{
  ...
  "scripts": {
    "build": "webpack"
  },
  ...
}
```

I'm told that now ```npm run build``` can be used in place of the longer commands.

Read more here on the [official site](https://webpack.js.org/concepts/)

[Basic Setup Example](https://webpack.js.org/guides/getting-started/)
[Asset Management](https://webpack.js.org/guides/asset-management/)


<a name=Debugging-in-Node></a>
## Debugging in Node

You can execute a Node.js app and have it step through the script slowly, one step at a time. To do this you could use ```--inspect``` and ```---debug-brk``` flags, and then copy a url. However we've installed the ```inspect``` module through npm, so now you can type this in CL:

```bash
inspect --debug-brk app.js
```

This will open a web page and you can really see what's going in your web app.