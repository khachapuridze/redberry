import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import Calculator from "../Calculator.vue";

describe("Calculator", () => {
  it("renders properly", () => {
    const wrapper = mount(Calculator);
    expect(wrapper.contains("div")).toBe(true);
  });
});
