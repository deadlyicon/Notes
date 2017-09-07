var add = require('./assertions');

console.assert(typeof add === 'function', 'error message about the typeof');
console.assert(add(10,5) === 15, 'error message about return value');

