const range = require('../src/range')
const assert = require('assert'),
      dse = assert.deepStrictEqual


describe('range', function() {
  it('return a array', function() {
    dse(range(6), [0, 1, 2, 3, 4, 5])
  })
  it('return a empty array, if it accept a param that is 0 or neg', function() {
    dse(range(-6), [])
    dse(range(0), [])
  })
  it('two params', function() {
    dse(range(3, 9), [3, 4, 5, 6, 7, 8])
    dse(range(-3, 9), [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8])
  })
  it('three params', function() {
    dse(range(3, 9, 3), [3, 6])
    dse(range(9, -3, -2), [9, 7, 5, 3, 1, -1])
  })
})
