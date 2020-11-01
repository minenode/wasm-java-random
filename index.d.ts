declare class Random {
  constructor();
  constructor(seed: bigint | number);

  setSeed(seed: bigint): void;
  next(bits: number): number;
  nextBytes(buffer: Uint8Array, n: number): void;
  nextInt(): number;
  nextInt(n: number): number;
  nextLong(): bigint;
  nextBoolean(): boolean;
  nextFloat(): number;
  nextDouble(): number;
  nextGaussian(): number;
}

declare const ex: typeof Random & { default: typeof Random };
export = ex;
