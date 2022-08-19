const SearchConfig = {
  formItems: [
    {
      type: 'a-input',
      props: {
        placeholder: '请输入企业名称',
      },
      label: '企业名称',
      key: 'enterpriseName',
    },
    {
      type: 'a-input',
      props: {
        placeholder: '请输入司机姓名',
        style: {
          width: '270px',
        },
      },
      label: '司机姓名',
      key: 'driverName',
    },
    {
      type: 'a-select',
      props: {
        placeholder: '请选择状态',
        style: {
          width: '270px',
          textAlign: 'left'
        },
        options: [
          {
            label: '未审核',
            value: '0',
          },
          {
            label: '审核通过',
            value: '1',
          },
          {
            label: '申请驳回',
            value: '2',
          },
          {
            label: '已结束',
            value: '3',
          },
          {
            label: '已撤销',
            value: '4',
          },
        ],
      },
      label: '状态',
      key: 'status',
    },
    {
      type: 'a-input',
      props: {
        placeholder: '请输入车牌号',
      },
      label: '车牌号',
      key: 'licensePlate',
    },
    {
      type: 'a-range-picker',
      label: '日期',
      key: ['startTime', 'endTime'],
      props: {
        valueFormat: "YYYY-MM-DD HH:mm:ss",
      }
    },
  ]
}
export default SearchConfig
