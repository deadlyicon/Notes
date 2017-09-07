var fs = require('fs');

/*//Async read
fs.readFile('input.txt', (err, data) => {
  if (err){
    return console.error(err);
  }

  console.log('Async read: ' + data.toString());
});

//Sync read
var data = fs.readFileSync('input.txt');
console.log('Sync read: ' + data.toString());


console.log('Program ended');
*/

//Asyn opening a file
console.log('Going to open file!');
fs.open('input.txt', 'r+', (err, fd) => {
  if (err) {
    return console.error(err);
  }
  console.log('File opened successfully!');
});