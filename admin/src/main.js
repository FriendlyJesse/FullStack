import Vue from 'vue'
import App from './App.vue'
import router from './route'
import './plugins/element'
import http from './http'

Vue.config.productionTip = false
Vue.prototype.$http = http

Vue.mixin({ // 全局混入
  computed: {
    uploadUrl () {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders () {
      return {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
