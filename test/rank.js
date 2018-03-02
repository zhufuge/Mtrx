const rank = require('../src/rank')
const assert = require('assert')


describe('rank', function() {
  it('return a number', function() {
    let a = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    assert.equal(rank(a), 2)

    let b = [[1, 2, 3, 4], [2, 9, 8, 2], [1, 0, 8, 8]]
    assert.equal(rank(b), 3)

    let c = [[0, 0, 0], [0, 0, 0]]
    assert.equal(rank(c), 0)

    let d = [[0]]
    assert.equal(rank(d), 0)
  })
})
