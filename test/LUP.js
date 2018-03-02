const LUP = require('../src/LUP')
const assert = require('assert')


describe('LUP', function() {
  it('return a object that include 3 matrix', function() {
    let a = [[1, 2, 0], [3, 4, 4], [5, 6, 3]]
    let _lup = {
      L: [[1, 0, 0], [0.2, 1, 0], [0.6, 0.5000000000000006, 1]],
      U: [[5, 6, 3],
          [0, 0.7999999999999998, -0.6000000000000001],
          [0, 0, 2.5000000000000004]],
      P: [[0, 0, 1], [1, 0, 0], [0, 1, 0]]
    }
    let lup = LUP(a)
    assert.deepStrictEqual(lup, _lup)
    assert.deepStrictEqual(lup.L, _lup.L)
  })
})
