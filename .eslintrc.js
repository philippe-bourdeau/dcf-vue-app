module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: "@typescript-eslint/parser"
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'camelcase': 'off',
    "@typescript-eslint/camelcase": ["off"],
    "@typescript-eslint/interface-name-prefix": ["off"]
  }
}
