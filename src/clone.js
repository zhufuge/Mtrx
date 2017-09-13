const create = require('./create')

function clone(matrix) {
  return create((i, j) => matrix[i][j])(matrix.length, matrix[0].length)
}

module.exports = clone
