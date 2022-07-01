const contentTableConfig = {
  title: '街道列表',
  pageName: 'dept',
  columns: [
    {
      title: '组织编号',
      dataIndex: 'id',
    },
    {
      title: '组织名称',
      dataIndex: 'name',
    },
    {
      title: '父级组织编号',
      dataIndex: 'pid',
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
