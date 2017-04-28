function preciseFloat(n, f=20) {
  return Number.parseFloat(n.toFixed(f));
}

function preciseSub(a, b) {
  return (Math.abs(a - b) < Number.EPSILON) ? 0 : preciseFloat(a - b, 15);
}

module.exports = {
  preciseFloat,
  preciseSub
};
