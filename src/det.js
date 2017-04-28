const isSquare = require('./isSquare'),
      isSingular = require('./isSingular'),
      isDiag = require('./isDiag'),
      LUP = require('./LUP'),
      {preciseFloat} = require('./precise');

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

const diagDet = (diag) =>  diag.reduce((det, r, i) => det * r[i], 1);
function det(matrix) {
  if (!isSquare(matrix)) return NaN;
  if (isSingular(matrix)) return 0;
  if (isDiag(matrix)) return preciseFloat(diagDet(matrix), 14);
  const {L, U, P} = LUP(matrix);
  return preciseFloat(diagDet(L) * diagDet(U), 14) * permutationDet(P);
};

module.exports = det;
