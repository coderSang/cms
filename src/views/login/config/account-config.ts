export default {
  name: [
    {
      required: true,
      message: '用户名是必填内容',
      trigger: 'blur',
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户必须名为5-10位的字母或者数字',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '密码是必填内容',
      trigger: 'blur',
    },
    {
      pattern: /^[a-z0-9]{5,}$/,
      message: '密码必须为5位以上的字母或者数字',
      trigger: 'blur',
    },
  ],
};
