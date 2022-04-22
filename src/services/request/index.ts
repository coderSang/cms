import axios from 'axios';

import type { AxiosInstance } from 'axios';
import type { myRequestConfig, myRequestInterceptors } from '@/services/request/types';

const DEFAULT_LOADING = false;

class MyRequest {
  // 实例
  instance: AxiosInstance

  // 拦截器
  interceptors?: myRequestInterceptors

  // 是否显示正在加载
  showLoading: boolean

  constructor(config: myRequestConfig) {
    // 定义一个instance实例
    this.instance = axios.create(config);
    // 拦截器相关设置
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;
    // 请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch,
    );
    // 响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch,
    );
    // 公共拦截器
    this.instance.interceptors.request.use(
      (configCommon) => {
        if (this.showLoading) {
          console.log('正在请求');
        }
        return configCommon;
      },
      (errCommon) => errCommon,
    );
    // 公共响应
    // this.instance.interceptors.response.use(
    //   (res) => {
    //     this.showLoading
    //   }
    // )
  }
}
