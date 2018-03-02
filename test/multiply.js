const multiply = require('../src/multiply')
const assert = require('assert'),
      dse = assert.deepStrictEqual


describe('multiply', function() {
  it('return a new matrix', function() {
    let a = [[8, 3, 1], [2, 1, 9], [2, 3, 0]]
    dse(multiply(a, a), [[72, 30, 35], [36, 34, 11], [22, 9, 29]])

  })
  it('n*n multiply n*1', function() {
    let a = [[8, 3, 1], [2, 1, 9], [2, 3, 0]]
    let b = [[1], [2], [3]]
    dse(multiply(a, b), [[17], [31], [8]])
  })
})
