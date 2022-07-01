const contentTableConfig = {
  title: '角色列表',
  pageName: 'examination',
  columns: [
    {
      title: '申请时间',
      dataIndex: 'createTime',
      width: '20%',
      ellipsis: true,
    },
    {
      title: '企业名称',
      dataIndex: 'enterpriseName',
    },
    {
      title: '司机姓名',
      dataIndex: 'driverName',
    },
    {
      title: '车牌号',
      dataIndex: 'licensePlate',
      ellipsis: true,
    },

    {
      title: '类型',
      dataIndex: 'driverType',
      key: 'driverType',
    },
    {
      title: '停留时间',
      dataIndex: 'stayEndTime',
      key: 'stayEndTime',
      width: '20%',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '操作',
      dataIndex: 'handle',
      key: 'handle',
    },
  ],
}

export default contentTableConfig;
