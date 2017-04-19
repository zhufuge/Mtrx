const Mtrx = require('./Mtrx');

// var n = new Mtrx([[2, 0, -1], [1, 3, 2]]);
// var a = [[1, 7, -1], [4, 2, 3], [2, 0, 1]];
// var b = [[1, 2, 0], [3, 4, 4], [5, 6, 3]];
// var m = Mtrx.like([[1, -9], [1, 3]]);
// console.log(m);
// console.log(m.compan);

const {
  create,
  clone,
  transpose,
  isNumbers,
  isMtrxLike,
  isSingular,
  resetMtrx,
  multiply,
  rowEchelon,
  LUP,
  inverse,
  det,
  cof,
  compan,
  test,
} = require('./func');

var a = create((i, j) => (i === j) ? 0 : 1)(4, 5);
console.log(a);
console.log(test(a, (i, j, n) => n - a[i][j]));
console.log(clone(a));
