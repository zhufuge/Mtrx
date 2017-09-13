const isSquare = require('./isSquare'),
      transpose = require('./transpose'),
      LUP = require('./lup')

const ArrayFill = (n, f=0) => Array(n).fill(f)
const permutation2order = (matrix) => matrix.map(r => r.indexOf(1))

function inverse(matrix) {
  if (!isSquare(matrix)) throw Error(matrix + ' is not a Square matrix')
  const n = matrix.length
  let A = Array(n),
      { L, U, P } = LUP(matrix),
      p = permutation2order(P)

  let b
  for (let i = 0; i < n; i++) {
    b = ArrayFill(n)
    b[i] = 1
    A[i] = LUPSolve(L, U, p, b)
  }
  return transpose(A)
}

function LUPSolve(L, U, p, b) {
  const n = L.length
  let x = ArrayFill(n),
      y = ArrayFill(n)
  for (let i = 0; i < n; i++) {
    let ly = 0
    for (let j = 0; j < i; j++) {
      ly += L[i][j] * y[j]
    }
    y[i] = b[p[i]] - ly
  }

  for (let i = n - 1; i >= 0; i--) {
    var ux = 0
    for (let j = i + 1; j < n; j++) {
      ux += U[i][j] * x[j]
    }
    x[i] = (y[i] - ux) / U[i][i]
  }
  return x
}

module.exports = inverse
