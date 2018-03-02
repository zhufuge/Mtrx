const inverse = require('../src/inverse'),
      multiply = require('../src/multiply'),
      assert = require('assert'),
      dse = assert.deepStrictEqual


describe('inverse', function() {
  it('return a new matrix', function() {
    let a = [[3, 1, 4], [2, 4, 5], [8, 0, 1]],
        e = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
    dse(inverse(a), [
      [-0.05128205128205128,  0.01282051282051282,  0.14102564102564102],
      [-0.48717948717948717,  0.3717948717948718 ,  0.08974358974358973],
      [ 0.41025641025641024, -0.10256410256410256, -0.1282051282051282 ]
    ])
    dse(multiply(a, inverse(a)), e)
  })
})
