const transpose = require('../src/transpose'),
      assert = require('assert')


describe('transpose', function() {
  it('return a new matrix that is param-matrix\'transpose', function() {
    let a = [[1, 2, 3], [4, 5, 6]]
    assert.deepStrictEqual(transpose(a), [[1, 4], [2, 5], [3, 6]])
    assert.deepStrictEqual(a, [[1, 2, 3], [4, 5, 6]])
  })
})
