import type { Rule } from 'ant-design-vue/es/form';

export interface IFormItem {
  type: string
  props: object
  label: string
  key: string
  rules?: string | Rule[]
  // 是否隐藏
  isHidden?: boolean
}
