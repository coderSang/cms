const SearchConfig = [
  {
    type: 'a-input',
    props: {
      placeholder: '请选择',
      style: {
        width: '270px',
      },
    },
    label: '测试',
    key: 'name',
  },
  {
    type: 'a-select',
    props: {
      placeholder: '请选择',
      style: {
        width: '270px',
        textAlign: 'left'
      },
      options: [{
        label: 'dsadaddsadaddsadaddsadad',
        value: 'ss1ss'
      },{
        label: 'dsadad',
        value: 'ss2ss'
      },{
        label: 'dsadad',
        value: 'ss3ss'
      }]
    },
    label: '测试2',
    key: '2',
  },
  {
    type: 'a-input',
    props: {
      placeholder: '请选择',
    },
    label: '测试3',
    key: '3',
  },
  {
    type: 'a-input',
    props: {
      placeholder: '请选择',
    },
    label: '测试33',
    key: '33',
  },
]
export default SearchConfig
