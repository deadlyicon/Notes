Cipher = require('./simple-cipher.js');

const cipher = new Cipher('123');
console.log(cipher.encode('iamapandabear'));