import type { Command } from 'commander'
import { create } from '../actions'

const CreateCommand = (program: Command) => {
  const command = program
    .command('create <project-name>') // 增加创建指令
    .description('create a new project') // 添加描述信息
    .option('-f, --force', 'overwrite target directory if it exists') // 强制覆盖
    .action(async (name: string, command: any) => {
      await create(name, command)
    })
  return command
}

export default CreateCommand
