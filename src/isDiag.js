const isMtrxLike = require('./isMtrxLike')
const isSquare = require('./isSquare')
const { every } = require('./iteration')

function isDiag(matrix) {
  return isMtrxLike(matrix) &&
    isSquare(matrix) &&
    every(matrix, (c, i, j) => i === j || c === 0)
}

module.exports = isDiag
