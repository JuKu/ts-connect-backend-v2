module.exports = {
  // added
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    ecmaVersion: "latest",
    sourceType: 'module',
  },
  /*plugins: [
      '@typescript-eslint/eslint-plugin'
  ],*/
  "plugins": [
    "@typescript-eslint",
    "security",
    "security-node"
  ],
  /*extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],*/
  "extends": [
    "google",
    "plugin:security/recommended",
    "plugin:security-node/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
