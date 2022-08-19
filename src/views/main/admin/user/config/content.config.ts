const contentTableConfig = {
  title: '角色列表',
  pageName: 'user',
  columns: [
    {
      title: '用户姓名',
      dataIndex: 'nickName',
    },
    {
      title: '登录账号',
      dataIndex: 'userName',
    },
    {
      title: '所属街道',
      dataIndex: 'streetName',
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
    },

    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'handle',
      key: 'handle',
    },
  ],
}
export default contentTableConfig;
