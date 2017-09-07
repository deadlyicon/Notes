//simple-cipher
const Cipher = function(key){
  //test for undefined key, create 100c random key
  if (arguments.length === 0){
    //Generate a random number 97 - 122
    const keyValue = Math.floor(Math.floor(Math.random() * (122 - 97 + 1)) + 97);
    key = String.fromCharCode(keyValue).repeat(100);
  }

  //If a key has been provided, test it
  if (arguments.length === 1){
    const keyValue = key.charCodeAt(0);
    if (keyValue >= 40 && keyValue <= 90 || key === '') {
      throw new Error ('Bad key');
    }
  }
  this.key = key;
};



//Utility method used for shifting letters
Cipher.prototype.shiftChar = function(charCode, shiftCode){
  //determine how far to move letter
  var index = ((charCode + shiftCode)%26);
  return String.fromCharCode(index + 97);
};



//Encoder method
Cipher.prototype.encode = function(msg){
  let encodedMsg = '';
  msg = msg.toLowerCase();

  //loop through message, translating one character at a time
  for (var i = 0; i < msg.length; i++){
    var shift = this.key.charCodeAt(i) - 97;

    //send the characterCode and the shiftCode to the shiftChar function.
    encodedMsg += this.shiftChar(msg.charCodeAt(i) - 97, shift );
  }
  return encodedMsg;
};



//Decoder method
Cipher.prototype.decode = function(msg){
  let decodedMsg = '';
  msg = msg.toLowerCase();

  //loop through message, tranaslating one character at at ime.
  for (var i = 0; i < msg.length; i++) {
    var shift = this.key.charCodeAt(i) - 97;

    //send the characterCode and the shiftCode to the shiftChar function
    decodedMsg += this.shiftChar(msg.charCodeAt(i) - 97, 26 - shift);
  }
  return decodedMsg;
};

module.exports = Cipher;
