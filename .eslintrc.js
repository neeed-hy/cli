module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // 1. 接入 prettier 的规则
    'prettier',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  // 2. 加入 prettier 的 eslint 插件
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    // 3. 注意要加上这一句，开启 prettier 自动修复的功能
    'prettier/prettier': 'error',
    quotes: ['error', 'single'],
    // 依赖的一些第三方库还需要require
    '@typescript-eslint/no-var-requires': 'off'
  }
}