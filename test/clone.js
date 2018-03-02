const clone = require('../src/clone')
const assert = require('assert')


describe('clone', function() {
  it('receive a matrix and return a new equaltions matrix', function() {
    let matrix = [[1, 2, 3], [4, 5, 6]]
    let c = clone(matrix)
    assert.deepStrictEqual(c, matrix)
  })

  it('return a new matrix that is deep copy', function() {
    let matrix = [[1, 2, 3], [4, 5, 6]]
    let c = clone(matrix)
    c[0][0] = 0
    assert.notDeepStrictEqual(c, matrix)
  })
})
