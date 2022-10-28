import * as inquirer from 'inquirer'
import type { Question } from 'inquirer'
import { generateMultiSelect, generateSingleSelect } from '../lib/question'
import { exec } from 'shelljs'
import {
  packageCommand,
  PackageManager,
  packageManagers
} from '../lib/packageManager'

enum ELintTools {
  eslint = 'eslint + prettier',
  husky = 'husky'
}

const lintTools = [ELintTools.eslint, ELintTools.husky]

interface IAnswer {
  type: ELintTools[]
  packageManager: PackageManager
}

export async function lintInit() {
  const prompt = inquirer.createPromptModule()
  const questions: Question[] = [
    generateSingleSelect('packageManager', '请选择包管理器', packageManagers),
    generateMultiSelect('type', '请选择你要初始化的工具', lintTools)
  ]
  const answer = await prompt<IAnswer>(questions)
  const { packageManager } = answer
  const command = packageCommand(packageManager)
  exec(command.version())
}
