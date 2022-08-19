import { loginRequest, myRequest } from '@/service';

import { IDataType, IImgResult, ILoginType } from '@/service/types'

export function getCache() {
  return loginRequest.get<IDataType<IImgResult>>({
    url: '/admin/captchaImage'
  })
}
export function getLogin(params: ILoginType) {
  return loginRequest.post<IDataType>({
    url: '/login',
    data: params,
  })
}
export function getUserInfo() {
  return myRequest.get<IDataType>({
    url: '/admin/user/info',
  })
}
export function getMenus() {
  return myRequest.get<IDataType>({
    url: '/admin/menu',
  })
}
