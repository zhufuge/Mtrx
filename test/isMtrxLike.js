const isMtrxLike = require('../src/isMtrxLike')
const assert = require('assert')


describe('isMtrxLike', function() {
  it('return a bool', function() {
    let a = [[1, 2, 3], [2, 3, 5]]
    assert.strictEqual(isMtrxLike(a), true)

    let b = [[1, 2, 4], [3, 2]]
    assert.strictEqual(isMtrxLike(b), false)

    let c = [[undefined, 1, 3], [2, 3, 4]]
    assert.strictEqual(isMtrxLike(c), false)

    let d = [['a', 2, 3], [3, 2, 4]]
    assert.strictEqual(isMtrxLike(d), false)
  })
})
