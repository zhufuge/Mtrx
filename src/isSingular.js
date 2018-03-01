const isSquare = require('./isSquare')
const transpose = require('./transpose')
const rank = require('./rank')

const isZeros = (array) => array.every(n => n === 0)
const hasZeroRow = (matrix) =>  matrix.some(row => isZeros(row))

function isSingular(matrix) {
  return  !isSquare(matrix) ||
    hasZeroRow(matrix) ||
    hasZeroRow(transpose(matrix)) ||
    rank(matrix) !== matrix.length
}

module.exports = isSingular
