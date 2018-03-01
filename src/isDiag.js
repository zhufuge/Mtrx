const isMtrxLike = require('./isMtrxLike')
const isSquare = require('./isSquare')
const { every } = require('./collection')

function isDiag(matrix) {
  return isMtrxLike(matrix) &&
    isSquare(matrix) &&
    every(matrix, (v, i, j) => i === j || v === 0)
}

module.exports = isDiag
