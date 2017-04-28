function create(fn) {
  return function(rows=1, cols=rows) {
    var matrix = Array(rows);
    for (let i = 0; i < rows; i++) {
      matrix[i] = Array(cols);
      for (let j = 0; j < cols; j++) {
        matrix[i][j] = fn(i, j);
      }
    }
    return matrix;
  };
}

module.exports = create;
