const clone = require('./clone'),
      isNumbers = require('./isNumbers'),
      gcd = require('./gcd'),
      {preciseFloat, preciseSub} = require('./precise'),
      {abs} = Math;

const arrayGcd = (...row) => row.reduce((g, v) =>  gcd(g, v), 0);
function reduceRow(row) {
  if (isNumbers(row)) {
    const gcd = arrayGcd(...row),
          length = row.length;
    let zeros = 0;
    for (let i = 0; i < length; i++) {
      if (row[i] !== 0) {
        row[i] /= gcd;
      } else {
        zeros++;
      }
    }
    if (zeros === length - 1) {
      row[length - 1] = 1;
    }
  }
};

const lcm = (a, b) => preciseFloat(a * b /  gcd(a, b));

function rowEchelon(matrix) {
  let A = clone(matrix),
      B = Array(),
      cols = A[0].length;
  for (let c = 0; c < cols && A.length > 0; c++) {
    A.sort((a, b) => {
      if (a[c] === 0) return 1;
      if (b[c] === 0) return -1;
      return abs(a[c]) - abs(b[c]);
    });

    var topR = A[0],
        topRC = topR[c];
    if (topRC !== 0) {
      for (let i = 1, row = A.length; i < row; i++) {
        var iRow = A[i],
            iRowC = iRow[c],
            l = lcm(topRC, iRowC);
        if (iRowC !== 0) {
          for (let j = c; j < cols; j++) {
            iRow[j] = preciseSub((iRow[j] * l / iRowC), (topR[j] * l / topRC));
          }
        }
        reduceRow(iRow);
      }
      B.push(A.shift());
    }
  }

  return B;
};

module.exports = rowEchelon;
