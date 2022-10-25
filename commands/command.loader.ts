import type { Command } from 'commander'
import CreateCommand from './create.command'

export const CommandLoader = (program: Command) => {
  CreateCommand(program)
}
