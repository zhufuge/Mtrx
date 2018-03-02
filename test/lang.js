const { isNumberArray } = require('../src/lang')
const assert = require('assert')


describe('isNumberArray', function() {
  it('return a bool', function() {
    let a = [1, 3, 4, 5]
    assert.strictEqual(isNumberArray(a), true)

    let b = [undefined, 0]
    assert.strictEqual(isNumberArray(b), false)

    let c = [null, 0, 0]
    assert.strictEqual(isNumberArray(c), false)
  })

  it('Array has space position', function() {
    let d = [, , 0, 1]
    assert.strictEqual(isNumberArray(d), false)
  })
})
