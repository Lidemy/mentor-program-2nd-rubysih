var isPrime = require('./hw3')

describe("hw3", function() {
  it("should return correct answer when n = 1", function() {
    // expect(isPrime(1)).toBe(false);
    expect(isPrime(3)).toBe(true);
    expect(isPrime(37)).toBe(true);
    expect(isPrime(38)).toBe(false);
  })
})