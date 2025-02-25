module.exports = {
  env: {
    node: true,
    es6: true,
    es2022: true,
  },
  overrides: [],
  parserOptions: {
    ecmaVersion: "2021",
    sourceType: "module",
    module: "ES2021",
  },
  rules: {
    "import/prefer-default-export": "off",
    "import/extensions": "off",
  },
  extends: [
    "airbnb-base",
    "prettier",
    "eslint:recommended",
    "plugin:node/recommended",
    "jest",
  ],
};
