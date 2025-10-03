import { roll, simulate, expectedValue } from "../src";

describe("roll()", () => {
  it("should roll a single d20", () => {
    const result = roll("1d20");
    expect(result.rolls.length).toBe(1);
    expect(result.total).toBeGreaterThanOrEqual(1);
    expect(result.total).toBeLessThanOrEqual(20);
  });

  it("should handle modifiers", () => {
    const result = roll("1d6+3");
    expect(result.total).toBeGreaterThanOrEqual(4);
    expect(result.total).toBeLessThanOrEqual(9);
  });

  it("should drop lowest die", () => {
    const result = roll("4d6dl1");
    expect(result.rolls.length).toBe(4);
    expect(result.kept.length).toBe(3);
  });

  it("should apply advantage (kh1)", () => {
    const result = roll("2d20kh1");
    expect(result.kept.length).toBe(1);
  });

  it("should apply disadvantage (kl1)", () => {
    const result = roll("2d20kl1");
    expect(result.kept.length).toBe(1);
  });

  it("should handle exploding dice", () => {
    const result = roll("1d6!");
    expect(result.rolls.length).toBeGreaterThanOrEqual(1);
  });
});

describe("simulate()", () => {
  it("should return probability distribution", () => {
    const dist = simulate("1d6", 1000);
    const keys = Object.keys(dist).map(Number);
    expect(keys).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6]));
  });
});

describe("expectedValue()", () => {
  it("should approximate expected value of 1d6", () => {
    const avg = expectedValue("1d6", 5000);
    // Expected ~3.5
    expect(avg).toBeGreaterThan(3);
    expect(avg).toBeLessThan(4);
  });
});
