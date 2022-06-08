import axios from 'axios';
import type { AxiosInstance } from 'axios'
import { myRequestInterceptors, myRequestConfig } from '@/service/request/type';


class MyRequest {
  instance: AxiosInstance
  interceptors?: myRequestInterceptors

  constructor(config: myRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    // 请求
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    // 响应
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )
  }

  request<T = any>(config: myRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
          return;
      })
    })
  }
  get<T = any>(config: myRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: myRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }
}

export default MyRequest
