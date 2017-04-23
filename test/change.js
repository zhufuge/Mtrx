const Mtrx = require('../index');
const assert = require('assert');

const m = new Mtrx([
  [0, 1, 0],
  [1, 3, 4],
  [8, 0 ,2]
]);

// operation
m[1][1] = 6;
const n = new Mtrx([
  [0, 1, 0],
  [1, 6, 4],
  [8, 0, 2]
]);
assert.deepStrictEqual(m, n, 'operation is fault');

// changeRows
m.changeRows(2, 4);
const r = new Mtrx([
  [0, 1, 0],
  [1, 6, 4],
  [8, 0, 2],
  [4, 4, 4],
  [4, 4, 4]
]);
assert.deepStrictEqual(m, r, 'changeRows is fault');

m.changeRows(-1);
const rm = new Mtrx([
  [0, 1, 0],
  [1, 6, 4],
  [8, 0, 2],
  [4, 4, 4],
]);
assert.deepStrictEqual(m, rm, 'changeRows is fault');

// changeRows
m.changeCols(-1);
const cm = new Mtrx([
  [0, 1],
  [1, 6],
  [8, 0],
  [4, 4],
]);
assert.deepStrictEqual(m, cm, 'changeCols is fault');

m.changeCols(2);
const c = new Mtrx([
  [0, 1, 0, 0],
  [1, 6, 0, 0],
  [8, 0, 0, 0],
  [4, 4, 0, 0],
]);
assert.deepStrictEqual(m, c, 'changeCols is fault');

// resetLike
const p = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
m.resetLike(p);
const mp = new Mtrx(p);

assert.deepStrictEqual(m, mp, 'resetLike is fault');

console.log('change.js NO PROBLEM');
