import { useConstantStore } from '@/stores/constant'
const constantStore = useConstantStore()
const SearchConfig = {
  formItems: [
    {
      type: 'a-input',
      label: '用户姓名',
      key: 'nickName',
    },
    {
      type: 'a-input',
      label: '登录账号',
      key: 'userName',
    },
    {
      type: 'a-select',
      props: {
        placeholder: '请选择',
        style: {
          width: '270px',
        },
        options: constantStore.streetGroup
      },
      label: '所属街道',
      key: 'streetCode',
    },
  ]
}
export default SearchConfig
