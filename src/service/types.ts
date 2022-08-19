export interface IDataType<T = any> {
  code: number
  data: T
  msg: string
}
// 验证码
export interface IImgResult {
  captchaOnOff: boolean
  img: string
  uuid: string
}
// 登录
export interface ILoginType {
  userName: string;
  password: string;
}
