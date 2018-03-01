function create(fn) {
  return function(rows=1, cols=rows) {
    const matrix = Array(rows)
    for (let i = 0; i < rows; i++) {
      matrix[i] = Array(cols)
      for (let j = 0; j < cols; j++) {
        matrix[i][j] = fn(i, j)
      }
    }
    return matrix
  }
}

// const fill = (r, c=r, n=0) => create(() => n)(r, c)
// const diag = (array) => create((i, j) => (i === j ? array[i] : 0))(array.length)

// create.fill = fill
// create.diag = diag
// create.zeros = (r, c=r) => fill(r, c, 0)

module.exports = create
