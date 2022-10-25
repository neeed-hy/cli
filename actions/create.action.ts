import { mkdirSync, existsSync, removeSync } from 'fs-extra'
import * as inquirer from 'inquirer'
interface IOption {
  force: boolean
}
export async function create(projectName: string, options: IOption) {
  const pwd = process.cwd()
  const path = `${pwd}/${projectName}`
  if (!existsSync(path)) {
    mkdirSync(path)
  } else if (options.force) {
    removeSync(path)
    mkdirSync(path)
  } else {
    const prompt = inquirer.createPromptModule()
    const { isOverwrite } = await prompt<{ isOverwrite: boolean }>([
      {
        name: 'isOverwrite',
        type: 'list',
        message: 'Check the features needed for your project:',
        choices: [
          { name: 'Overwrite', value: true },
          { name: 'Cancel', value: false },
        ],
      },
    ])
    if (isOverwrite) {
      removeSync(path)
      mkdirSync(path)
    } else {
      console.log('取消建立！')
    }
  }
  process.exit(1)
}
