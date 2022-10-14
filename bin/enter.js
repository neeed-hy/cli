#! /usr/bin/env node
const program = require('commander')
const chalk = require('chalk')
console.log(`hello ${chalk.blue('world')}`)
console.log(chalk.blue.bgRed.bold('Hello world!'))
console.log(
  chalk.green(
    'I am a green line ' +
      chalk.blue.underline.bold('with a blue substring') +
      ' that becomes green again!'
  )
)

program.name('demo').usage(`<command> [option]`).version(`1.0.0`)

// 解析用户执行时输入的参数
// process.argv 是 nodejs 提供的属性
// npm run server --port 3000
// 后面的 --port 3000 就是用户输入的参数
program.parse(process.argv)
