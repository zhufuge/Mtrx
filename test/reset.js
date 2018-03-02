const reset = require('../src/reset')
const assert = require('assert')


describe('reset', function() {
  it('it will change param', function() {
    let a = [[2, 3, 4], [9, 9, 2]],
        b = [[1, 3], [2, 1], [2, 1]]
    assert.notDeepStrictEqual(a, b)
    reset(a, b)
    assert.deepStrictEqual(a, b)
  })
})
