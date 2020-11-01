const fs = require("fs");
const loader = require("@assemblyscript/loader");

const imports = {};

const wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + "/build/optimized.wasm"), imports);

class Random {
  #instance;

  constructor(seed) {
    if (typeof seed === "bigint") this.#instance = new wasmModule.exports.Random(seed);
    else if (typeof seed === "number") this.#instance = new wasmModule.exports.Random(BigInt(seed));
    else if (typeof seed === "undefined") this.#instance = new wasmModule.exports.Random(BigInt(Date.now()));
    else throw new TypeError("Invalid type for seed");
  }

  setSeed(seed) {
    if (typeof seed === "bigint") this.#instance.setSeed(seed);
    else if (typeof seed === "number") this.#instance.setSeed(BigInt(seed));
    else if (typeof seed === "undefined") this.#instance.setSeed(BigInt(Date.now()));
    else throw new TypeError("Invalid type for seed");
  }

  next(bits) {
    return this.#instance.next(bits);
  }

  nextInt(n) {
    if (typeof n === "undefined") return this.#instance.nextInt();
    else if (typeof n === "number") return this.#instance.nextInt$n_i32(n);
    else throw new TypeError("Invalid type for n");
  }

  // TODO: This is absolutely terrible performance-wise. Need to figure out how to grab this from an array in WASM memory.
  nextBytes(bytes, length) {
    for (let i = 0; i < length; ) {
      for (let rnd = this.nextInt(), n = Math.min(length - i, 4); n-- > 0; rnd >>= 8) {
        bytes[i++] = rnd & 0xff;
      }
    }
  }

  nextLong() {
    return this.#instance.nextLong();
  }

  nextBoolean() {
    return this.#instance.nextBoolean();
  }

  nextFloat() {
    return this.#instance.nextFloat();
  }

  nextDouble() {
    return this.#instance.nextDouble();
  }

  nextGaussian() {
    return this.#instance.nextGaussian();
  }
}

module.exports = Random;

Object.defineProperty(module.exports, "default", { value: Random });
