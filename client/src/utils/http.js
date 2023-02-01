import axios from 'axios'
import { getToken } from '@/utils'

const http = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 5000
})

// Request interceptors
http.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `${token}`
  }
  return config
})

// // Response interceptors
// http.interceptors.response.use((response)=> {
//     // 2xx 范围内的状态码都会触发该函数。
//     // 对响应数据做点什么
//     return response
//   }, (error)=> {
//     // 超出 2xx 范围的状态码都会触发该函数。
//     // 对响应错误做点什么
//     return Promise.reject(error)
// })

export { http }