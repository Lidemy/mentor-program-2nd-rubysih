var add = require('./hw5')

describe("hw5", function() {
  it("should return correct answer when a=111111111111111111111111111111111111 and b=111111111111111111111111111111111111", function() {
    expect(add('111111111111111111111111111111111111', '111111111111111111111111111111111111')).toBe('222222222222222222222222222222222222')
  })
  it("should return correct answer when a=123 and b=456", function() {
    expect(add('123', '456')).toBe('579')
  })
  it("should return correct answer when a=9 and b=9", function() {
    expect(add('9', '9')).toBe('18')
  })
  it("should return correct answer when a=999 and b=1", function() {
    expect(add('999', '1')).toBe('1000')
  })
  it("should return correct answer when a=23 and b=785", function() {
    expect(add('23', '785')).toBe('808')
  })
  it("should return correct answer when a=1121241294239120391031 and b=35906838359835", function() {
    expect(add('1121241294239120391031', '35906838359835')).toBe('1121241330145958750866')
  })
    it("should return correct answer when a=1121241294239323958638463973723578257823524912313385938529423492342049204120391031 and b=35906833258583928923283928392324892111118359835", function() {
    expect(add('1121241294239323958638463973723578257823524912313385938529423492342049204120391031', '35906833258583928923283928392324892111118359835')).toBe('1121241294239323958638463973723578293730358170897314861813351884666941315238750866')
  })
  
})
