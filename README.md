# JS-PRNG v0.2.3
JS-PRNG is a small pseudorandom number generator written in JavaScript that can be used to generate any number of seemingly random numbers based on the given initial 32-bit seed value and other inputs. Both numbers and strings are supported as valid seed values. It uses XOR operations as well as bit-shift operations to achieve pseudorandomness. The distribution of the random numbers is very uniform.

Demonstrations of distribution:
- nextBetween(): https://tom-granig.github.io/JS-PRNG/examples/Noise-Patterns.html<br>
- getNoise1D(x): https://tom-granig.github.io/JS-PRNG/examples/Noise-Patterns-getNoise1D.html<br>
- getNoise2D(x, y): https://tom-granig.github.io/JS-PRNG/examples/Noise-Patterns-getNoise2D.html<br>

**NOTE**: This generator is not intended to be cryptographically secure and should not be used for any cryptographic or other purposes where security is vital. Consider using the SubtleCrypto API instead. 

## How To Use
### Generate numbers in the range [0, 1)
The `next()` function returns the next random floating point value between 0, inclusive and 1, exclusive.
```javascript
// creates a new PRNG object and initializes it with the seed 324792302:
const generator = new PRNG(324792302); 
console.log(generator.next()); // prints out "0.31638280814513564"
console.log(generator.next()); // prints out "0.934757471550256"
```
### Generate intergers in the range [a, b]
The `nextBetween(a, b)` function returns the next random integer between and including a and b.
```javascript
// creates a new PRNG object and initializes it with the seed 324792302:
const generator = new PRNG(324792302);
console.log(generator.nextBetween(1, 6)); // prints out "2"
console.log(generator.nextBetween(1, 6)); // prints out "6"
```

### Using a string as a seed
Strings can be used as seeds, with character values above 255 (end of ASCII range) wrapping over.
```javascript
// creates a new PRNG object and initializes it with the seed "hello world!":
const generator = new PRNG('hello world!');
console.log(generator.next()); // prints out "0.6686770371161401"
console.log(generator.next()); // prints out "0.3518891027197242"
```
### Changing the seed
The seed can be changed with the `seed(seedValue)` function without having to create a new PRNG object.
```javascript
// creates a new PRNG object and initializes it with the seed "hello world!":
const generator = new PRNG('hello world!');
console.log(generator.next()); // prints out "0.6686770371161401"
console.log(generator.next()); // prints out "0.3518891027197242"

generator.seed(324792302); // updates the generator's seed to 324792302
console.log(generator.next()); // prints out "0.31638280814513564"
console.log(generator.next()); // prints out "0.934757471550256"
```
### Resetting the generator
The generator can be reset with `reset()` to the state it was in before any numbers were generated after setting the seed or creating the object.
```javascript
// creates a new PRNG object and initializes it with the seed "hello world!":
const generator = new PRNG('hello world!');
console.log(generator.next()); // prints out "0.6686770371161401"
console.log(generator.next()); // prints out "0.3518891027197242"

generator.reset(); // resets the generator's seed and state to "hello world!"
console.log(generator.next()); // prints out "0.6686770371161401"
console.log(generator.next()); // prints out "0.3518891027197242"

generator.seed(324792302); // updates the generator's seed to 324792302
console.log(generator.next()); // prints out "0.31638280814513564"
console.log(generator.next()); // prints out "0.934757471550256"

generator.reset(); // resets the generator's seed and state to 324792302
console.log(generator.next()); // prints out "0.31638280814513564"
console.log(generator.next()); // prints out "0.934757471550256"
```

### Getting 1D and 2D noise values in the range [0, 1)
One dimensional and two dimensional based noise values can be obtained with the functions `getNoise1D(x)` and `getNoise2D(x, y)`, where if the same x and y values are supplied, and the initial seed value is the same, the same noise value will always be generated. Using `next()` and `nextBetween()` will not affect the values these functions produce.
<br>Note: This does not return smoothed noise, you could interpolate it or use perlin or simplex noise.
<br>Example: https://tom-granig.github.io/JS-PRNG/examples/Noise-Patterns-getNoise2D.html

#### 1D noise
One dimensional noise bases its "random" value on a single input, x, as well as the seed value.
```javascript
// creates a new PRNG object and initializes it with the seed "a seed":
const generator = new PRNG('a seed');
// the same value is produced with the same input and seed:
console.log(generator.getNoise1D(12)); // prints out "0.3391361958347261"
console.log(generator.getNoise1D(12)); // prints out "0.3391361958347261"

// a different value is produced with a different input:
console.log(generator.getNoise1D(13)); // prints out "0.40557587472721934"
console.log(generator.getNoise1D(12)); // prints out "0.3391361958347261"

generator.seed('a new seed'); // updates the generator's seed to "a new seed"
// although the input, 13, is the same, due to the different seed value, a different value is generated:
console.log(generator.getNoise1D(13)); // prints out "0.6760188862681389"

```

#### 2D noise
Two dimensional noise bases its "random" value on two inputs, x and y, as well as the seed value.
```javascript
// creates a new PRNG object and initializes it with the seed "a seed":
const generator = new PRNG('a seed');
// the same value is produced with the same inputs and seed:
console.log(generator.getNoise2D(100, 200)); // prints out "0.6134800035506487"
console.log(generator.getNoise2D(100, 200)); // prints out "0.6134800035506487"

// a different value is produced with different inputs:
console.log(generator.getNoise2D(101, 200)); // prints out "0.14556610770523548"
console.log(generator.getNoise2D(100, 200)); // prints out "0.6134800035506487"

generator.seed('a new seed'); // updates the generator's seed to "a new seed"
// although the inputs, 101 and 200, are the same, due to the different seed value, a different value is generated:
console.log(generator.getNoise2D(101, 200)); // prints out "0.4730283385142684"

```
