/**
 * 生成选择问题
 * @param type list:单选，checkbox：多选
 * @param name  问题名称
 * @param message 问题说明
 * @param choices 问题选项
 * @returns
 */
function generateSelectQuestion(
  type: 'list' | 'checkbox',
  name: string,
  message: string,
  choices: string[]
) {
  return {
    type,
    name,
    message,
    choices: choices
  }
}
/**
 * 生成多选问题
 * @param name  问题名称
 * @param message 问题说明
 * @param choices 问题选项
 * @returns
 */
export const generateMultiSelect = (
  name: string,
  message: string,
  choices: string[]
) => {
  return generateSelectQuestion('checkbox', name, message, choices)
}
/**
 * 生成单选问题
 * @param name  问题名称
 * @param message 问题说明
 * @param choices 问题选项
 * @returns
 */
export const generateSingleSelect = (
  name: string,
  message: string,
  choices: string[]
) => {
  return generateSelectQuestion('list', name, message, choices)
}
