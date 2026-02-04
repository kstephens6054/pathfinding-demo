// @vitest-environment node
import { describe, it, expect } from "vitest";
import { camelToKebabCase, kebabToCamelCase } from "./utilities";

describe("Utility Functions", () => {
  it("should convert camelCase to kebab-case", () => {
    const camelCaseString = "backgroundColor";
    const expectedKebabCaseString = "background-color";
    const result = camelToKebabCase(camelCaseString);
    expect(result).toBe(expectedKebabCaseString);
  });

  it("should convert kebab-case to camelCase", () => {
    const kebabCaseString = "grid-color";
    const expectedCamelCaseString = "gridColor";
    const result = kebabToCamelCase(kebabCaseString);
    expect(result).toBe(expectedCamelCaseString);
  });

  it("should handle empty strings", () => {
    expect(camelToKebabCase("")).toBe("");
    expect(kebabToCamelCase("")).toBe("");
  });

  it("should handle strings without case changes", () => {
    expect(camelToKebabCase("simple")).toBe("simple");
    expect(kebabToCamelCase("simple")).toBe("simple");
  });
});
