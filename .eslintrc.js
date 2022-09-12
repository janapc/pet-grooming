module.exports = {
  env: {
    es2022: true,
    node: true
  },
  plugins: ['prettier'],
  extends: ['standard-with-typescript', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  rules: {
    'prettier/prettier': 2,
    'no-useless-escape': 0,
    '@typescript-eslint/no-extraneous-class': 0,
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false
      }
    ]
  }
};
