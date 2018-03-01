function reduce(matrix, fn, init) {
  const rows = matrix.length,
        rowFn = (i) => (s, v, j) => fn(s, v, i, j)

  let sum = init != null ? init : matrix[0].reduce(rowFn(0))
  for (let i = init != null ? 0 : 1; i < rows; i++) {
    sum = matrix[i].reduce(rowFn(i), sum)
  }

  return sum
}

module.exports = reduce
