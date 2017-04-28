function every(matrix, fn) {
  return matrix.every((r, rIndex) =>
                      r.every((c, cIndex) =>
                              fn(c, rIndex, cIndex)));
}

module.exports = every;
