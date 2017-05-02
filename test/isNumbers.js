const isNumbers = require('../src/isNumbers');
const assert = require('assert');


describe('isNumbers', function() {
  it('return a bool', function() {
    let a = [1, 3, 4, 5];
    assert.strictEqual(isNumbers(a), true);

    let b = [undefined, 0];
    assert.strictEqual(isNumbers(b), false);

    let c = [null, 0, 0];
    assert.strictEqual(isNumbers(c), false);
  });
  
  it('Array has space position', function() {
    let d = [, , 0, 1];
    assert.strictEqual(isNumbers(d), false);
  });
});
