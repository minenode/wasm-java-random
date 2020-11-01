export class Random {
  private _seed: i64;
  private _nextNextGaussian: f64;
  private _haveNextNextGaussian: boolean = false;

  constructor(seed: i64) {
    this.setSeed(seed);
  }

  setSeed(seed: i64): void {
    this._seed = (seed ^ 0x5deece66d) & ((i64(1) << 48) - 1);
  }

  next(bits: u8): i32 {
    if (bits < 1) bits = 1;
    if (bits > 32) bits = 32;
    this._seed = (this._seed * 0x5deece66d + 0xb) & ((i64(1) << 48) - 1);
    return i32(this._seed >> (48 - bits));
  }

  // Split into two methods for overloading

  nextInt(): i32 {
    return this.next(32);
  }

  nextInt$n_i32(n: i32): i32 {
    if (n < 0) throw new TypeError("n must be positive (or -1 to get a uniformly distributed value)");
    if ((n & ~n) == n) return (n * this.next(31)) >> 31;
    let bits: i32, val: i32;
    do {
      bits = this.next(31);
      val = bits % n;
    } while (bits - val + (n - 1) < 0);
    return val;
  }

  // TODO: Shared memory for passing result array

  // /**
  //  * This differs from the Java spec due to technical limitations of WASM.
  //  * Passing shared memory is quite complicated, and thus, instead of passing a UInt8Array
  //  * and mutating it by-reference, this function generates a new array and returns it.
  //  *
  //  * @param length The number of bytes to create
  //  */
  // nextBytes(length: u32): Uint8Array {
  //   const bytes: Uint8Array = new Uint8Array(length);
  //   for (let i: u32 = 0; i < length; ) {
  //     for (let rnd = this.nextInt(), n = Math.min(length - i, 4); n-- > 0; rnd >>= 8) {
  //       bytes[i++] = u8(rnd & 0xff);
  //     }
  //   }

  //   store<Uint8Array>(0, bytes);

  //   return bytes;
  // }

  nextLong(): i64 {
    return (i64(this.next(32)) << 32) + this.next(32);
  }

  nextBoolean(): boolean {
    return this.next(1) != 0;
  }

  nextFloat(): f32 {
    return f32(this.next(24)) / f32(1 << 24);
  }

  nextDouble(): f64 {
    return f64((i64(this.next(26)) << 27) + this.next(27)) / f64(1 << 53);
  }

  nextGaussian(): f64 {
    if (this._haveNextNextGaussian) {
      this._haveNextNextGaussian = false;
      return this._nextNextGaussian;
    } else {
      let v1: f64, v2: f64, s: f64;
      do {
        v1 = 2 * this.nextDouble() - 1;
        v2 = 2 * this.nextDouble() - 1;
        s = v1 * v1 + v2 * v2;
      } while (s >= 1 || s == 0);
      let multiplier: f64 = Math.sqrt((-2 * Math.log(s)) / s);
      this._nextNextGaussian = v2 * multiplier;
      this._haveNextNextGaussian = true;
      return v1 * multiplier;
    }
  }
}
