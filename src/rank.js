const clone = require('./clone'),
      { EPSILON } = Number,
      { abs } = Math

const sortRow = (c) => (a, b) => {
  if (a[c] === 0) return 1
  if (b[c] === 0) return -1
  return abs(a[c]) - abs(b[c])
}

function rank(matrix) {
  let A = clone(matrix),
      _rank = 0,
      cols = A[0].length
  for (let c = 0; c < cols && A.length > 0; c++) {
    A.sort(sortRow(c))

    var topR = A[0],
        topRC = topR[c]
    if (topRC !== 0) {
      for (let i = 1, row = A.length; i < row; i++) {
        var iRow = A[i],
            iRowC = iRow[c]
        if (iRowC !== 0) {
          for (let j = c; j < cols; j++) {
            var ij = (iRow[j] / iRowC) - (topR[j] / topRC)
            iRow[j] = (abs(ij) <= EPSILON) ? 0 : ij
          }
        }
      }
      A.shift()
      _rank++
    }
  }

  return _rank
}

module.exports = rank
// TODO: optimize
