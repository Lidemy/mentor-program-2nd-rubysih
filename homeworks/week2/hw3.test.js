var isPrime = require('./hw3')

describe("hw3", function() {
  it("should return correct answer when n = 1", function() {
    expect(isPrime(1)).toBe(false);
  })
  it("should return correct answer when n = 3", function() {
    expect(isPrime(3)).toBe(true);
  })
  it("should return correct answer when n = 38", function() {
    expect(isPrime(38)).toBe(false);
  })
})