/*
    JS-PRNG v0.1.0 - 12/2/2020
    https://github.com/tom-granig/JS-PRNG
*/
class PRNG {
    constructor(seed) {
        this._step = () => {
            this.state ^= (this.state >> 7);
            this.state ^= (this.state << 9);
            this.state ^= (this.state >> 13);
        };
        this.seed = seed => {
            if (typeof seed === 'number') {
                // set the genrator's state to the seed as it is a number
                this.state = seed;
            } else if (typeof seed === 'string') {
                // hash the seed to get a numerical seed if it is a string
                for (let i = 0; i < seed.length; i++) {
                    let code = seed.charCodeAt(i) % 256; // treat the char as one byte
                    this.state ^= code << (i % 4) * 8; // XOR all 32 bits with the 8 bits of "code" as "i" increments
                }
            }
            for (let i = 0; i < 4; i++)
                this._step();
        };
        this.next = () => {
            this._step();
            return this.state / (2 ** 31); // converts from an int to a float
        };
        this.nextBetween = (a, b) => {
            this._step();
            return Math.floor((this.state / (2 ** 31)) * (b - a + 1)) + a; // converts to a number in the given range
        };
        this.seed(seed || 1234); // process the seed that's given, or use the defualt seed, 1234
    }
};