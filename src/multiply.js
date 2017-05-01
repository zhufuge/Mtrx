const create = require('./create.js');

function multiply(matrix, another) {
  const createMultiply = create(
    (i, j) => matrix.reduce((sum, r, k) => sum + matrix[i][k] * another[k][j], 0)
  );

  return createMultiply(matrix.length, another[0].length);
}

module.exports = multiply;
