const ArrayProto = Array.prototype;
const NativeIsArray = Array.isArray;
const {abs, floor, random, max} = Math;
const {isInteger, EPSILON} = Number;

const ArrayFill = (n, f=0) => Array(n).fill(f);

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
  return create((i, j) => matrix[i][j])(matrix.length, matrix[0].length);
}
function transpose(matrix) {
  return create((i, j) => matrix[j][i])(matrix[0].length, matrix.length);
};

const isNumbers = (array) => {
  return (NativeIsArray(array) && array.length > 0)
    ? array.every((i) => typeof i === 'number')
    : false;
};
const isMtrxLike = (obj) => {
  return (NativeIsArray(obj) &&
          obj.length > 0 &&
          obj[0].length > 0)
    ? obj.every((rows) => isNumbers(rows) && rows.length === obj[0].length)
    : false;
};

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

function mapMtrx(matrix, fn) {
  return matrix.map((r, rIndex) =>
                    r.map((c, cIndex) =>
                          fn(c, rIndex, cIndex)));
}

function reduceMtrx(matrix, fn, init=matrix[0][0]) {
  return matrix.reduce((r_sum, r, rIndex) =>
                       r.reduce((c_sum, c, cIndex) =>
                                fn(c_sum, c, rIndex, cIndex), r_sum), init);
}

const precFloat = (n, f=20) => Number.parseFloat(n.toFixed(f));
const precSub = (a, b) => (abs(a - b) < EPSILON) ? 0 : precFloat(a - b, 15);

function multiply(matrix, another) {
  const createMultiply = create((i, j) => {
    return matrix.reduce((sum, r, k) =>
                         precFloat(sum + matrix[i][k] * another[k][j], 14), 0);
  });
  return createMultiply(matrix.length, another[0].length);
}

const gcd = (a, b) => {
  if (isInteger(a) && isInteger(b)) {
    [a, b] = [abs(a), abs(b)];
    while (b > 0) {
      [a, b] = [b, a % b];
    }
    return a;
  } else {
    return 1;
  }
};
const lcm = (a, b) => precFloat(a * b /  gcd(a, b));
const Gcd = (...row) => row.reduce((g, val) =>  gcd(g, val), 0);

function reduceRow(row) {
  if (isNumbers(row)) {
    const gcd = Gcd(...row),
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
  const swapOf = (i, j, array) => [array[i], array[j]] = [array[j], array[i]];
  for (let k = 0; k < n; k++) {
    var max = 0, maxIndex = 0;
    for (let i = k; i < n; i++) {
      var A_ik = abs(A[i][k]);
      if (A_ik > max) {
        max = A_ik;
        maxIndex = i;
      }
    }

    if (max === 0) throw Error(matrix + 'is a Singular matrix');

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
const order2permutation = (o) => create((i, j) => (j === o[i]) ? 1 : 0)(o.length);
const permutation2order = (matrix) => matrix.map((r) => r.indexOf(1));

function LUP(matrix) {
  if (!isSquare(matrix)) throw Error(matrix + ' is not a Square matrix');
  const n = matrix.length,
        P = order2permutation(permutationArray(matrix));

  var A = multiply(P, matrix),
      U = create(() => 0)(n),
      L = create((i, j) => (i === j) ? 1 : 0)(n);
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

  return {L, U, P};
}

function LUPSolve(L, U, p, b) {
  const n = L.length;
  var x = ArrayFill(n),
      y = ArrayFill(n);
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
    x[i] = precFloat((y[i] - ux) / U[i][i], 15);
  }
  return x;
}

function inverse(matrix) {
  if (!isSquare(matrix)) throw Error(matrix + ' is not a Square matrix');
  const n = matrix.length;
  let A = Array(n),
      {L, U, P} = LUP(matrix),
      p = permutation2order(P);
  for (let i = 0; i < n; i++) {
    var b = ArrayFill(n);
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

const isZeros = (array) => array.every((n) => n === 0);
const hasZeroRow = (matrix) =>  matrix.some((row) => isZeros(row));
const isSquare = (matrix) => matrix.length === matrix[0].length;
const isSingular = (matrix) => !isSquare(matrix) ||
      hasZeroRow(matrix) ||
      hasZeroRow(transpose(matrix)) ||
      rowEchelon(matrix).length !== matrix.length;
const isDiag = (matrix) =>
      isMtrxLike(matrix) &&
      isSquare(matrix) &&
      matrix.every((r, i) => r.every((c, j)=> (i === j) ? true : (c === 0)));

const diagDet = (diag) =>  diag.reduce((det, r, i) => det * r[i], 1);
function det(matrix) {
  if (!isSquare(matrix)) return NaN;
  if (isSingular(matrix)) return 0;
  if (isDiag(matrix)) return precFloat(diagDet(matrix), 14);
  const {L, U, P} = LUP(matrix);
  return precFloat(diagDet(L) * diagDet(U), 14) * permutationDet(P);
};

function cof(matrix, i, j) {
  const RCfilter = (pass) => (val, index) => (index === pass) ? false : true;
  return matrix.filter(RCfilter(i)).map((r) => r.filter(RCfilter(j)));
}

function compan(matrix) {
  if (!isSquare(matrix)) throw Error(matrix + ' is not a Square matrix.');
  if (!isSingular(matrix)) {
    const d = det(matrix);
    return mapMtrx(inverse(matrix), (n, i, j) => precFloat(n * d));
  } else {
    const n = matrix.length;
    return (n > 1)
      ? create((i, j) => det(cof(matrix, i, j)))(n)
      : clone(matrix);
  }
}

module.exports = {
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
};
