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

// Response interceptors
http.interceptors.response.use((response)=> {
    // range: 2xx 
    return response
  }, (error)=> {
    // range: > 2xx
    //console.dir(error)

    // invalid token or token expire
    
    if(error.response.status ===  401){
      // navigate to login
      console.log('login!')
      window.location.href = '/login'
    }

    return Promise.reject(error)
})

export { http }