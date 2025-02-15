import { shallowMount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import BaseButton from "./BaseButton.vue";

describe("BaseButton Component", () => {
  it("should render the correct default variant", () => {
    const wrapper = shallowMount(BaseButton);
    expect(wrapper.classes()).toContain("primary-button");
  });

  it("should apply the correct class based on variant prop", async () => {
    const wrapper = shallowMount(BaseButton, {
      props: {
        variant: "secondary",
      },
    });
    expect(wrapper.classes()).toContain("secondary-button");
    expect(wrapper.classes()).toContain("text-preset-4-bold");

    await wrapper.setProps({ variant: "primary" });
    expect(wrapper.classes()).toContain("primary-button");
    expect(wrapper.classes()).toContain("text-preset-4-bold");

    await wrapper.setProps({ variant: "tertiary" });
    expect(wrapper.classes()).toContain("tertiary-button");
    expect(wrapper.classes()).toContain("text-preset-4-regular");

    await wrapper.setProps({ variant: "destroy" });
    expect(wrapper.classes()).toContain("destroy-button");
    expect(wrapper.classes()).toContain("text-preset-4-bold");
  });

  it("should throw a warn if an invalid variant is passed", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    shallowMount(BaseButton, {
      props: {
        variant: "invalid",
      },
    });

    expect(consoleSpy).toHaveBeenCalled();
  });
});
