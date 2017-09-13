const create = require('./create'),
      clone = require('./clone'),
      multiply = require('./multiply'),
      range = require('./range'),
      isSquare = require('./isSquare')

function permutationArray(matrix) {
  let A = clone(matrix),
      n = A.length,
      order = range(n)
  const swapOf = (i, j, array) => [array[i], array[j]] = [array[j], array[i]],
        abs = Math.abs
  for (let k = 0; k < n; k++) {
    let max = 0, maxIndex = 0
    for (let i = k; i < n; i++) {
      let A_ik = abs(A[i][k])
      if (A_ik > max) {
        max = A_ik
        maxIndex = i
      }
    }

    if (max === 0) throw Error(matrix + 'is a Singular matrix')

    swapOf(k, maxIndex, order)
    swapOf(k, maxIndex, A)

    for (let i = k + 1; i < n; i++) {
      A[i][k] = A[i][k] / A[k][k]
      for (let j = k + 1; j < n; j++) {
        A[i][j] = A[i][j] - A[i][k] * A[k][j]
      }
    }
  }
  return order
}

const order2permutation = (o) =>
      create((i, j) => (j === o[i]) ? 1 : 0)(o.length)

function LUP(matrix) {
  if (!isSquare(matrix)) throw Error(matrix + ' is not a Square matrix')
  const n = matrix.length,
        P = order2permutation(permutationArray(matrix))

  let A = multiply(P, matrix),
      U = create(() => 0)(n),
      L = create((i, j) => (i === j) ? 1 : 0)(n)
  for (let k = 0; k < n; k++) {
    U[k][k] = A[k][k]

    for (let i = k + 1; i < n; i++) {
      L[i][k] = A[i][k] / U[k][k]
      U[k][i] = A[k][i]
    }

    for (let i = k + 1; i < n; i++) {
      for (let j = k + 1; j < n; j++) {
        A[i][j] = A[i][j] - L[i][k] * U[k][j]
      }
    }
  }

  return { L, U, P }
}

module.exports = LUP
