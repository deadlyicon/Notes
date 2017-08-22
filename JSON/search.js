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

