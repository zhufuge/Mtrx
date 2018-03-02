const cof = require('../src/cof'),
      assert = require('assert'),
      Mtrx = require('..')

const dse = assert.deepStrictEqual

describe('cof', function() {
  it('return a new matrix without i row and j col', function() {
    let a = [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
    dse(cof(a, 1, 1), [[1, 3], [3, 5]])
    dse(a, [[1, 2, 3], [2, 3, 4], [3, 4, 5]])
    dse(cof(a, 0, 0), [[3, 4], [4, 5]])
  })

  it('it\'ll return a new same matrix, if i and j out of range', function() {
    let a = [[1, 2], [3, 4]]
    dse(cof(a, 2, 2), [[1, 2], [3, 4]])
    dse(a, [[1, 2], [3, 4]])
    dse(cof(a, -2, -5), [[1, 2], [3, 4]])
  })

  it('return a new Mtrx, if matrix is Mtrx object', function() {
    let a = [[2, 3, 4], [4, 5, 6], [8, 0, 9]],
        m = new Mtrx(a),
        n = new Mtrx([[2, 4], [8, 9]])
    dse(cof(m, 1, 1), n)
  })
})
