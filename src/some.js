function some(matrix, fn) {
  return matrix.some((r, rIndex) =>
                     r.some((c, cIndex) =>
                            fn(c, rIndex, cIndex)));
}

module.exports = some;
