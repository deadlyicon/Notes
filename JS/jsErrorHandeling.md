# Eloquent Javascript
**Bugs and Error Handling**

* Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.
Brian Kernighan and P.J. Plauger, The Elements of Programming Style

* Yuan-Ma had written a small program that used many global variables and shoddy shortcuts. Reading it, a student asked, ‘You warned us against these techniques, yet I find them in your program. How can this be?’ The master said, ‘There is no need to fetch a water hose when the house is not on fire.’
Master Yuan-Ma, The Book of Programming


## Strict mode

JavaScript can be made a little more strict by enabling strict mode. This is done by putting the string "use strict" at the top of a file or a function body. Here’s an example:

```javascript
  function canYouSpotTheProblem() {
    "use strict";                   //Look at that strict mode! Dayum
    for (counter = 0; counter < 10; counter++)
      console.log("Happy happy");
}

canYouSpotTheProblem();
// → ReferenceError: counter is not defined
```

Normally, when you forget to put var in front of your variable, as with counter in the example, JavaScript quietly creates a global variable and uses that. In strict mode, however, an error is reported instead. This is very helpful. It should be noted, though, that this doesn’t work when the variable in question already exists as a global variable, but only when assigning to it would have created it.

Another change in strict mode is that the ```this``` binding holds the value ```undefined``` in functions that are not called as methods. When making such a call outside of strict mode, ```this``` refers to the global scope object. So if you accidentally call a method or constructor incorrectly in strict mode, JavaScript will produce an error as soon as it tries to read something from this, rather than happily working with the global object, creating and reading global variables.

For example, consider the following code, which calls a constructor without the new keyword so that its ```this``` will not refer to a newly constructed object:

```javascript
  function Person(name) { this.name = name; }
  var ferdinand = Person("Ferdinand"); // oops
  console.log(name);
  // → Ferdinand
```


So the bogus call to Person succeeded but returned an undefined value and created the global variable name. In strict mode, the result is different.

```javascript
"use strict";
function Person(name) { this.name = name; }
// Oops, forgot 'new'
var ferdinand = Person("Ferdinand");
// → TypeError: Cannot set property 'name' of undefined
```

We are immediately told that something is wrong. This is helpful.

Strict mode does a few more things. It disallows giving a function multiple parameters with the same name and removes certain problematic language features entirely (such as the ```with``` statement, which is so misguided it is not further discussed in this book).

**In short, putting a "use strict" at the top of your program rarely hurts and might help you spot a problem.**

## Testing

If the language is not going to do much to help us find mistakes, we’ll have to find them the hard way: by running the program and seeing whether it does the right thing.

Doing this by hand, again and again, is a sure way to drive yourself insane. Fortunately, it is often possible to write a second program that automates testing your actual program.

As an example, we once again use the Vector type.

```javascript
function Vector(x, y) {
  this.x = x;
  this.y = y;
}
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};
```

We will write a program to check that our implementation of Vector works as intended. Then, every time we change the implementation, we follow up by running the test program so that we can be reasonably confident that we didn’t break anything. When we add extra functionality (for example, a new method) to the Vector type, we also add tests for the new feature.

## Testing Function example

```javascript
function testVector() {
  var p1 = new Vector(10, 20);
  var p2 = new Vector(-10, 5);
  var p3 = p1.plus(p2);

  if (p1.x !== 10) return "fail: x property";
  if (p1.y !== 20) return "fail: y property";
  if (p2.x !== -10) return "fail: negative x property";
  if (p3.x !== 0) return "fail: x from plus";
  if (p3.y !== 25) return "fail: y from plus";
  return "everything ok";
}
console.log(testVector());
// → everything ok
```

Writing tests like this tends to produce rather repetitive, awkward code. Fortunately, there exist pieces of software that help you build and run collections of tests (test suites) by providing a language (in the form of functions and methods) suited to expressing tests and by outputting informative information when a test fails. These are called testing frameworks.

## Debugging

Once you notice that there is something wrong with your program because it misbehaves or produces errors, the next step is to figure out what the problem is.

Sometimes it is obvious. The error message will point at a specific line of your program, and if you look at the error description and that line of code, you can often see the problem.

But not always. Sometimes the line that triggered the problem is simply the first place where a bogus value produced elsewhere gets used in an invalid way. And sometimes there is no error message at all—just an invalid result. If you have been solving the exercises in the earlier chapters, you will probably have already experienced such situations.

The following example program tries to convert a whole number to a string in any base (decimal, binary, and so on) by repeatedly picking out the last digit and then dividing the number to get rid of this digit. But the insane output that it currently produces suggests that it has a bug.

```javascript
function numberToString(n, base) {
  var result = "", sign = "";
  if (n < 0) {
    sign = "-";
    n = -n;
  }
  do {
    result = String(n % base) + result;
    n /= base;
  } while (n > 0);
  return sign + result;
}
console.log(numberToString(13, 10));
// → 1.5e-3231.3e-3221.3e-3211.3e-3201.3e-3191.3e-3181.3…
```

Even if you see the problem already, pretend for a moment that you don’t. We know that our program is malfunctioning, and we want to find out why.

This is where you must resist the urge to start making random changes to the code. Instead, think. Analyze what is happening and come up with a theory of why it might be happening. Then, make additional observations to test this theory—or, if you don’t yet have a theory, make additional observations that might help you come up with one.

Putting a few strategic console.log calls into the program is a good way to get additional information about what the program is doing. In this case, we want n to take the values 13, 1, and then 0. Let’s write out its value at the start of the loop.

13
1.3
0.13
0.013
…
1.5e-323
Right. Dividing 13 by 10 does not produce a whole number. Instead of n /= base, what we actually want is n = Math.floor(n / base) so that the number is properly “shifted” to the right.

An alternative to using console.log is to use the debugger capabilities of your browser. Modern browsers come with the ability to set a breakpoint on a specific line of your code. This will cause the execution of the program to pause every time the line with the breakpoint is reached and allow you to inspect the values of variables at that point. I won’t go into details here since debuggers differ from browser to browser, but look in your browser’s developer tools and search the Web for more information. Another way to set a breakpoint is to include a debugger statement (consisting of simply that keyword) in your program. If the developer tools of your browser are active, the program will pause whenever it reaches that statement, and you will be able to inspect its state.

## Error propagation

Not all problems can be prevented by the programmer, unfortunately. If your program communicates with the outside world in any way, there is a chance that the input it gets will be invalid or that other systems that it tries to talk to are broken or unreachable.

Simple programs, or programs that run only under your supervision, can afford to just give up when such a problem occurs. You’ll look into the problem and try again. “Real” applications, on the other hand, are expected to not simply crash. Sometimes the right thing to do is take the bad input in stride and continue running. In other cases, it is better to report to the user what went wrong and then give up. But in either situation, the program has to actively do something in response to the problem.

Say you have a function promptInteger that asks the user for a whole number and returns it. What should it return if the user inputs orange?

One option is to make it return a special value. Common choices for such values are null and undefined.

```javascript
function promptNumber(question) {
  var result = Number(prompt(question, ""));
  if (isNaN(result)) return null;
  else return result;
}

console.log(promptNumber("How many trees do you see?"));
```

This is a sound strategy. Now any code that calls promptNumber must check whether an actual number was read and, failing that, must somehow recover—maybe by asking again or by filling in a default value. Or it could again return a special value to its caller to indicate that it failed to do what it was asked.

In many situations, mostly when errors are common and the caller should be explicitly taking them into account, returning a special value is a perfectly fine way to indicate an error. It does, however, have its downsides. First, what if the function can already return every possible kind of value? For such a function, it is hard to find a special value that can be distinguished from a valid result.

The second issue with returning special values is that it can lead to some very cluttered code. If a piece of code calls promptNumber 10 times, it has to check 10 times whether null was returned. And if its response to finding null is to simply return null itself, the caller will in turn have to check for it, and so on.

## Exceptions

When a function cannot proceed normally, what we would like to do is just stop what we are doing and immediately jump back to a place that knows how to handle the problem. This is what exception handling does.

Exceptions are a mechanism that make it possible for code that runs into a problem to raise (or throw) an exception, which is simply a value. Raising an exception somewhat resembles a super-charged return from a function: it jumps out of not just the current function but also out of its callers, all the way down to the first call that started the current execution. This is called unwinding the stack. You may remember the stack of function calls that was mentioned in Chapter 3. An exception zooms down this stack, throwing away all the call contexts it encounters.

If exceptions always zoomed right down to the bottom of the stack, they would not be of much use. They would just provide a novel way to blow up your program. Their power lies in the fact that you can set “obstacles” along the stack to catch the exception as it is zooming down. Then you can do something with it, after which the program continues running at the point where the exception was caught.

Here’s an example:

```javascript
function promptDirection(question) {
  var result = prompt(question, "");
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  throw new Error("Invalid direction: " + result);
}

function look() {
  if (promptDirection("Which way?") == "L")
    return "a house";
  else
    return "two angry bears";
}

try {
  console.log("You see", look());
} catch (error) {
  console.log("Something went wrong: " + error);
}
```

The throw keyword is used to raise an exception. Catching one is done by wrapping a piece of code in a try block, followed by the keyword catch. When the code in the try block causes an exception to be raised, the catch block is evaluated. The variable name (in parentheses) after catch will be bound to the exception value. After the catch block finishes—or if the try block finishes without problems—control proceeds beneath the entire try/catch statement.

In this case, we used the Error constructor to create our exception value. This is a standard JavaScript constructor that creates an object with a message property. In modern JavaScript environments, instances of this constructor also gather information about the call stack that existed when the exception was created, a so-called stack trace. This information is stored in the stack property and can be helpful when trying to debug a problem: it tells us the precise function where the problem occurred and which other functions led up to the call that failed.

Note that the function look completely ignores the possibility that promptDirection might go wrong. This is the big advantage of exceptions—error-handling code is necessary only at the point where the error occurs and at the point where it is handled. The functions in between can forget all about it.

Well, almost...

## Cleaning up after exceptions

Consider the following situation: a function, withContext, wants to make sure that, during its execution, the top-level variable context holds a specific context value. After it finishes, it restores this variable to its old value.

```javascript
var context = null;

function withContext(newContext, body) {
  var oldContext = context;
  context = newContext;
  var result = body();
  context = oldContext;
  return result;
}
```

What if body raises an exception? In that case, the call to withContext will be thrown off the stack by the exception, and context will never be set back to its old value.

There is one more feature that try statements have. They may be followed by a finally block either instead of or in addition to a catch block. A finally block means “No matter what happens, run this code after trying to run the code in the try block”. If a function has to clean something up, the cleanup code should usually be put into a finally block.

```javascript
function withContext(newContext, body) {
  var oldContext = context;
  context = newContext;
  try {
    return body();
  } finally {
    context = oldContext;
  }
}
```

Note that we no longer have to store the result of body (which we want to return) in a variable. Even if we return directly from the try block, the finally block will be run. Now we can do this and be safe:

```javascript
try {
  withContext(5, function() {
    if (context < 10)
      throw new Error("Not enough context!");
  });
} catch (e) {
  console.log("Ignoring: " + e);
}
// → Ignoring: Error: Not enough context!

console.log(context);
// → null
```

Even though the function called from withContext exploded, withContext itself still properly cleaned up the context variable.

## Selective catching

When an exception makes it all the way to the bottom of the stack without being caught, it gets handled by the environment. What this means differs between environments. In browsers, a description of the error typically gets written to the JavaScript console (reachable through the browser’s Tools or Developer menu).

For programmer mistakes or problems that the program cannot possibly handle, just letting the error go through is often okay. An unhandled exception is a reasonable way to signal a broken program, and the JavaScript console will, on modern browsers, provide you with some information about which function calls were on the stack when the problem occurred.

For problems that are expected to happen during routine use, crashing with an unhandled exception is not a very friendly response.

Invalid uses of the language, such as referencing a nonexistent variable, looking up a property on null, or calling something that’s not a function, will also result in exceptions being raised. Such exceptions can be caught just like your own exceptions.

When a catch body is entered, all we know is that something in our try body caused an exception. But we don’t know what, or which exception it caused.

JavaScript (in a rather glaring omission) doesn’t provide direct support for selectively catching exceptions: either you catch them all or you don’t catch any. This makes it very easy to assume that the exception you get is the one you were thinking about when you wrote the catch block.

But it might not be. Some other assumption might be violated, or you might have introduced a bug somewhere that is causing an exception. Here is an example, which attempts to keep on calling promptDirection until it gets a valid answer:

```javascript
for (;;) {
  try {
    var dir = promtDirection("Where?"); // ← typo!
    console.log("You chose ", dir);
    break;
  } catch (e) {
    console.log("Not a valid direction. Try again.");
  }
}
```

The for (;;) construct is a way to intentionally create a loop that doesn’t terminate on its own. We break out of the loop only when a valid direction is given. But we misspelled promptDirection, which will result in an “undefined variable” error. Because the catch block completely ignores its exception value (e), assuming it knows what the problem is, it wrongly treats the variable error as indicating bad input. Not only does this cause an infinite loop, but it also “buries” the useful error message about the misspelled variable.

As a general rule, **don’t blanket-catch exceptions unless it is for the purpose of “routing” them somewhere** —for example, over the network to tell another system that our program crashed. And even then, think carefully about how you might be hiding information.

So we want to catch a specific kind of exception. We can do this by checking in the catch block whether the exception we got is the one we are interested in and by rethrowing it otherwise. But how do we recognize an exception?

Of course, we could match its message property against the error message we happen to expect. But that’s a shaky way to write code—we’d be using information that’s intended for human consumption (the message) to make a programmatic decision. As soon as someone changes (or translates) the message, the code will stop working.

Rather, let’s define a new type of error and use instanceof to identify it.

```javascript
function InputError(message) {
  this.message = message;
  this.stack = (new Error()).stack;
}
InputError.prototype = Object.create(Error.prototype);
InputError.prototype.name = "InputError";
```

The prototype is made to derive from Error.prototype so that instanceof Error will also return true for InputError objects. It’s also given a name property since the standard error types (Error, SyntaxError, ReferenceError, and so on) also have such a property.

The assignment to the stack property tries to give this object a somewhat useful stack trace, on platforms that support it, by creating a regular error object and then using that object’s stack property as its own.

Now promptDirection can throw such an error.

```javascript
function promptDirection(question) {
  var result = prompt(question, "");
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  throw new InputError("Invalid direction: " + result);
}
```

And the loop can catch it more carefully.

```javascript
for (;;) {
  try {
    var dir = promptDirection("Where?");
    console.log("You chose ", dir);
    break;
  } catch (e) {
    if (e instanceof InputError)
      console.log("Not a valid direction. Try again.");
    else
      throw e;
  }
}
```

**This will catch only instances of InputError and let unrelated exceptions through. If you reintroduce the typo, the undefined variable error will be properly reported.**

## Assertions

Assertions are a tool to do basic sanity checking for programmer errors. Consider this helper function, assert:

```javascript
function AssertionFailed(message) {
  this.message = message;
}
AssertionFailed.prototype = Object.create(Error.prototype);

function assert(test, message) {
  if (!test)
    throw new AssertionFailed(message);
}

function lastElement(array) {
  assert(array.length > 0, "empty array in lastElement");
  return array[array.length - 1];
}
```

This provides a compact way to enforce expectations, helpfully blowing up the program if the stated condition does not hold. For instance, the lastElement function, which fetches the last element from an array, would return undefined on empty arrays if the assertion was omitted. Fetching the last element from an empty array does not make much sense, so it is almost certainly a programmer error to do so.

Assertions are a way to make sure mistakes cause failures at the point of the mistake, rather than silently producing nonsense values that may go on to cause trouble in an unrelated part of the system.

## Summary

Mistakes and bad input are facts of life. Bugs in programs need to be found and fixed. They can become easier to notice by having automated test suites and adding assertions to your programs.

Problems caused by factors outside the program’s control should usually be handled gracefully. Sometimes, when the problem can be handled locally, special return values are a sane way to track them. Otherwise, exceptions are preferable.

Throwing an exception causes the call stack to be unwound until the next enclosing try/catch block or until the bottom of the stack. The exception value will be given to the catch block that catches it, which should verify that it is actually the expected kind of exception and then do something with it. To deal with the unpredictable control flow caused by exceptions, finally blocks can be used to ensure a piece of code is always run when a block finishes.

## Exercises

Retry

Say you have a function primitiveMultiply that, in 50 percent of cases, multiplies two numbers, and in the other 50 percent, raises an exception of type MultiplicatorUnitFailure. Write a function that wraps this clunky function and just keeps trying until a call succeeds, after which it returns the result.

Make sure you handle only the exceptions you are trying to handle.

function MultiplicatorUnitFailure() {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5)
    return a * b;
  else
    throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
  // Your code here.
}

console.log(reliableMultiply(8, 8));
// → 64
The locked box

Consider the following (rather contrived) object:

var box = {
  locked: true,
  unlock: function() { this.locked = false; },
  lock: function() { this.locked = true;  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};
It is a box with a lock. Inside is an array, but you can get at it only when the box is unlocked. Directly accessing the _content property is not allowed.

Write a function called withBoxUnlocked that takes a function value as argument, unlocks the box, runs the function, and then ensures that the box is locked again before returning, regardless of whether the argument function returned normally or threw an exception.

function withBoxUnlocked(body) {
  // Your code here.
}

withBoxUnlocked(function() {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised:", e);
}
console.log(box.locked);
// → true
For extra points, make sure that if you call withBoxUnlocked when the box is already unlocked, the box stays unlocked.