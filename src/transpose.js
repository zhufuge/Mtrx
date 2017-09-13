const create = require('./create')

function transpose(matrix) {
  return create((i, j) => matrix[j][i])(matrix[0].length, matrix.length)
}

module.exports = transpose
