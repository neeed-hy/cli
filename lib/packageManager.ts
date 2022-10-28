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
  PackageManager.npm,
  PackageManager.yarn,
  PackageManager.pnpm
]

/**
 * 包管理器命令
 */
export interface PackageManagerCommands {
  /**
   * 安装
   */
  install: () => string
  /**
   * 添加到dependencies
   */
  add: (pkg: string | string[]) => string
  /**
   * 添加到devDependencies
   */
  addDev: (pkg: string | string[]) => string
  /**
   * 更新
   */
  update: (pkg: string) => string
  /**
   * 去除
   */
  remove: (pkg: string) => string
  /**
   * 版本，可用于环境校验
   */
  version: () => string
}

/**
 * npm的命令
 */
const npmCommand: PackageManagerCommands = {
  install: () => 'npm install',
  add: (pkg: string | string[]) => `npm install ${pkg} --save`,
  addDev: (pkg: string | string[]) => `npm install ${pkg} --save-dev`,
  update: (pkg: string | string[]) => `npm update ${pkg}`,
  remove: (pkg: string | string[]) => `npm uninstall ${pkg}`,
  version: () => 'npm -v'
}

/**
 * yarn的命令
 */
const yarnCommand: PackageManagerCommands = {
  install: () => 'yarn',
  add: (pkg: string | string[]) => `yarn add ${pkg}`,
  addDev: (pkg: string | string[]) => `yarn add ${pkg} --dev`,
  update: (pkg: string | string[]) => `yarn upgrade ${pkg}`,
  remove: (pkg: string | string[]) => `yarn remove ${pkg}`,
  version: () => 'yarn --version'
}
/**
 * pnpm的命令
 */
const pnpmCommand: PackageManagerCommands = {
  install: () => 'pnpm install',
  add: (pkg: string | string[]) => `pnpm add ${pkg}`,
  addDev: (pkg: string | string[]) => `pnpm add ${pkg} --save-dev`,
  update: (pkg: string | string[]) => `pnpm update ${pkg}`,
  remove: (pkg: string | string[]) => `pnpm remove ${pkg}`,
  version: () => 'pnpm -v'
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
      // 默认使用pnpm
      return pnpmCommand
  }
}
