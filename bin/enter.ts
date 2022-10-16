#! /usr/bin/env node
import { Command } from 'commander'
import * as chalk from 'chalk'
import { CommandLoader } from '../commands'
// console.log(`hello ${chalk.blue('world')}`)
// console.log(chalk.blue.bgRed.bold('Hello world!'))
// console.log(
//   chalk.green(
//     'I am a green line ' +
//       chalk.blue.underline.bold('with a blue substring') +
//       ' that becomes green again!'
//   )
// )

const bootstrap = () => {
  const program = new Command()

  program
    .name('demo')
    .usage(`<command> [option]`)
    .version(`yuhe ${require('../package.json').version}`)

  CommandLoader(program)

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
}

bootstrap()
