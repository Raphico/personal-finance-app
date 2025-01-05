import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  eslintConfigPrettier,
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: "off",
      "no-unused-vars": "warn",
    },
  },
  {
    ignores: ["dist/**"],
  },
];
