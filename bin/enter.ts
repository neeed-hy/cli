#! /usr/bin/env node
import { Command } from 'commander'
import * as chalk from 'chalk'
import { create } from '../lib/create'

const program = new Command()

// console.log(`hello ${chalk.blue('world')}`)
// console.log(chalk.blue.bgRed.bold('Hello world!'))
// console.log(
//   chalk.green(
//     'I am a green line ' +
//       chalk.blue.underline.bold('with a blue substring') +
//       ' that becomes green again!'
//   )
// )


program
  .name('demo')
  .usage(`<command> [option]`)
  .version(`yuhe ${require('../package.json').version}`)

program
  .command('create <project-name>') // 增加创建指令
  .description('create a new project') // 添加描述信息
  .option('-f, --force', 'overwrite target directory if it exists') // 强制覆盖
  .action(async (name: string, command: any) => {
    await create(name, command)
  })

program
  .command('config [value]') // config 命令
  .description('inspect and modify the config')
  .option('-g, --get <key>', 'get value by key')
  .option('-s, --set <key> <value>', 'set option[key] is value')
  .option('-d, --delete <key>', 'delete option by key')
  .action((value, keys) => {
    // value 可以取到 [value] 值，keys会获取到命令参数
    console.log(value, keys)
  })

// 监听 --help 指令
program.on('--help', function () {
  // 前后两个空行调整格式，更舒适
  console.log()
  console.log(
    `Run ${chalk.cyan(
      'zc-cli <command> --help'
    )} for detailed usage of given command.`
  )
  console.log()
})

// 解析用户执行时输入的参数
// process.argv 是 nodejs 提供的属性
// npm run server --port 3000
// 后面的 --port 3000 就是用户输入的参数
program.parse(process.argv)
