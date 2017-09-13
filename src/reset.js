function reset(matrix, matrixLike) {
  const rows = matrix.length
  for (let i = rows; i > 0; i--) {
    matrix.pop()
  }

  const newRows = matrixLike.length
  for (let i = 0; i < newRows; i++) {
    matrix.push(matrixLike[i])
  }
}

module.exports = reset
