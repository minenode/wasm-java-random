# wasm-java-random

A full implentation of Java's [java.util.Random](https://docs.oracle.com/javase/6/docs/api/java/util/Random.html) class for JavaScript, written in WebAssembly using AssemblyScript.

In theory, this is portable across Node.JS and modern browsers.

See [index.d.ts](./index.d.ts) for the exported API.

```
yarn add @minenode/wasm-java-random
```

**TODO: Modify `Random#nextInt` to read data from WASM memory for performance.**

---

Copyright &copy; MineNode. Licensed under the MIT License.
