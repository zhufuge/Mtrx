const compan = require('../src/compan')
const assert = require('assert')
const dse = assert.deepStrictEqual

describe('compan', function() {
  it('return the compan of the matrix', function() {
    let a = [[1, 2, 1], [2, 1, 4], [8, 7, 6]]
    dse(compan(a), [[-22, -5, 6.999999999999999], [20, -2, -2], [6, 9, -3]])
  })
  it('for singular matrix', function() {
    let a = [[1, 1, 2], [3, 3, 6], [8, 9, 6]]
    dse(compan(a), [[-36,-30, 3], [-12.000000000000002, -10, 1], [0, 0, 0]])
  })
})
