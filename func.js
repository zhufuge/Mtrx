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
function transpose(matrix) {
  return create((i, j) => matrix[j][i])(matrix[0].length, matrix.length);
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
var precSub = (a, b) => (abs(a - b) < EPSILON) ? 0 : precFloat(a - b);

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

function reduceRow(row) {
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

function range(start, stop, step=1) {
  if (stop == null) {
    stop = start || 0;
    start = 0;
  }
  var length = max(Math.ceil((stop - start) / step), 0);
  var range = Array(length);

  for (let idx = 0; idx < length; idx++, start += step) {
    range[idx] = start;
  }

  return range;
};

function permutationArray(matrix) {
  let A = clone(matrix),
      n = A.length,
      order = range(n);
  let swapOf = (i, j, array) => [array[i], array[j]] = [array[j], array[i]];
  for (let k = 0; k < n; k++) {
    var max = 0, maxIndex = 0;
    for (let i = k; i < n; i++) {
      var A_ik = abs(A[i][k]);
      if (A_ik > max) {
        max = A_ik;
        maxIndex = i;
      }
    }

    if (max === 0) throw Error('Singular matrix');

    swapOf(k, maxIndex, order);
    swapOf(k, maxIndex, A);

    for (let i = k + 1; i < n; i++) {
      A[i][k] = A[i][k] / A[k][k];
      for (let j = k + 1; j < n; j++) {
        A[i][j] = precSub(A[i][j], A[i][k] * A[k][j]);
      }
    }
  }
  return order;
}
function order2permutation(o) {
  return create((i, j) => (j === o[i]) ? 1 : 0)(o.length);
}
function permutation2order(matrix) {
  return matrix.map((r) => r.indexOf(1));
}

function LUP(matrix) {
  const n = matrix.length,
        P = order2permutation(permutationArray(matrix));

  var A = clone(P),
      U = create(() => 0)(n),
      L = create((i, j) => (i === j) ? 1 : 0)(n);
  multiply(A, matrix);
  for (let k = 0; k < n; k++) {
    U[k][k] = A[k][k];

    for (let i = k + 1; i < n; i++) {
      L[i][k] = A[i][k] / U[k][k];
      U[k][i] = A[k][i];
    }

    for (let i = k + 1; i < n; i++) {
      for (let j = k + 1; j < n; j++) {
        A[i][j] = precSub(A[i][j], L[i][k] * U[k][j]);
      }
    }
  }

  return [L, U, P];
}

function LUPSolve(L, U, p, b) {
  const n = L.length;
  var x = Array(n).fill(0),
      y = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    var ly = 0;
    for (let j = 0; j < i; j++) {
      ly += precFloat(L[i][j] * y[j]);
    }
    y[i] = precSub(b[p[i]], ly);
  }

  for (let i = n - 1; i >= 0; i--) {
    var ux = 0;
    for (let j = i + 1; j < n; j++) {
      ux += precFloat(U[i][j] * x[j]);
    }
    x[i] = precFloat((y[i] - ux) / U[i][i]);
  }
  return x;
}

function inverse(matrix) {
  const n = matrix.length;
  var A = Array(n),
      [L, U, P] = LUP(matrix),
      p = permutation2order(P);
  for (let i = 0; i < n; i++) {
    var b = Array(n).fill(0);
    b[i] = 1;
    A[i] = LUPSolve(L, U, p, b);
  }
  return transpose(A);
};


function permutationDet(matrix) {
  const n = matrix.length;
  var det = 1;
  for (let i = 0; i < n - 1; i++) {
    for (var j = 0; matrix[j][i] !== 1; j++);
    det *= (j % 2 === 0) ? 1 : -1;
    matrix.splice(j, 1);
  }
  return det;
}

function diagDet(matrix) {
  let det = 1;
  for (let i = 0, len = matrix.length; i < len; i++) {
    det *= matrix[i][i];
  }
  return det;
}

function isZeros(array) {
  return array.every((n) => n === 0);
}
function hasZeroRow(matrix) {
  return matrix.some((row) => isZeros(row));
}

function isSingular(matrix) {
  return matrix.length !== matrix[0].length ||
    hasZeroRow(matrix) ||
    hasZeroRow(transpose(matrix)) ||
    rowEchelon(matrix).length !== matrix.length;
}

function det(matrix) {
  if (matrix.length !== matrix[0].length) return NaN;
  if (isSingular(matrix)) return 0;

  var [L, U, P] = LUP(matrix);
  return precFloat(diagDet(L) * diagDet(U)) * permutationDet(P);
};

function cof(matrix, i, j) {
  const RCfilter = (pass) => (val, index) => (index === pass) ? false : true;
  return matrix.filter(RCfilter(i)).map((r) => r.filter(RCfilter(j)));
}

function compan(matrix) {
  if (matrix.length !== matrix[0].length) {
    throw TypeError(this + ' is not a Square matrix.');
  }
  if (!isSingular(matrix)) {
    let A = inverse(matrix);
    mulNumber(true)(A, det(matrix));
    for (let i = 0, n = matrix.length; i < n; i++) {
      for (let j = 0; j < n; j++) {
        A[i][j] = precFloat(A[i][j]);
      }
    }
    return A;
  } else {
    const n = matrix.length;
    if (n > 1) {
      return create((i, j) => det(cof(matrix, i, j)))(n);
    } else {
      return clone(matrix);
    }
  }
}

isDivable = (matrix, another) => {
  return Algm.isMulable(matrix, another) &&
    !Algm.isSingular(another);
};
divUp = (matrix, another) => (Algm.isDivable(matrix, another))
  ? Algm.mulUp(matrix, Algm.inv(another))
  : matrix;


module.exports = {
  create,
  clone,
  transpose,
  isNumbers,
  isMtrxLike,
  isSingular,
  resetMtrx,
  addition,
  mulNumber,
  multiply,
  rowEchelon,
  LUP,
  inverse,
  det,
  cof,
  compan,
};
