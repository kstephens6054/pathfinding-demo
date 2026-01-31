import { describe, it, expect } from "vitest";

describe("Sample Test", () => {
  it("should pass this sample test", () => {
    expect(true).toBeTruthy();
  });
  it.fails("should fail this sample test", () => {
    expect(false).toBeTruthy();
  });
});
