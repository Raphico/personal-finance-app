import { describe, it, expect } from "vitest";
import { serializeParams } from "./helpers";

describe("helpers tests", () => {
  describe("serializeParams", () => {
    it("skips empty or undefine values", () => {
      let params = { email: "", redirect: "overview" };
      expect(serializeParams(params)).toBe("redirect=overview");

      params = {};
      expect(serializeParams(params)).toBe("");
    });

    it("serialize params correctly", () => {
      let params = { email: "test@gmail.com", redirect: "overview" };
      expect(serializeParams(params)).toBe(
        "email=test%40gmail.com&redirect=overview"
      );
    });
  });
});
