const Mtrx = require('../index');
const assert = require('assert');

// add
(() => {
  const a = [
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3]
  ];
  const m = new Mtrx(a);
  const n = new Mtrx(a);
  const p = new Mtrx([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ]);
  const q = new Mtrx([
    [2, 2, 3],
    [1, 3, 3],
    [1, 2, 4]
  ]);

  const r = Mtrx.add(m, p);
  assert.deepStrictEqual(m, n, 'new Mtrx is fault');
  assert.deepStrictEqual(r, q, 'Mtrx.add is fault');
  assert.deepStrictEqual(m, n, 'Mtrx.add is fault, first has change');

  n.add(p);
  assert.deepStrictEqual(n, q, '.add is fault');
  assert.notDeepStrictEqual(n, m, '.add is not effect');
})();

// sub
(() => {
  const a = [
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3]
  ];
  const m = new Mtrx(a);
  const n = new Mtrx(a);
  const p = new Mtrx([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ]);
  const q = new Mtrx([
    [0, 2, 3],
    [1, 1, 3],
    [1, 2, 2]
  ]);

  const r = Mtrx.sub(m, p);
  assert.deepStrictEqual(m, n, 'new Mtrx is fault');
  assert.deepStrictEqual(r, q, 'Mtrx.sub is fault');
  assert.deepStrictEqual(m, n, 'Mtrx.sub is fault, first has change');

  n.sub(p);
  assert.deepStrictEqual(n, q, '.sub is fault');
  assert.notDeepStrictEqual(n, m, '.sub is not effect');
})();

// mul
(() => {
  const a = [
    [1, 2, 0],
    [3, 4, 4],
    [5, 6, 3]
  ];
  const m = new Mtrx(a);
  let r;

  // number
  const n = new Mtrx(a);
  const number = 6;
  const q = new Mtrx([
    [ 6, 12,  0],
    [18, 24, 24],
    [30, 36, 18],
  ]);

  r = Mtrx.mul(m, number);
  assert.deepStrictEqual(m, n, 'new Mtrx is fault');
  assert.deepStrictEqual(r, q, 'Mtrx.mul number is fault');
  assert.deepStrictEqual(m, n, 'Mtrx.mul number is fault, first has change');

  n.mul(number);
  assert.deepStrictEqual(n, q, '.mul number is fault');
  assert.notDeepStrictEqual(n, m, '.mul number is not effect');

  // matrix
  const l = new Mtrx(a);
  const p = new Mtrx([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ]);
  r = Mtrx.mul(m, p);
  assert.deepStrictEqual(r, m, 'Mtrx.mul matrix is fault');
  assert.deepStrictEqual(m, l, 'Mtrx.mul matrix is fault, first has change');

  const x = new Mtrx([
    [-1.4],
    [ 2.2],
    [ 0.6]
  ]);
  const right = new Mtrx([
    [3],
    [7],
    [8]
  ]);

  r = Mtrx.mul(m, x);
  assert.deepStrictEqual(r, right, 'Mtrx.mul matrix is fault');
  assert.deepStrictEqual(m, l, 'Mtrx.mul matrix is fault, first has change');
})();

console.log('calculate.js NO PROBLEM');
