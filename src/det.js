const isSquare = require('./isSquare'),
      isSingular = require('./isSingular'),
      isDiag = require('./isDiag'),
      LUP = require('./lup')

function permutationDet(matrix) {
  const n = matrix.length
  let det = 1
  for (let i = 0; i < n - 1; i++) {
    for (var j = 0; matrix[j][i] !== 1; j++) ;
    det *= (j % 2 === 0) ? 1 : -1
    matrix.splice(j, 1)
  }
  return det
}

const diagDet = (diag) =>  diag.reduce((det, r, i) => det * r[i], 1)
function det(matrix) {
  if (!isSquare(matrix)) return NaN
  if (isSingular(matrix)) return 0
  if (isDiag(matrix)) return diagDet(matrix)
  const { L, U, P } = LUP(matrix)
  return diagDet(L) * diagDet(U) * permutationDet(P)
}

module.exports = det
