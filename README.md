# JS-PRNG
JS-PRNG is a small pseuodrandom number generator written in JavaScript that can be used to generate any number of seemingly random numbers based on the given initial seed value. Both numbers and strings are supported as valid seed values. The distribution of the random numbers is very uniform.

DEMO: https://tom-granig.github.io/JS-PRNG/examples/Noise-Patterns.html

**NOTE**: This generator is not intended to be cryptographically secure and should not be used for any cryptographic purposes. Consider using the SubtleCrypto API instead. 

## How To Use
### Generate numbers in range [0, 1)
The `next()` function returns the next random floating point value between 0, inclusive and 1, exclusive.
```javascript
// creates a new PRNG object an initializes it with the seed 324792302
const generator = new PRNG(324792302); 
console.log(generator.next()); // prints out "0.09082991071045399"
console.log(generator.next()); // prints out "0.7935932422988117"
```
### Generate intergers in range [a, b]
The `nextBetween(a, b)` function returns the next random integer between and including a and b.
```javascript
// creates a new PRNG object an initializes it with the seed 324792302
const generator = new PRNG(324792302);
console.log(generator.nextBetween(1, 6)); // prints out "1"
console.log(generator.nextBetween(1, 6)); // prints out "5"
```

### Using a string as a seed
Strings can be used as seeds, with character values above 255 (end of ASCII range) wrapping over.
```javascript
// creates a new PRNG object an initializes it with the seed "hello world!"
const generator = new PRNG('hello world!');
console.log(generator.next()); // prints out "0.6785369706340134"
console.log(generator.next()); // prints out "0.5506081636995077"
```
### Changing the seed
The seed can be changed or reset with the `seed(seedValue)` function without having to create a new PRNG object.
```javascript
// creates a new PRNG object an initializes it with the seed "hello world!"
const generator = new PRNG('hello world!');
console.log(generator.next()); // prints out "0.6785369706340134"
console.log(generator.next()); // prints out "0.5506081636995077"

generator.seed(324792302); // updates the generator's seed to 324792302
console.log(generator.next()); // prints out "0.09082991071045399"
console.log(generator.next()); // prints out "0.7935932422988117"
```
