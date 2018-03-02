const isSingular = require('../src/isSingular')
const assert = require('assert')


describe('isSingular', function() {
  it('return a bool', function() {
    let a = [[1, 2, 3], [3, 1, 4], [1, 3, 4]]
    assert.strictEqual(isSingular(a), true)

    let b = [[1, 2, 3], [0, 0, 0], [1, 3, 4]]
    assert.strictEqual(isSingular(b), true)

    let c = [[2, 0, 3], [4, 0, 6], [1, 3, 4]]
    assert.strictEqual(isSingular(c), true)

    let d = [[2, 3, 4], [1, 2, 1], [8, 7, 2]]
    assert.strictEqual(isSingular(d), false)
  })
})
