module.exports = {
  // Remove or comment out the babel-eslint parser line
  // parser: "babel-eslint",
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        'endOfLine': 'auto',
        'htmlWhitespaceSensitivity': 'ignore',
      }
    ]
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    requireConfigFile: false
  },
  plugins: ["react"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
};