const isSquare = require('./isSquare'),
      transpose = require('./transpose'),
      rowEchelon = require('./rowEchelon');

const isZeros = (array) => array.every((n) => n === 0);
const hasZeroRow = (matrix) =>  matrix.some((row) => isZeros(row));

function isSingular(matrix) {
  return  !isSquare(matrix) ||
    hasZeroRow(matrix) ||
    hasZeroRow(transpose(matrix)) ||
    rowEchelon(matrix).length !== matrix.length;
}

module.exports = isSingular;
