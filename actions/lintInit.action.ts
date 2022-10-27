import * as inquirer from 'inquirer'
import type { Question } from 'inquirer'
import { generateCheckbox } from '../lib/question'

enum ELintTools {
  eslint = 'eslint + prettier',
  husky = 'husky'
}

const lintTools = [ELintTools.eslint, ELintTools.husky]

interface IAnswer {
  type: ELintTools[]
}

export async function lintInit() {
  const prompt = inquirer.createPromptModule()
  const questions: Question[] = [
    generateCheckbox('type', '请选择你要初始化的工具', lintTools)
  ]
  const answer = await prompt<IAnswer>(questions)
  console.log(answer.type)
}
