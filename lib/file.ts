import { readJSONSync } from 'fs-extra'
import * as chalk from 'chalk'
import { exec } from 'shelljs'

/**
 * 检查文件目录下是否有package.json文件
 * 如果有则返回json对象，没有则报错然后直接结束进程
 * @returns
 */
export function readPackageJson() {
  const packageJsonPath = 'package.json'
  let packageJson: Record<string, any> = {}
  try {
    packageJson = readJSONSync(packageJsonPath, 'utf8')
    return packageJson
  } catch (error) {
    console.error(`未找到 ${chalk.red('package.json')} 文件，`)
    console.error(
      `请执行 ${chalk.red('npm init')} 或 ${chalk.red(
        'npm init -y'
      )} 进行初始化`
    )
    process.exit()
  }
}

/**
 * 读取特定的Json文件
 * 如果有则返回json对象，没有则报错然后直接结束进程
 * @param path  文件路径
 * @param errorMsg  报错信息
 * @returns
 */
export function readJsonFile(path: string, errorMsg: string) {
  let file: Record<string, any> = {}
  try {
    file = readJSONSync(path, 'utf8')
    return file
  } catch (error) {
    console.error(errorMsg)
    process.exit()
  }
}

/**
 * 检查当前文件夹是不是一个git仓库
 * 是的话返回true，没有则报错然后直接结束进程
 * @returns
 */
export function checkIsGit() {
  try {
    // 如果正常返回的话code=0,取个非正好是true
    return !exec('git rev-parse --is-inside-work-tree').code
  } catch (error) {
    return false
  }
}
