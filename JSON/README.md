# JSON  
JavaScript Object Notation, an open-standard file format that uses human-readable text to transmit data objects consisting of attribute–value pairs and array data types.


## Table of contents  
1. [Searching JSON Files](#Searching-JSON-Files)  



<a name="Searching-JSON-Files"></a>
## Searching JSON Files  

Below is a simple script for searching a JSON file.  
```javascript
const fs = require('fs');

//const data = require('./data.json');

//Async method of doing this
fs.readFile(__dirname+'/data.json', function(err, json){
  if (err){
    console.error(err);
    process.exit(1);
  }

  const data = JSON.parse(json);

  const searchTerm = process.argv[2].toLowerCase();

  //error check for no search term given
  if (typeof searchTerm === 'undefined'){
    console.warn('no search term given');

    //exit on error status
    process.exit(1);
  }

  /*Build an array of matched data for every item
  that has part of the search term.*/
  const matchedData = data.filter(function (record) {
    return record.rep_name.toLowerCase().includes(searchTerm);
  });


  //Output the matched data
  matchedData.forEach(function(record){
    console.log(record.rep_name);
  });
});
```  

It works like so:  
1. Load the fs module.  
2. call fs.readFile, an async function. Pass it a special name for the directory, then the file location.  
3. Decalre the callback function, it takes an error and the file you're reading, in this case a json file  
4. Check for an err if there is one, exit if true.  
5. Convert the json into something we can run string methods on.  
6. Capture the search term that was inputed and conver it to lowercase.  
7. Error check for nothing given, exit if true.  
8. Build an array with any matching data by using the ```.filter``` method.  
9. ```.filter``` gets a callback that takes an item from the original data, in this case a record.  
10. ```.filter``` returns the of vaule for the key, in this case ```rep_name```, that ```.includes``` the search term. This is returned to the new matchedData array. ```.includes``` is a very handy string method for this.  
11. Print out each vaule in the matchedData array. Note the use of the array method and not a for loop  


