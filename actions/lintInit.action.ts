import * as inquirer from 'inquirer'
import type { Question } from 'inquirer'
import { generateSingleSelect } from '../lib/question'
import * as chalk from 'chalk'
import { outputFileSync, readJSONSync, writeJSONSync } from 'fs-extra'

import {
  packageCommand,
  PackageManager,
  packageManagers
} from '../lib/packageManager'

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
  let confFile: Record<string, any> = {}
  try {
    confFile = readJSONSync(confFilePath, 'utf8')
  } catch (error) {
    console.error(
      `未找到 ${chalk.red('.eslintrc.json')} 文件，请首先安装并配置 eslint`
    )
    process.exit()
  }
  const command = packageCommand(thePackage)
  command.addDev([
    'prettier',
    'eslint-config-prettier',
    'eslint-plugin-prettier'
  ])
  if (!confFile.extends.includes('prettier')) {
    confFile.extends.push('prettier')
  }
  if (!confFile.extends.includes('plugin:prettier/recommended')) {
    confFile.extends.push('plugin:prettier/recommended')
  }
  if (!confFile.plugins.includes('prettier')) {
    confFile.plugins.push('prettier')
  }
  if (!confFile.rules['prettier/prettier']) {
    confFile.rules['prettier/prettier'] = 'error'
  }
  writeJSONSync(confFilePath, confFile)
  console.log('---')
  console.log(`${chalk.green('prettier 安装成功!')}`)
}

/**
 * 安装Husky
 * @param thePackage 包管理器
 */
function addHusky(thePackage: PackageManager) {
  const command = packageCommand(thePackage)
  console.log(command.version())
}
