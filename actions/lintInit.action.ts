import * as inquirer from 'inquirer'
import type { Question } from 'inquirer'
import { generateSingleSelect } from '../lib/question'
import * as chalk from 'chalk'
import { outputFileSync } from 'fs-extra'

import {
  packageCommand,
  PackageManager,
  packageManagers
} from '../lib/packageManager'

enum ELintTools {
  eslint = 'eslint',
  husky = 'husky',
  prettier = 'prettier'
}

const lintTools = [ELintTools.eslint, ELintTools.husky, ELintTools.prettier]

interface IAnswer {
  type: ELintTools
  packageManager: PackageManager
}

export async function lintInit() {
  const prompt = inquirer.createPromptModule()
  const questions: Question[] = [
    generateSingleSelect('packageManager', '请选择包管理器', packageManagers),
    generateSingleSelect('type', '请选择你要初始化的工具', lintTools)
  ]
  const answer = await prompt<IAnswer>(questions)
  const { type, packageManager } = answer
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
}

/**
 * 安装eslint
 * @param thePackage 包管理器
 */
function installEslint(thePackage: PackageManager) {
  const command = packageCommand(thePackage)
  command.addDev(ELintTools.eslint)
  outputFileSync('.eslintignore', '/node_modules')
  console.log('---')
  console.log('eslint 安装完毕,请执行:')
  console.log(chalk.green.bold('npm init @eslint/config'))
  console.log('进行具体的eslint配置。')
  console.log()
}

/**
 * 安装Prettier
 * @param thePackage 包管理器
 */
function installPrettier(thePackage: PackageManager) {
  const command = packageCommand(thePackage)
  command.addDev(ELintTools.prettier)
}

/**
 * 安装Husky
 * @param thePackage 包管理器
 */
function addHusky(thePackage: PackageManager) {
  const command = packageCommand(thePackage)
  console.log(command.version())
}
