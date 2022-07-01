import { useConstantStore } from '@/stores/constant'
const constantStore = useConstantStore()
import { validatePhone } from '@/utils/validate-funtion';

const modalConfig = {
  formItems: [
    {
      type: 'a-input',
      label: '登录账号',
      key: 'userName',
      rules: [{ required: true,trigger: 'blur', message: '请输入登录账号' }],
    },
    {
      type: 'a-input',
      label: '登录密码',
      key: 'password',
      rules: [
        { required: true,trigger: 'blur', message: '请输入密码' },
      ],
    },
    {
      type: 'a-input',
      label: '确认密码',
      key: 'confirmPwd',
      rules: [
        { required: true,trigger: 'blur', message: '请再次输入密码' },
      ],
    },
    {
      type: 'a-input',
      label: '用户姓名',
      key: 'nickName',
      rules: [
        { required: true,trigger: 'blur', message: '请输入用户姓名' },
      ],
    },
    {
      type: 'a-input',
      label: '手机号码',
      key: 'phone',
      rules: [
        { required: true,trigger: 'blur', message: '请输入手机号码' },
        { validator: validatePhone, trigger: 'blur' },
      ]
    },
    {
      type: 'a-radio-group',
      label: '用户状态',
      key: 'status',
      defaultValue: '0',
      props: {
        options: [
          { label: '正常', value: '0' },
          { label: '锁定', value: '9' },
        ]
      }
    },
    {
      type: 'a-select',
      label: '所属权限',
      key: 'roleIds',
      rules: [
        { required: true, message: '请选择至少一个权限', trigger: 'change' },
      ],
      props: {
        placeholder: '请选择',
        style: {
          width: '270px',
        },
        options: constantStore.roleList
      },
    },
    {
      type: 'a-input',
      label: '用户类型',
      key: 'userType',
      isHidden: true,
    },
    {
      type: 'a-input',
      label: '用户id',
      key: 'userId',
      isHidden: true,
    },
    {
      type: 'a-select',
      label: '所属街道',
      key: 'streetCode',
      props: {
        placeholder: '请选择',
        style: {
          width: '270px',
        },
        options: constantStore.streetGroup
      },
    },
  ],
}
export default modalConfig;
