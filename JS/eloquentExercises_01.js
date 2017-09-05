function MultiplicatorUnitFailure() {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5)
    return a * b;
  else
    console.log('trying again');
    throw new MultiplicatorUnitFailure();
}



function reliableMultiply1(a, b) {
  try {
    return primitiveMultiply(a,b);
  } catch (err) {
    if (err instanceof MultiplicatorUnitFailure) {
      return reliableMultiply1(a,b);
    } else
    throw err;
  }
}

function reliableMultiply2(a, b) {
  for (;;){
    try {
      return primitiveMultiply(a,b);
    } catch (err) {
      if (err instanceof MultiplicatorUnitFailure){
        continue;
      } else
      throw err;
    }
  }

}

console.log(reliableMultiply2(8, 8));
// → 64