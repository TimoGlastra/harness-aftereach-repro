# React Native Harness: afterEach hooks run outer suite first

Jest and Vitest run `afterEach` hooks from the innermost suite outwards. React Native Harness 1.6.0 runs them from the outer suite inwards, the same order as `beforeEach`. See [`afterEach.harness.ts`](afterEach.harness.ts).

```bash
npm install
npx expo run:ios --no-bundler   # builds and installs the app on a simulator
npm run test:ios
```

Expected, as in [Jest](https://jestjs.io/docs/setup-teardown#order-of-execution) and Vitest: `inner afterEach > outer afterEach`. Actual:

```
● inner › afterEach hooks of the first test ran inner first
  expected 'outer afterEach > inner afterEach' to be 'inner afterEach > outer afterEach'
```

The cause is `collectInheritedHooks` in `packages/runtime/src/runner/hooks.ts`, which returns hooks root first for `afterEach` too. Reversing the list for `afterEach` fixes it.

`package.json` pins `expo-file-system` to 58.0.11: 58.0.12 crashes at launch with the current `expo-modules-core` (unrelated to Harness).

The simulator in `rn-harness.config.mjs` is an iPhone 17 Pro on iOS 26.2. Change it to one you have, or use `npm run test:android` after `npx expo run:android --no-bundler`.
