const create = require('./create.js'),
      {preciseFloat} = require('./precise');

function multiply(matrix, another) {
  const createMultiply = create(
    (i, j) =>
      matrix.reduce((sum, r, k) =>
                    preciseFloat(sum + matrix[i][k] * another[k][j], 14)
                    , 0)
  );

  return createMultiply(matrix.length, another[0].length);
}

module.exports = multiply;
