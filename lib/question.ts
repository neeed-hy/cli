/**
 * 生成多选问题
 * @param name  问题名称
 * @param message 问题说明
 * @param choices 问题选项
 * @returns
 */
export const generateCheckbox = (
  name: string,
  message: string,
  choices: string[]
) => {
  return {
    type: 'checkbox',
    name,
    message,
    choices: choices
  }
}
