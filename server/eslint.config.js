import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  eslintConfigPrettier,
  { languageOptions: { globals: globals.node }, ignores: ["**/coverage/**"] },
  pluginJs.configs.recommended,
  {
    rules: {
      eqeqeq: "off",
      "no-unused-vars": "warn",
    },
  },
];
