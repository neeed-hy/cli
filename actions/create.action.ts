import { existsSync, removeSync } from 'fs-extra'
import * as inquirer from 'inquirer'
import { downloadGit } from '../lib/gitDownload'

interface IOption {
  force: boolean
}
export async function create(projectName: string, options: IOption) {
  const pwd = process.cwd()
  const path = `${pwd}/${projectName}`
  if (!existsSync(path)) {
    await download2(path)
  } else if (options.force) {
    removeSync(path)
    await download2(path)
  } else {
    const prompt = inquirer.createPromptModule()
    const { isOverwrite } = await prompt<{ isOverwrite: boolean }>([
      {
        name: 'isOverwrite',
        type: 'list',
        message: 'Check the features needed for your project:',
        choices: [
          { name: 'Overwrite', value: true },
          { name: 'Cancel', value: false }
        ]
      }
    ])
    if (isOverwrite) {
      removeSync(path)
      await download2(path)
    } else {
      console.log('取消建立！')
    }
  }
}

const download2 = async (path: string) => {
  // 用来测试
  const target = 'neeed-hy/rollup-template'
  await downloadGit(target, path)
}
