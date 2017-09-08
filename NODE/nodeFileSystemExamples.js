var fs = require('fs');
var buf = new Buffer(1024);

/*//Async reading a file
fs.readFile('input.txt', (err, data) => {
  if (err){
    return console.error(err);
  }

  console.log('Async read: ' + data.toString());
});

//Sync reading a file
var data = fs.readFileSync('input.txt');
console.log('Sync read: ' + data.toString());


console.log('Program ended');
*/

/* //Async opening a file
console.log('Going to open file!');
fs.open('input.txt', 'r+', (err, fd) => {
  if (err) {
    return console.error(err);
  }
  console.log('File opened successfully!');
});
*/


/* //Getting stats from a file
console.log('Going to get file info!');
fs.stat('input.txt', (err, stats) => {
  if (err) {
    return console.error(err);
  }

  console.log(stats);
  console.log('Got file info successfully');

  //check file type
  console.log('isFile ? ' + stats.isFile());
  console.log('isDirectory ? ' + stats.isDirectory());
  // console.log();
});
*/

/*//Async writing a file
console.log('Going to wrtie into existing file');
fs.writeFile('input.txt', 'Such write, wow much amaze\n', (err) => {
  if (err) {
    return console.error(err);
  }

  console.log('Data written successfully');
  console.log('Reading newly written data');

  fs.readFile('input.txt', (err, data) => {
    if (err) {
      return console.error(err);
    }
    console.log('Async read: ' + data.toString());
  });
});*/



/*
//Async reading a file. Note you hvave to use an fd which is returned from
//fs.open() as well as a buffer object to read the data to.
console.log('Going to open an existing file');
fs.open('input.txt', 'r+', (err, fd) => {
  if (err) {
    return console.error(err);
  }

  console.log('File opened successfully');
  console.log('Going to read file');

  fs.read(fd, buf, 0, buf.length, 0, (err, bytes) => {
    if (err) {
      console.log(err);
    }

    console.log(bytes + ' bytes read');

    //print olny read bytes to avoide junk
    console.log(bytes);
    if(bytes > 0){
      console.log(buf.slice(0, bytes).toString());
    }
  });
});*/


/*
//Closing a file

console.log('Going to open an existing file...');
fs.open('input.txt', 'r+', (err, fd)=>{
  if (err) {
    return console.error(err);
  }

  console.log('Successfully opened file!');
  console.log('Going to read the file...');

  fs.read(fd, buf, 0, buf.length, 0, (err, bytes) => {
    if (err) {
      console.log(err);
    }

    //Print only bytes read
    if(bytes > 0) {
      console.log(buf.slice(0, bytes).toString());
    }

    //Close opened file
    fs.close(fd, (err) => {
      if (err) {
        console.log(err);
      }
      console.log('File closed successfully');
    });
  });
});*/

/*
//Truncating an open file

console.log('Going to open file...');
fs.open('input.txt', 'r+', (err, fd) =>{
  if (err) {
    return console.error(err);
  }
  console.log('File opened successfully!');
  console.log('Going to truncate the file after 10 bytes...');

  //truncate open file
  fs.ftruncate(fd, 10, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('File truncated successfully!');
    console.log('Going to read the same file...');

    fs.read(fd, buf, 0, buf.length, 0, (err, bytes) => {
      if (err) {
        console.log(err);
      }

      //print only read bytes
      if (bytes > 0) {
        console.log(buf.slice(0, bytes).toString());
      }

      //Close the opened file
      fs.close(fd, (err)=>{
        if (err) {
          console.log(err);
        }
        console.log('File closed successfully!');
      });
    });
  });
});
*/


/*
//Deleting a file

console.log('Going to delete an existing file...');
fs.unlink('input.txt', (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('File deleted successfully');
});*/

/*
//Creating a directory
console.log('Going to create a directory /tmp/test');
fs.mkdir('/tmp/test', (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('Directory created successfully!');
});

*/

/*
//Reading a directory
console.log('Going to read directory /tmp');
fs.readdir('/tmp/', (err, files) => {
  if (err) {
    return console.error(err);
  }
  files.forEach(file => {
    console.log(file);
  });
});
*/


/*/
/Removing a directory
console.log('Going to delete the directory /tmp/test');
fs.rmdir('/tmp/test', (err) => {
  if (err) {
    return console.error(err);
  }

  console.log('Going to read directory /tmp');

  fs.readdir('/tmp/', (err, files) => {
    if (err) {
      return console.error(err);
    }
    files.forEach(file => console.log(file));
  });
});
*/