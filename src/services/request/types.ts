import type { AxiosRequestConfig, AxiosResponse } from 'axios';

// 定义请求体的拦截器状态
export interface myRequestInterceptors<T = AxiosResponse> {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (error: any) => any
  responseInterceptors?: (res: T) => T
  responseInterceptorsCatch?: (error: any) => any
}
// 定义拦截器以及是否显示loading
export interface myRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: myRequestInterceptors<T>
  showLoading?: boolean
}
