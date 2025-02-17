import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import pluginVitest from "@vitest/eslint-plugin";
import pluginPlaywright from "eslint-plugin-playwright";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";
import pluginVueA11y from "eslint-plugin-vuejs-accessibility";
import pluginQuery from "@tanstack/eslint-plugin-query";

export default [
  {
    name: "app/files-to-lint",
    files: ["**/*.{js,mjs,jsx,vue}"],
  },

  {
    name: "app/files-to-ignore",
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"],
  },

  js.configs.recommended,

  ...pluginVue.configs["flat/essential"],

  ...pluginVueA11y.configs["flat/recommended"],

  ...pluginQuery.configs["flat/recommended"],

  {
    ...pluginVitest.configs.recommended,
    files: ["src/**/__tests__/*"],
  },

  {
    ...pluginPlaywright.configs["flat/recommended"],
    files: ["e2e/**/*.{test,spec}.{js,ts,jsx,tsx}"],
  },
  {
    rules: {
      eqeqeq: "off",
      "no-unused-vars": "warn",
    },
  },
  skipFormatting,
];
