const Mtrx = require('../index');
const assert = require('assert');

const m = Mtrx.like([
  [8, 3, 4],
  [2, 4, 5]
]);
const x = new Mtrx([1, 2,3]);
console.log(x);
console.log(m.min());
console.log(m.max());
console.log(m.sum());
const n = Mtrx.like([
  [8, 3, 4],
  [2, 4, 5],
]);

console.log(Mtrx.equalAll(m, n));
console.log(m.cof(9, 9));
console.log(m.T);
