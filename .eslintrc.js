module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier", "react", "react-hooks", "node"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:node/recommended",
    "plugin:prettier/recommended", // enables prettier plugin + disables conflicting ESLint rules
  ],
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "prettier/prettier": "error",
    "node/no-unsupported-features/es-syntax": "off", // allow ESModules if needed
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
};
