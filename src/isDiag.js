const isMtrxLike = require('./isMtrxLike'),
      isSquare = require('./isSquare'),
      every = require('./every');

function isDiag(matrix) {
  return isMtrxLike(matrix) &&
    isSquare(matrix) &&
    every(matrix, (c, i, j) =>
          (i === j)
          ? true
          : (c === 0));
}

module.exports = isDiag;
