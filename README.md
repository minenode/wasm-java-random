# wasm-java-random

A full implentation of Java's [java.util.Random](https://docs.oracle.com/javase/6/docs/api/java/util/Random.html) class for JavaScript, written in WebAssembly using AssemblyScript.

```
yarn add @minenode/wasm-java-random
```

In theory, this is portable across Node.JS and modern browsers. Though this may not be the case due to 64-bit integers not yet being supported on browsers.

In Node.JS, you must use the `--experimental-wasm-bigint` (Node >= 13) flag when running Node to enable the use of bigints for representing 64-bit results. Without this flag enabled, you will get this error when calling the `Random` class constructor:

```
Uncaught TypeError: wasm function signature contains illegal type
```

---

See [index.d.ts](./index.d.ts) for the exported API.

**TODO: Modify `Random#nextInt` to read data from WASM memory for performance.**

---

Copyright &copy; MineNode. Licensed under the MIT License.
