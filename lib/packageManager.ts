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
