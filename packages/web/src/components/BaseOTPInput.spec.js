import { shallowMount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import BaseOTPInput from "./BaseOTPInput.vue";

describe("BaseOTPInput Component", () => {
  it("should handle numeric input and focus the next input", async () => {
    const wrapper = shallowMount(BaseOTPInput, {
      props: {
        size: 4,
      },
      attachTo: document.body,
    });

    const firstInput = wrapper.get("[data-test='input-1']");
    await firstInput.trigger("keyup", { key: "1" });

    expect(wrapper.vm.otpValues[0]).toBe("1");
    expect(
      wrapper.get("[data-test='input-2'").element === document.activeElement
    ).toBe(true);
  });

  it("should delete the previous value when backspace is clicked", async () => {
    const wrapper = shallowMount(BaseOTPInput, {
      props: {
        size: 4,
      },
      attachTo: document.body,
    });

    const firstInput = wrapper.get("[data-test='input-1']");
    await firstInput.trigger("keyup", { key: "1" });

    await wrapper
      .get("[data-test='input-2']")
      .trigger("keyup", { key: "Backspace" });

    expect(wrapper.vm.otpValues[0]).toBeNull();
    expect(firstInput.element === document.activeElement).toBe(true);
  });

  it("should trigger complete event when all inputs are filled", async () => {
    const wrapper = shallowMount(BaseOTPInput, {
      props: {
        size: 4,
      },
    });

    await wrapper.get("[data-test='input-1'").trigger("keyup", { key: "1" });
    await wrapper.get("[data-test='input-2'").trigger("keyup", { key: "2" });
    await wrapper.get("[data-test='input-3'").trigger("keyup", { key: "3" });
    await wrapper.get("[data-test='input-4'").trigger("keyup", { key: "4" });

    expect(wrapper.emitted().complete).toBeTruthy();
    expect(wrapper.emitted().complete[0][0]).toBe("1234");
  });
});
