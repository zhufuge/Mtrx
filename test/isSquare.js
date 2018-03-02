const isSquare = require('../src/isSquare')
const assert = require('assert')


describe('isSquare', function() {
  it('return a bool', function() {
    let a = [[1, 2, 3], [2, 3, 3], [3, 5, 4]]
    assert.strictEqual(isSquare(a), true)

    let b = [[0]]
    assert.strictEqual(isSquare(b), true)

    let c = [[1, 2, 3], [9, 0, 2]]
    assert.strictEqual(isSquare(c), false)
  })
})
