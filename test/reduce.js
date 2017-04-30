const reduce = require('../src/reduce');
const assert = require('assert');


describe('reduce', function() {
  it('return a reduced number', function() {
    let a = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
    assert.deepEqual(reduce(a, (sum, v) => sum + v), 36);
    assert.deepStrictEqual(a, [[0, 1, 2], [3, 4, 5], [6, 7, 8]]);
  });
  it('without init param, start to (0, 0)', function() {
    let a = [[9, 8, 3], [6, 1, 4], [7, 2, 5]];
    assert.deepEqual(reduce(a, (sum, v) => sum + v), 45);
    assert.deepEqual(reduce(a, (min, v) => Math.min(min, v)), 1);
  });
});
