import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
