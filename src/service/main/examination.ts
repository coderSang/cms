import { myRequest, exportRequest } from '@/service';

export function getExamination(params: any) {
  return myRequest.get<any>({
    url: '/enterprise/passphrase/page',
    params,
  })
}
export function exportBlobExamination(params: any) {
  return exportRequest.get<any>({
    url: '/enterprise/passphrase/export',
    params,
  })
}
