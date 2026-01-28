import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import storybook from "eslint-plugin-storybook";
import react from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import prettier from "eslint-config-prettier";
import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig } from "eslint/config";

export default defineConfig(
  { ignores: ["dist", "storybook-static", "node_modules", ".storybook"] },
  // 1. Base JS/TS rules
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      // For strict rules:
      // ...tseslint.configs.strict,
    ],
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.app.json", "./tsconfig.node.json"], // Mandatory for some rules
        tsconfigRootDir: import.meta.dirname,
      },
    },
    // 2. Plugin definitions
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react: react,
      "jsx-a11y": jsxA11y,
      "simple-import-sort": simpleImportSort,
      perfectionist,
    },
    // 3. Setting for React plugin to atuomatically detect version
    settings: {
      react: {
        version: "detect",
      },
    },
    // 4. Standalone rules
    rules: {
      // -- Standard rules from plugins (spread into the Flat Config) --
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...jsxA11y.configs.recommended.rules,
      // -- My changes --
      // React Refresh (for Vite)
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // TypeScript - ignoring unused properties starting with underscore
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^",
          varsIgnorePattern: "^",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      // Disables Prop-types (not necessary in TS)
      "react/prop-types": "off",
      // Sorts the imports and exports
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      // Sorts the Objects and Types
      "perfectionist/sort-objects": [
        "error",
        {
          type: "natural",
          order: "asc",
        },
      ],
      "perfectionist/sort-interfaces": ["error"],
      "perfectionist/sort-jsx-props": ["error"],
    },
  },
  // 5. Storybook configuration (must be spread )
  ...storybook.configs["flat/recommended"],
  // 6. Prettier (MUST be the last, to disable collision rules)
  prettier,
);
