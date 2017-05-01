function reduce(matrix, fn, init) {
  const hasInit = (init === void 0) ? false : true,
        rows = matrix.length,
        rowFn = (i) => (s, v, j) => fn(s, v, i, j);

  let sum = hasInit ? init : matrix[0].reduce(rowFn(0));
  for (let i = hasInit ? 0 : 1;i < rows; i++) {
    sum = matrix[i].reduce(rowFn(i), sum);
  }

  return sum;
}

module.exports = reduce;
