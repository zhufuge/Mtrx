const ArrayProto = Array.prototype;
const NativeIsArray = Array.isArray;
const {abs, floor, random, max} = Math;
const {isInteger, EPSILON} = Number;

function create(fn) {
  return function(rows=1, cols=rows) {
    var matrix = Array(rows);
    for (let i = 0; i < rows; i++) {
      matrix[i] = Array(cols);
      for (let j = 0; j < cols; j++) {
        matrix[i][j] = fn(i, j);
      }
    }
    return matrix;
  };
}
function clone(matrix) {
  const rows = matrix.length;
  var newMatrix = Array(rows);
  for (let i = 0; i < rows; i++) {
    newMatrix[i] = ArrayProto.slice.call(matrix[i]);
  }
  return newMatrix;
}

function isNumbers(array) {
  if (!NativeIsArray(array) || array.length <= 0) return false;
  for (let i of array) {
    if (typeof i !== 'number') return false;
  }
  return true;
}
function isMtrxLike(obj) {
  if (!NativeIsArray(obj) || obj.length <= 0) return false;

  const length = obj[0].length;
  if (length <= 0) return false;

  for (let rows of obj) {
    if (!isNumbers(rows) ||
        rows.length !== length) {
      return false;
    }
  }

  return true;
}
function resetMtrx(matrix, matrixLike) {
  const rows = matrix.length;
  for (let i = rows; i > 0; i--) {
    matrix.pop();
  }

  const newRows = matrixLike.length;
  for (let i = 0; i < newRows; i++) {
    matrix.push(matrixLike[i]);
  }
}


function addition(add=true) {
  const operator = (a, b) => (add) ? (a + b) : (a - b);
  return function(A, B) {
    const rows = A.length,
          cols = A[0].length;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        A[i][j] = operator(A[i][j], B[i][j]);
      }
    }
  };
}
function mulNumber(mul=true) {
  const operator = (a, b) => (mul) ? (a * b) : (a / b);
  return function(A, n) {
    const rows = A.length,
          cols = A[0].length;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        A[i][j] = operator(A[i][j], n);
      }
    }
  };
}
function multiply(matrix, another) {
  const rows = matrix.length,
        cols = another[0].length,
        n = matrix[0].length;

  let newMatrix = create((i, j) => {
    let sum = 0;
    for (let k = 0; k < n; k++) {
      sum += matrix[i][k] * another[k][j];
    }
    return sum;
  })(rows, cols);

  for (let i = 0; i < rows; i++) {
    matrix[i] = newMatrix[i];
  }
}

var precFloat = (n, f=15) => Number.parseFloat(n.toFixed(f));
var gcd = (a, b) => {
  if (isInteger(a) && isInteger(b)) {
    [a, b] = [abs(a), abs(b)];
    while (b > 0) [a, b] = [b, a % b];
    return a;
  } else {
    return 1;
  }
};
var lcm = (a, b) => precFloat(a * b /  gcd(a, b));
var arrayGcd = (row) => row.reduce((g, val) =>  gcd(g, val), 0);
var reduceRow = function(row) {
  if (isNumbers(row)) {
    const gcd = arrayGcd(row),
          length = row.length;
    let zeros = 0;
    for (let i = 0; i < length; i++) {
      if (row[i] !== 0) {
        row[i] = row[i] / gcd;
      } else {
        zeros++;
      }
    }
    if (zeros === length - 1) {
      row[length - 1] = 1;
    }
  }
};
var precSub = (a, b) => (abs(a - b) < EPSILON) ? 0 : precFloat(a - b);

function rowEchelon(matrix) {
  let A = [...matrix],
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
            iRow[j] = precSub((iRow[j] * l / iRowC), (topR[j] * l / topRC));
          }
        }
        reduceRow(iRow);
      }
      B.push(A.shift());
    }
  }

  return B;
};

module.exports = {
  create,
  clone,
  isNumbers,
  isMtrxLike,
  resetMtrx,
  addition,
  mulNumber,
  multiply,
  rowEchelon,
};
