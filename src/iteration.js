function reduce(matrix, fn, init) {
  const rows = matrix.length,
        rowFn = (i) => (s, v, j) => fn(s, v, i, j)

  let sum = init != null ? init : matrix[0].reduce(rowFn(0))
  for (let i = init != null ? 0 : 1; i < rows; i++) {
    sum = matrix[i].reduce(rowFn(i), sum)
  }

  return sum
}

function every(matrix, fn) {
  return matrix.every(
    (r, rIndex) => r.every(
      (c, cIndex) => fn(c, rIndex, cIndex)))
}

function some(matrix, fn) {
  return matrix.some(
    (r, rIndex) => r.some(
      (c, cIndex) => fn(c, rIndex, cIndex)))
}

function map(matrix, fn) {
  return matrix.map(
    (r, rIndex) => r.map(
      (c, cIndex) => fn(c, rIndex, cIndex)))
}

module.exports = {
  reduce,
  every,
  some,
  map,
}
