const Mtrx = require('../index');
const assert = require('assert');

const a = new Mtrx([[2, 0, -1], [1, 3, 2]]);
// console.log(m);

const b = [1, 2, 3, 4];
const c = new Mtrx([
  [1, 0, 0, 0],
  [0, 2, 0, 0],
  [0, 0, 3, 0],
  [0, 0, 0, 4]
]);
assert.deepStrictEqual(new Mtrx(b), c, 'new Mtrx diag is fault');

const d = new Mtrx([
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1]
]);
assert.deepStrictEqual(new Mtrx(3, 3, 'E'), d, 'new Mtrx eye is fault');

const e = new Mtrx([
  [6, 6, 6],
  [6, 6, 6]
]);
assert.deepStrictEqual(new Mtrx(2, 3, 6), e, 'new Mtrx by number is fault');

const f = new Mtrx([
  [0, 1, 1],
  [1, 0, 1],
  [1, 1, 0],
  [1, 1, 1]
]);
assert.deepStrictEqual(new Mtrx(4, 3, (i, j) => (i === j) ? 0 : 1),
                       f, 'new Mtrx by function is fault');

