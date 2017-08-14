# Node Notes

## Reading and writing files is cool

You can get access to the file system using the `fs` module.

```javascript
var fs = require('fs');

var readMe = fs.readFileSync('readMe.txt', 'utf8');

console.log(readMe);
```


 ```fs.readFileSync('readMe.txt', 'utf8');``` Is a synchronous method, meaning that it will need to compelte before moving on to the next code. This is also knowns as blocking code becuase it blocks the computer from continuning until it is completed.

* The file name is relative in this example, and ```utf8``` is passed as the second paramenter to indicate the type of formatting.


