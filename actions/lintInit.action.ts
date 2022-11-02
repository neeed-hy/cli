import * as inquirer from 'inquirer'
import type { Question } from 'inquirer'
import { generateSingleSelect } from '../lib/question'
import * as chalk from 'chalk'
import { outputFileSync, writeJSONSync } from 'fs-extra'

import {
  packageCommand,
  PackageManager,
  packageManagers
} from '../lib/packageManager'
import { checkIsGit, readJsonFile, readPackageJson } from '../lib/file'
import { confFileTemplate } from '../lib/template'

enum ELintTools {
  eslint = 'eslint',
  prettier = 'prettier',
  husky = 'husky'
}

const lintTools = [ELintTools.eslint, ELintTools.prettier, ELintTools.husky]

interface IAnswer {
  type: ELintTools
  packageManager: PackageManager
}

export async function lintInit() {
  readPackageJson()
  const prompt = inquirer.createPromptModule()
  const questions: Question[] = [
    generateSingleSelect('type', '请选择你要初始化的工具', lintTools),
    generateSingleSelect('packageManager', '请选择包管理器', packageManagers)
  ]
  const answer = await prompt<IAnswer>(questions)
  const { type, packageManager } = answer
  try {
    switch (type) {
      case ELintTools.eslint:
        installEslint(packageManager)
        break
      case ELintTools.prettier:
        installPrettier(packageManager)
        break
      case ELintTools.husky:
        addHusky(packageManager)
        break
      default:
        throw new Error('工具选择错误')
    }
  } catch (error) {
    console.error(error)
  }
}

/**
 * 安装eslint
 * @param thePackage 包管理器
 */
function installEslint(thePackage: PackageManager) {
  const command = packageCommand(thePackage)
  command.addDev('eslint')
  outputFileSync('.eslintignore', '/node_modules')
  console.log('---')
  console.log('eslint 安装完毕,请执行:')
  console.log(chalk.green.bold('npm init @eslint/config'))
  console.log('进行具体的eslint配置。')
  console.log(`eslint配置文件请选择 ${chalk.red('json')} 格式。`)
}

/**
 * 安装Prettier
 * @param thePackage 包管理器
 */
function installPrettier(thePackage: PackageManager) {
  const confFilePath = '.eslintrc.json'
  const command = packageCommand(thePackage)
  const packageJson = readPackageJson()
  const confFile = readJsonFile(
    confFilePath,
    `未找到 ${chalk.red('.eslintrc.json')} 文件，请首先安装并配置 eslint`
  )
  command.addDev([
    'prettier',
    'eslint-config-prettier',
    'eslint-plugin-prettier'
  ])
  // 先转换成数组再操作
  if (!confFile.extends || typeof confFile.extends === 'string') {
    confFile.extends = confFile.extends ? [confFile.extends] : []
  }
  // 添加规则
  if (!confFile.extends.includes('prettier')) {
    confFile.extends.push('prettier')
  }
  if (!confFile.extends.includes('plugin:prettier/recommended')) {
    confFile.extends.push('plugin:prettier/recommended')
  }
  // 先转换成数组再操作
  if (!confFile.plugins || typeof confFile.plugins === 'string') {
    confFile.plugins = confFile.plugins ? [confFile.plugins] : []
  }
  if (!confFile.plugins.includes('prettier')) {
    confFile.plugins.push('prettier')
  }
  if (!confFile.rules['prettier/prettier']) {
    confFile.rules['prettier/prettier'] = 'error'
  }
  if (!packageJson.scripts['lint:script']) {
    packageJson.scripts['lint:script'] =
      'eslint --ext .js,.jsx,.ts,.tsx --fix --quiet ./'
  }
  writeJSONSync(confFilePath, confFile)
  writeJSONSync('package.json', packageJson)
  writeJSONSync('.prettierrc.json', confFileTemplate.prettier)
  console.log('---')
  console.log(`${chalk.green('prettier 安装成功!')}`)
}

/**
 * 安装Husky
 * @param thePackage 包管理器
 */
function addHusky(thePackage: PackageManager) {
  if (checkIsGit()) {
    const command = packageCommand(thePackage)
    const packageJson = readPackageJson()
    command.addDev(['husky', 'lint-staged'])
    packageJson.scripts['prepare'] = 'husky install'
    packageJson['lint-staged'] = {
      '**/*.{js,jsx,ts,tsx}': ['npm run lint:script', 'git add .'],
      '**/*.{css,less,scss}': ['npm run lint:style', 'git add .']
    }
    writeJSONSync('package.json', packageJson)
    command.exec('npm run prepare')
    command.exec('npx husky add .husky/pre-commit "npx --no -- lint-staged"')
    console.log('---')
    console.log(`${chalk.green('husky 安装成功!')}`)
  } else {
    console.error(
      `当前文件夹并没有进行 git 初始化，请执行 ${chalk.red(
        'git init'
      )} 来初始化 git 仓库`
    )
  }
}
