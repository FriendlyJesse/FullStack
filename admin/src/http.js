import axios from 'axios'
import Vue from 'vue'
import router from './route'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

http.interceptors.request.use(config => {
    if (localStorage.token) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    return config
  })

http.interceptors.response.use(res => {
    return res
  }, err => {
    let message = err.response.data.message
    if (message) {
      Vue.prototype.$message.error({message})

      if (err.response.status === 401) { // 未登录
        router.push('/login')
      }

    }
    return Promise.reject(err)
  })

export default http