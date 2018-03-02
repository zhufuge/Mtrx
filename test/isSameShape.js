const isSameShape = require('../src/isSameShape')
const assert = require('assert')


describe('isSameShape', function() {
  it('return a bool', function() {
    let a = [[1, 2, 3], [2, 3, 4]]
    let b = [[3, 4, 1], [2, 3, 1]]
    assert.strictEqual(isSameShape(a, b), true)
  })
})
