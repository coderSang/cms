import { useLoginStore } from '@/stores/login';

const store = useLoginStore()

export function userPermission(pageName: string, handleName: string) {
  const permissions = store.permissions
  const verifyPermission = `system:${pageName}:${handleName}`
  return !!permissions.find((item: string) => item === verifyPermission)
}
