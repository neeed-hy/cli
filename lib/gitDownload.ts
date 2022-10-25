import { promisify } from 'util'
import ora = require('ora')
const downloadGitRepo = require('download-git-repo')
const download = promisify(downloadGitRepo)

const downloadGit = async (repo: string, target: string) => {
  const spinner = ora('开始下载..')
  spinner.start()
  try {
    await download(repo, target).then((error: string) => {
      if (error) {
        throw new Error(error)
      } else {
        spinner.succeed('下载成功！')
      }
    })
  } catch (error) {
    console.error('err')
    spinner.fail(error)
  }
}

export { downloadGit }
