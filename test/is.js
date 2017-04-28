const Mtrx = require('../index');
const assert = require('assert');

const m = [
  [ 1,  -2],
  [34, 0.2]
];
const n = [
  [0, 0],
  [0, 0]
];
const f = [
  [1, 2, 3],
  [1, 2, 3]
];
assert.deepStrictEqual(Mtrx.isMtrx(new Mtrx()), true, 'isMtrx is fault');
assert.deepStrictEqual(Mtrx.isMtrx(m), false, 'isMtrx is fault');

assert.deepStrictEqual(Mtrx.isMtrxLike(new Mtrx()), true, 'isMtrxLike is fault');
assert.deepStrictEqual(Mtrx.isMtrxLike(m), true, 'isMtrxLike is fault');
assert.deepStrictEqual(Mtrx.isMtrxLike([1, 2]), false, 'isMtrxLike is fault');

assert.deepStrictEqual(Mtrx.isSameShape(m, n), true, 'isSameShape is fault');
assert.deepStrictEqual(Mtrx.isSameShape(m, f), false, 'isSameShape is fault');

assert.deepStrictEqual(Mtrx.isDiag(n), true, 'isDiag is fault');
assert.deepStrictEqual(Mtrx.isDiag(m), false, 'isDiag is fault');
assert.deepStrictEqual(Mtrx.isDiag(f), false, 'isDiag is fault');
