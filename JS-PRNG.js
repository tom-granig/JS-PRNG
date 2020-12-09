/*
    JS-PRNG v0.2.3 - 12/3/2020
    https://github.com/tom-granig/JS-PRNG
*/


class PRNG {
    constructor(seed) {
        this.seed(seed || 1234); // process the seed that's given, or use the defualt seed, 1234
    }

    _step() { // generate the next random number for next() and nextBetween()
        this.state ^= (this.state >> 7);
        this.state ^= (this.state << 9);
        this.state ^= (this.state >> 13);
    }

    _hashString(seed) { // convert the string into a numerical seed
        let val = 0;
        for (let i = 0; i < seed.length; i++) {
            let code = seed.charCodeAt(i) % 256; // treat the char as one byte
            val ^= code << (i % 4) * 8; // XOR all 32 bits with the 8 bits of "code" as "i" increments
        }
        return val;
    }

    seed(seed) {
        this.state = 0;
        if (typeof seed === 'number') {
            // set the generator's state to the seed as it is a number
            seed = (seed == 0 ? 2 ** 31 : seed);
            this.state = (seed * 16148168401 ^ seed * 305175781 << seed % 31); // make sure that a small change in seed value results in very different first numbers
        } else if (typeof seed === 'string') {
            // hash the seed to get a numerical seed if it is a string
            seed = (seed == '' ? 2 ** 31 : seed);
            this.state = this._hashString(seed);
        } else {
            console.error('JS-PRNG ERROR: Seed must be of type "number" or "string"');
            return;
        }
        this.state &= ~(1 << 31); // set sign bit to 0
        this.start_seed = this.state;
    }

    next() {
        this._step();
        return this.state / (2 ** 31); // converts from an int to a float
    }

    nextBetween(a, b) {
        this._step();
        return Math.floor((this.state / (2 ** 31)) * (b - a + 1)) + a; // converts to an integer in the given range
    }

    reset() {
        this.state = this.start_seed; // reset the generator's state
    }

    getNoise1D(x) { // get noise in range [0, 1) from 1 dimension, x.
        x = x == 0 ? 2 ** 31 : x; // inputs should not be 0
        x = (x * 16148168401 ^ x * 305175781 << x % 31) ^ this.start_seed;
        x = x & ~(1 << 31); // remove leading 1 with a mask

        x ^= ((this.start_seed ^ (x * x)) >> 7);
        x ^= ((this.start_seed ^ (x * x)) << 9);
        x ^= ((this.start_seed ^ x) >> 13);
        return x / (2 ** 31);
    }

    getNoise2D(x, y) { // get noise in range [0, 1) from 2 dimensions, x and y.
        x = x == 0 ? 2 ** 31 : x; // inputs should not be 0
        y = y == 0 ? 2 ** 31 : y;
        x = (x * 16148168401 ^ x * 305175781 << x % 31) ^ this.start_seed;
        y = (y * 16148168401 ^ y * 305175781 << y % 31) ^ this.start_seed;
        x = x & ~(1 << 31); // remove leading 1 with a mask
        y = y & ~(1 << 31); // remove leading 1 with a mask

        x ^= ((this.start_seed ^ (x * y)) >> 7);
        x ^= ((this.start_seed ^ (x * y)) << 9);
        x ^= ((this.start_seed ^ x) >> 13);

        return x / (2 ** 31);
    }
    
    // TODO: Add getNoise3D(x, y, z) function
};
