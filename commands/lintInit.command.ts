import type { Command } from 'commander'
import { lintInit } from '../actions'

const LintInitCommand = (program: Command) => {
  const command = program
    .command('lint-init')
    .description('初始化lint工具链')
    .option('-f, --force', 'overwrite target directory if it exists') // 强制覆盖
    .action(async () => {
      await lintInit()
    })
  return command
}
export default LintInitCommand
