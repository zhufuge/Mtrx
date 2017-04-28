function reduce(matrix, fn, init=matrix[0][0]) {
  return matrix.reduce((r_sum, r, rIndex) =>
                       r.reduce((c_sum, c, cIndex) =>
                                fn(c_sum, c, rIndex, cIndex), r_sum), init);
}

module.exports = reduce;
