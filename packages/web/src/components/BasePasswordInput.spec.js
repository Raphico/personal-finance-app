import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import BasePasswordInput from "./BasePasswordInput.vue";
import IconShowPassword from "./Icons/IconShowPassword.vue";
import IconHidePassword from "./Icons/IconHidePassword.vue";

describe("BasePasswordInput", () => {
  it("renders with default password visibility", () => {
    const wrapper = mount(BasePasswordInput);

    expect(wrapper.get("[data-test='password-input']").attributes("type")).toBe(
      "password"
    );
    expect(wrapper.findComponent(IconShowPassword).exists()).toBe(true);
    expect(
      wrapper
        .get("[data-test='password-visibility-toggle']")
        .attributes("aria-label")
    ).toMatch(/show/i);
  });

  it("toggles password visibility on button click", async () => {
    const wrapper = mount(BasePasswordInput);

    await wrapper
      .get("[data-test='password-visibility-toggle']")
      .trigger("click");

    expect(wrapper.get("[data-test='password-input']").attributes("type")).toBe(
      "text"
    );
    expect(wrapper.findComponent(IconHidePassword).exists()).toBe(true);
    expect(
      wrapper
        .get("[data-test='password-visibility-toggle']")
        .attributes("aria-label")
    ).toMatch(/hide/i);
  });
});
