const Mtrx = require('../index');
const assert = require('assert');
const {
  create,
  clone,
  transpose,
  isNumbers,
  isMtrxLike,
  isSingular,
  isDiag,
  resetMtrx,
  mapMtrx,
  reduceMtrx,
  multiply,
  rowEchelon,
  LUP,
  inverse,
  det,
  cof,
  compan,
} = require('../func');

const m = Mtrx.like([
  [8, 3, 4],
  [2, 4, 5]
]);

const sum = reduceMtrx(m, (sum, n, i, j) => sum + n, 0);
const min = reduceMtrx(m, (min, n, i, j) => (min > n) ? n : min);
const mina = m[1].reduce((min, n, i) => (min > n) ? n : min);
console.log(m.min());
console.log(m.max());
console.log(m.sum());
