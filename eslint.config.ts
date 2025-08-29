import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";

import prettierConfig from "eslint-config-prettier";

import typescriptParser from "@typescript-eslint/parser";

export default [
  {
    languageOptions: {
      globals: {
        browser: true,
        es2021: true,
        node: true,
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@typescript-eslint": typescriptPlugin,
      "jsx-a11y": jsxA11yPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...typescriptPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,

      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/explicit-module_boundary_types": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
        },
      ],
      "import/no-unresolved": "off",
      "import/named": "off",
      "import/namespace": "off",
      "import/default": "off",
      "import/no-named-as-default-member": "off",
      "import/no-named-as-default": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  },
  prettierConfig,
];
