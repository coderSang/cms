import dayjs from 'dayjs';
import MyRequest from '@/service/request';
import { BASE_URL, TIME_OUT } from '@/service/request/config';
import localCache from '@/utils/cache';

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
    },
  }
})
const loginRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {}
})

const exportRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  responseType: "blob",
  headers: {
    accept: 'application/octet-stream',
  },
  transformRequest: [
    function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      ret = ret.substring(0, ret.lastIndexOf('&'));
      return ret
    }
  ],
  interceptors: {
    requestInterceptors(config) {
      const token = localCache.getCache('token')
      if (token) {
        config.headers = { Authorization: `Bearer ${token}` }
      }
      return config
    },
    responseInterceptors(response) {
      if (response.data.code == '401') {
        localStorage.removeItem('webUserInfo');
        localStorage.removeItem('webToken');
        location.href = "/#/login"
        return;
      }
      let fileType = '.xls'
      // 尝试获取文件名
      let fileNameTemp = '下载' + dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss') ;
      const contentDisposition = response?.headers['content-disposition']
      if (contentDisposition) {
        try {
          const fileName = decodeURIComponent(decodeURIComponent(
            decodeURIComponent(contentDisposition.split(';')[1].
            replace('filename=', '')))).trim()
          if (fileName.lastIndexOf('.xlsx') > -1) {
            fileType = '.xlsx'
            fileNameTemp = fileName.replace('.xlsx', '')
          } else if (fileName.lastIndexOf('.xls') > -1) {
            fileType = '.xls'
            fileNameTemp = fileName.replace('.xls', '')
          } else {
            fileType = '.xlsx'
            fileNameTemp = fileName.replace('.xlsx', '')
          }
        } catch (err) {
          console.log(err)
        }
      }
      const content = response.data;
      const blob = new Blob([content])
      if ('download' in document.createElement('a')) { // 非IE下载
        const eLink = document.createElement('a')
        eLink.download = fileNameTemp.trim() + fileType
        eLink.style.display = 'none'
        eLink.href = URL.createObjectURL(blob)
        document.body.appendChild(eLink)
        eLink.click()
        URL.revokeObjectURL(eLink.href) // 释放URL 对象
        document.body.removeChild(eLink)
      }
      return response.data
    }
  }
})
export { myRequest, loginRequest, exportRequest }
