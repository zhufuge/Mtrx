const det = require('../src/det')
const assert = require('assert')


describe('det', function() {
  it('return a number that is matrix\'s det', function() {
    let a = [[2, 2, 4], [6, 6, 18], [15, 12, 48]]
    assert.strictEqual(det(a), 35.999999999999964)
  })

  it('return NaN, if accept a not-Square matrix', function() {
    let a = [[2, 2, 4], [15, 12, 48]]
    assert.strictEqual(Number.isNaN(det(a)), true)
  })

  it('return 0, if the matrix is singular', function() {
    let a = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    assert.strictEqual(det(a), 0)
  })

  it('fast calculate diag\'s det', function() {
    let a = [
      [2,  0,   0,   0],
      [0, -4,   0,   0],
      [0,  0, 0.3,   0],
      [0,  0,   0, 1.2]
    ]
    assert.strictEqual(det(a), -2.88)
  })
})
