const Mtrx = require('../index');
const assert = require('assert');

const m = new Mtrx([
  [1, 2, 0],
  [3, 4, 4],
  [5, 6, 3]
]);
const diag = new Mtrx([
  [6,   0, 0, 0],
  [0, 0.6, 0, 0],
  [0,   0, 2, 0],
  [0,   0, 0, 1]
]);

assert.deepStrictEqual(m[2][1], 6, 'get a wrong item');

// rows, cols
assert.deepStrictEqual(m.rows, 3, 'get a wrong rows');
assert.deepStrictEqual(m.cols, 3, 'get a wrong cols');

// T
const t = new Mtrx([
  [1, 3, 5],
  [2, 4, 6],
  [0, 4, 3]
]);
assert.deepStrictEqual(m.T, t, 'get a wrong transpose');
assert.deepStrictEqual(diag.T, diag, 'get a wrong transpose');

// rank
assert.deepStrictEqual(m.rank, 3, 'get a wrong rank');
assert.deepStrictEqual(diag.rank, 4, 'get a wrong rank');

// LUP
const l = new Mtrx([
  [  1,   0, 0],
  [0.2,   1, 0],
  [0.6, 0.5, 1]
]);
assert.deepStrictEqual(m.LUP.L, l, 'get a wrong L');
assert.deepStrictEqual(diag.LUP.L, Mtrx.eye(4), 'get a wrong L');

const u = new Mtrx([
  [ 5,   6,    3 ],
  [ 0, 0.8, -0.6 ],
  [ 0,   0,  2.5 ]
]);
assert.deepStrictEqual(m.LUP.U, u, 'get a wrong U');
assert.deepStrictEqual(diag.LUP.U, diag, 'get a wrong U');

const p = new Mtrx([
  [ 0, 0, 1 ],
  [ 1, 0, 0 ],
  [ 0, 1, 0 ]
]);
assert.deepStrictEqual(m.LUP.P, p, 'get a wrong U');
assert.deepStrictEqual(diag.LUP.P, Mtrx.eye(4), 'get a wrong U');


// inverse
const inv = new Mtrx([
  [ -1.2, -0.6,  0.8 ],
  [  1.1,  0.3, -0.4 ],
  [ -0.2,  0.4, -0.2 ]
]);
assert.deepStrictEqual(m.inv, inv, 'get a wrong inverse');

// det
assert.deepStrictEqual(m.det, 10, 'get a wrong det');
assert.deepStrictEqual(diag.det, 7.2, 'get a wrong det');

// compan
const compan = new Mtrx([
  [ -12, -6,  8 ],
  [  11,  3, -4 ],
  [  -2,  4, -2 ]
]);
assert.deepStrictEqual(m.compan, compan, 'get a wrong compan');

// rowEchelon
const re = new Mtrx([
  [ 1,  2, 0 ],
  [ 0, -1, 2 ],
  [ 0,  0, 1 ]
]);
assert.deepStrictEqual(m.rowEchelon, re, 'get a wrong rowEchelon');
