import MyRequest from '@/service/request';
import { BASE_URL, TIME_OUT } from '@/service/request/config';
import localCache from '@/utils/cache'

const myRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors(config) {
      const token = localCache.getCache('token')
      if (token) {
        config.headers = { Authorization: `Bearer ${token}` }
      }
      return config
    }
  }
})
const loginRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {}
})
export { myRequest, loginRequest }
