const fsExtra = require('fs-extra')
const globby = require('globby')

/**
 * only clean the following dirs
 */
const sources = ['lib', 'actions', 'commands', 'bin']

async function cleanOutput() {
  const files = sources.map((source) => [
    `${source}/**/*.js`,
    `${source}/**/*.d.ts`,
    `${source}/**/*.js.map`,
    `${source}/**/*.d.ts.map`
  ])
  files.forEach(async (file) => {
    const temp = await globby(file)
    temp.forEach((path) => {
      fsExtra.removeSync(path)
    })
  })
  console.log('clean output done!')
}

cleanOutput()
