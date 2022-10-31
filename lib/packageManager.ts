import { exec } from 'shelljs'
/**
 * 包管理器
 */
export enum PackageManager {
  npm = 'npm',
  yarn = 'yarn',
  pnpm = 'pnpm'
}

/**
 * 包管理器数组
 */
export const packageManagers = [
  PackageManager.pnpm,
  PackageManager.npm,
  PackageManager.yarn
]

/**
 * 包管理器命令
 */
export interface PackageManagerCommands {
  /**
   * 安装
   */
  install: () => void
  /**
   * 添加到dependencies
   */
  add: (pkg: string | string[]) => void
  /**
   * 添加到devDependencies
   */
  addDev: (pkg: string | string[]) => void
  /**
   * 更新
   */
  update: (pkg: string) => void
  /**
   * 去除
   */
  remove: (pkg: string) => void
  /**
   * 版本，可用于环境校验
   */
  version: () => string
  /**
   * 直接执行某些语句
   */
  exec: (shell: string) => void
}

/**
 * 将传入的要处理的包处理成字符串
 * @param pkg
 * @returns
 */
function getPkgString(pkg: string | string[]) {
  return typeof pkg === 'string' ? pkg : pkg.join(' ')
}

/**
 * npm的命令
 */
const npmCommand: PackageManagerCommands = {
  install: () => exec('npm install'),
  add: (pkg: string | string[]) =>
    exec(`npm install ${getPkgString(pkg)} --save`),
  addDev: (pkg: string | string[]) =>
    exec(`npm install ${getPkgString(pkg)} --save-dev`),
  update: (pkg: string | string[]) => exec(`npm update ${getPkgString(pkg)}`),
  remove: (pkg: string | string[]) =>
    exec(`npm uninstall ${getPkgString(pkg)}`),
  version: () => exec('npm -v'),
  exec: (command: string) => exec(command)
}

/**
 * yarn的命令
 */
const yarnCommand: PackageManagerCommands = {
  install: () => exec('yarn'),
  add: (pkg: string | string[]) => exec(`yarn add ${getPkgString(pkg)}`),
  addDev: (pkg: string | string[]) =>
    exec(`yarn add ${getPkgString(pkg)} --dev`),
  update: (pkg: string | string[]) => exec(`yarn upgrade ${getPkgString(pkg)}`),
  remove: (pkg: string | string[]) => exec(`yarn remove ${getPkgString(pkg)}`),
  version: () => exec('yarn --version'),
  exec: (command: string) => exec(command)
}
/**
 * pnpm的命令
 */
const pnpmCommand: PackageManagerCommands = {
  install: () => exec('pnpm install'),
  add: (pkg: string | string[]) => exec(`pnpm add ${getPkgString(pkg)}`),
  addDev: (pkg: string | string[]) =>
    exec(`pnpm add ${getPkgString(pkg)} --save-dev`),
  update: (pkg: string | string[]) => exec(`pnpm update ${getPkgString(pkg)}`),
  remove: (pkg: string | string[]) => exec(`pnpm remove ${getPkgString(pkg)}`),
  version: () => exec('pnpm -v'),
  exec: (command: string) => exec(command)
}

/**
 * 根据包管理器，获得具体使用指令
 * @param thePackage 包管理器名
 * @returns
 */
export const packageCommand = (thePackage: PackageManager) => {
  switch (thePackage) {
    case PackageManager.npm:
      return npmCommand
    case PackageManager.yarn:
      return yarnCommand
    case PackageManager.pnpm:
      return pnpmCommand
    default:
      throw new Error('包管理器选择错误')
  }
}
