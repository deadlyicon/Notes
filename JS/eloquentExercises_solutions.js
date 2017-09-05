// Say you have a function primitiveMultiply that, in 50 percent of cases,
// multiplies two numbers, and in the other 50 percent, raises an exception
// of type MultiplicatorUnitFailure. Write a function that wraps this clunky
// function and just keeps trying until a call succeeds, after which it
// returns the result.

// Make sure you handle only the exceptions you are trying to handle.

// The call to primitiveMultiply should obviously happen in a try block.
// The corresponding catch block should rethrow the exception when it is
// not an instance of MultiplicatorUnitFailure and ensure the call is
// retried when it is.

// To do the retrying, you can either use a loop that breaks only when a
// call succeeds—as in the look example earlier in this chapter—or use
// recursion and hope you don’t get a string of failures so long that it
// overflows the stack (which is a pretty safe bet).

// Solution to eloquentjavascript exercise second 2nd edition
// Chapter 8
// http://eloquentjavascript.net/2nd_edition/preview/08_error.html
// Retry
function MultiplicatorUnitFailure() {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5)
    return a * b;
  else
    throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
  try {
    return primitiveMultiply(a, b);
  } catch (e) {
    if (e instanceof MultiplicatorUnitFailure) {
      return reliableMultiply(a, b);
    } else {
      throw e;
    }
  }
}

function reliableMultiply2(a, b) {
  for (;;) {
    try {
      return primitiveMultiply(a, b);
    } catch (e) {
      if (e instanceof MultiplicatorUnitFailure) {
        continue;
      } else
        throw e;
    }
  }
}

console.log(reliableMultiply(8, 8));
console.log(reliableMultiply(6, 6));


/* It is a box with a lock. Inside is an array,
but you can get at it only when the box is
unlocked. Directly accessing the _content
property is not allowed.

Write a function called withBoxUnlocked that
takes a function value as argument, unlocks the
box, runs the function, and then ensures that
the box is locked again before returning,
regardless of whether the argument function returned normally or threw an exception.

For extra points, make sure that if you call
withBoxUnlocked when the box is already unlocked,
the box stays unlocked.

This exercise calls for a finally block, as you
probably guessed. Your function should first
unlock the box and then call the argument
function from inside a try body. The finally
block after it should lock the box again.

To make sure we don’t lock the box when it
wasn’t already locked, check its lock at the
start of the function and unlock and lock it
only when it started out locked. */

// ---------------------------------------
// The locked box
function withBoxUnlocked(body) {
  box.unlock();
  try {
    body();
  }
  catch (e) {
    // do nothing
  } finally {
    box.lock();
  }
}

// Bonus
function withBoxUnlocked(body) {
  var state = box.locked;
  box.unlock();
  try {
    body();
  } catch (e) {
    // do nothing
  } finally {
    if (state) {
      box.lock();
    }
  }
}

withBoxUnlocked(function() {
  box.content.push("gold piece");
});

withBoxUnlocked(function() {
  throw new Error("Pirates on the horizon! Abort!");
});
console.log(box.locked);
// → true