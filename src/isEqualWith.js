const isSameShape = require('./isSameShape')

function isEqualWith(matrix, another, customizer) {
  if (!isSameShape(matrix, another)) {
    throw TypeError(matrix + ' \'s shape is no like ' + another)
  }
  return customizer(matrix, (n, i, j) => n === another[i][j])
}

module.exports = isEqualWith
