const some = require('../src/some');
const assert = require('assert');


describe('some', function() {
  it('receive a matrix and a fn, return a bool', function() {
    let a = [[1, 2, 3], [4, 5, 6]];
    assert.deepStrictEqual(some(a, (v) => v < 4), true);
    assert.deepStrictEqual(a, [[1, 2, 3], [4, 5, 6]]);
    assert.deepStrictEqual(some(a, (v) => v < 0), false);
  });

  it('@param fn(value, r-index, c-index) -> bool', function() {
    let a = [[0, 1, 2], [3, 4, 5]],
        fn = (v, r, c) => (r === c) ? false : (v % 2 === 0);
    assert.deepStrictEqual(some(a, fn), true);
  });
});
