
// Here we are going to call a method chain that will throw and error:
// --> method1() [catches error]
// ----->method2()[catches / rethrows error]
// ---------->method3()[throws error]


function method1(){
  try {
    method2();
  } catch (err) {
    console.log('Error caught in method1():' , err.message);
    console.log(err.stack);
  }
}

function method2(){
  try {
    method3();
  } catch (err) {
    console.log('Error caught in method2()', err.message);
    throw(err);
  }
}

function method3(){
  throw Error('Error message from method3');

}

method1();



