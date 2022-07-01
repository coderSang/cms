import { loginRequest, myRequest } from '@/service';

export function getGroup(params: any) {
  return loginRequest.get<any>({
    url: '/sys-org/list',
    params,
  })
}
export function getRoleList(params: any) {
  return myRequest.get<any>({
    url: '/admin/role/page',
    params,
  })
}
