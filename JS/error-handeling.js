//jshint esversion: 6
const fs = require('fs');

//Given some files
const files = [
  'test.txt',
  'textJunk.txt',
  'writeMe.txt'
];


//Read the files and print their contents
const readAllTheFiles = function(){
  return files.map(function(file){
    //Try to reac each file
    try{
      return fs.readFileSync(__dirname+'/txtFiles/'+file).toString();

    //Catch an error if it happens, and do something
    }catch(error){
      console.warn('Failed to read file ' +file);
    }
  });
};

//Print the contents
console.log('All the files:', readAllTheFiles());