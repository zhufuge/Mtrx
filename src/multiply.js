const create = require('./create.js')

function multiply(matrix, another) {
  if (matrix[0].length !== another.length) {
    throw TypeError(matrix + ' can\'t right multiply ' + another)
  }
  const createMultiply = create(
    (i, j) => matrix.reduce((sum, r, k) => sum + matrix[i][k] * another[k][j], 0)
  )

  return createMultiply(matrix.length, another[0].length)
}

module.exports = multiply
