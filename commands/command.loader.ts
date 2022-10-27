import type { Command } from 'commander'
import CreateCommand from './create.command'
import LintInitCommand from './lintInit.command'

export const CommandLoader = (program: Command) => {
  CreateCommand(program)
  LintInitCommand(program)
}
