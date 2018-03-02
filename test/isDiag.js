const isDiag = require('../src/isDiag')
const assert = require('assert')


describe('isDiag', function() {
  it('return a bool', function() {
    let a = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
    assert.strictEqual(isDiag(a), true)

    let b = [[0, 1, 3], [0.1, 0, 8], [4, 2, 0]]
    assert.strictEqual(isDiag(b), false)
  })
})
