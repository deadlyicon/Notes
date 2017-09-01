# Notes on a simple-cipher exercise.
Originall an exercise from exercism.io

* The task is to create a simple encryption algorithm akin to a ceaser-cipher. This means that, given a key of lowercase letters, we will take a provided message and shift each letter in the message a number of values determined by the key provided. For example, a key of 'ddddddddddd' whould shift everyting 3 spaces up so 'iamapandabear' would become 'ldpdsdqgdehdu'.

Let's take a look

```javascript
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
```

In the above we define the main function itself. Note that we do not define the ```.encode``` or ```.decode``` functions but rather assign them to the prototype. This is important because of the way that the computer will reference the functions in relation to the object that was created using the Cipher constructor.

Anyway, the first thing we do is determine the status of the key provided, if there is one. We do this by checking ```arguments.length```, a handy trick to determine if anyhting was passed to the function when it was called. In the case of ```arugments.length === 0``` we can be sure that no key was provided, and just the cipher created.

With no key provided we create one by doing the following:

1. Generate a random number between 97 and 122. The ascii values that contain only lowercase letters. That goes to ```keyValue```
2. Then we repeat this character 100x to create our random cipher key. Note that it only needs to be a single letter.

However, if key was provided we need to check it to be sure it has legal characters. To do that we:

1. Get the value of the key at character space ```(0)```.
2. Check to see if it is a number outside of the legal bounds, or if it is an empty string.
3. If that is the case, we throw and Error.

Lastly, we must not have errored out to make it to the last line in the function we can be confidant that the key contains no invalid characters, empty strings and it otherwise ready to go, so we assign it to ```this.key = key```. This way it is available to the sub methods we are about to create.


```javascript
//Utility method used for shifting letters
Cipher.prototype.shiftChar = function(charCode, shiftCode){
  //determine how far to move letter
  var index = ((charCode + shiftCode)%26);
  return String.fromCharCode(index + 97);
};
```

Next up we create our utility function. This was made because I found that I was re-typing the same code a couple of times so this bit was refactored so both the ```.encode``` and ```.decode``` functions could make use of it. Let's look at what it does.

1. This functions takes in a character code, and a shift code. The characters code is simply the numeric value of the ascii character to be encoded or decoded, adjusted to a 0-25. The same goes for the shift code, but it is the value of the appropriate characters in the cipher key.
2. Now we determine what index of the translated character will be. To do that we substract the shift code from the character code, then %26. Using ```%``` allows us to wrap the numbers, meaning if we have any characters that need to become a character on the other side of the alphabet, they will 'wrap' to the correct number.
3. Lastly, we return the actual character to be translated by adding 97 to the index to get it back to an ascii value, and then calling ```String.fromCharCode``` on that number to produce the actual letter.


```javascript
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
```

Above we have our first actual translation function, ```.encode```. Let's take a look at what this does.

1. Build the end result variable.
2. Convert the message to lowercase, just in case.
3. Start a loop that lasts as long as the mssage is long.
4. The first step in the loop is key, heh heh. We create a variable called ```shift```, which will basically tells us what the simple value of the character in the cipher key is, -97 so we get a nice 0-25 number.
5. Finally, we call our ```shiftChar``` utility method to get our translated character, which we add to the ```encodedMsg``` variable. Let's take a look at how that is called:
  * We call ```this.shiftChar``` and pass it a couple of variables. We pass it the value of the current letter to tbe encoded - 97 so the value is nice and between 0 -15. We also pass it our ```shift``` variable, which is the nice value of the current cipher character. ```this.shiftChar``` then returns the encoded character. _Neato_


```javascript
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
```

Finall our decode method is defined. This one is pretty similar to the encode method with an important change to account for decoding. All we have to do is **subtract the shift value from 26** when calling the ```shiftChar``` method. This will decode our given message.

*_Bingo-Bango_*