import { myRequest } from '@/service';

export function getStreet(params: any) {
  return myRequest.get<any>({
    url: '/sys-org/page',
    params,
  })
}
export function insertStreet(data: any) {
  return myRequest.post<any>({
    url: '/sys-org/add',
    data,
  })
}
export function editStreet(data: any) {
  return myRequest.post<any>({
    url: '/sys-org/update',
    data,
  })
}
export function delStreet(params: any) {
  return myRequest.get<any>({
    url: '/sys-org/delete',
    params,
  })
}
