function gcd(a, b) {
  const isInteger = Number.isInteger,
        abs = Math.abs;
  if (isInteger(a) && isInteger(b)) {
    [a, b] = [abs(a), abs(b)];
    while (b > 0) {
      [a, b] = [b, a % b];
    }
    return a;
  } else {
    return 1;
  }
};

module.exports = gcd;
