const { map } = require('./collection')
const create = require('./create')
const clone = require('./clone')
const cof = require('./cof')
const det = require('./det')
const inverse = require('./inverse')
const isSquare = require('./isSquare')
const isSingular = require('./isSingular')

function compan(matrix) {
  if (!isSquare(matrix)) throw Error(matrix + ' is not a Square matrix.')
  if (!isSingular(matrix)) {
    const d = det(matrix)
    return map(inverse(matrix), n => n * d)
  } else {
    const n = matrix.length
    return n > 1
      ? create((i, j) => det(cof(matrix, i, j)))(n)
      : clone(matrix)
  }
}

module.exports = compan
