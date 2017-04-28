function map(matrix, fn) {
  return matrix.map((r, rIndex) =>
                    r.map((c, cIndex) =>
                          fn(c, rIndex, cIndex)));
}

module.exports = map;
