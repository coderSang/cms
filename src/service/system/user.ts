import { myRequest } from '@/service';

export function getUser(params: any) {
  return myRequest.get<any>({
    url: '/admin/user/page',
    params,
  })
}
export function insertUser(data: any) {
  return myRequest.post<any>({
    url: '/admin/user',
    data,
  })
}
export function editUser(data: any) {
  return myRequest.put<any>({
    url: '/admin/user',
    data,
  })
}
export function delUser(data: IObjKeyValue) {
  return myRequest.delete<any>({
    url: `/admin/user/${data.id}`,
  })
}
export function importUser(data: IObjKeyValue) {
  return myRequest.post<any>({
    url: '/sys-risk-area/import',
    data
  })
}
