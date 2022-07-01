const modalConfig = {
  formItems: [
    {
      type: 'a-input',
      label: '组织名称',
      key: 'name',
      rules: [{ required: true,trigger: 'blur', message: '请输入组织名称' }],
    },
    {
      type: 'a-input',
      label: '组织说明',
      key: 'note',
    },
    {
      type: 'a-input',
      label: 'id',
      key: 'id',
      isHidden: true,
    },
    {
      type: 'a-input',
      defaultValue: '330521000000',
      label: 'pid',
      key: 'pid',
      isHidden: true,
    },
  ]
}
export default modalConfig;
