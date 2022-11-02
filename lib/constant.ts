/**
 * 初始化相关功能时，要进行安装的包列表
 */
export const packageList = {
  esLint: ['eslint'],
  prettier: ['prettier', 'eslint-config-prettier', 'eslint-plugin-prettier'],
  husky: ['husky', 'lint-staged'],
  stylelint: [
    'stylelint',
    'stylelint-prettier',
    'stylelint-config-prettier',
    'stylelint-config-recess-order',
    'stylelint-config-standard',
    'stylelint-config-standard-scss'
  ]
}
