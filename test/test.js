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
  everyMtrx,
  someMtrx,
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
console.log(m.min(1));
console.log(m.max(1));
console.log(m.sum(1));
const n = Mtrx.like([
  [8, 3, 4],
  [2, 4, 5],
]);

console.log(Mtrx.equal(m, n));
console.log(m.mapMtrx((n) => n+1));
console.log(m.cof(9, 9));
console.log(Mtrx.cof);
