import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/gloable.css'
import request from "@/utils/request";
import axios from "axios";
import store from '@/store'
import {serverIp} from "../public/config"

Vue.config.productionTip = false

Vue.use(ElementUI, { size: "mini" });

Vue.prototype.request=request

axios.defaults.baseURL = `http://${serverIp}:8895`,
Vue.prototype.$axios=axios

axios.interceptors.request.use(config => {
  console.log(config);
  // 请求头挂载信息
  config.headers.Authorization = window.sessionStorage.getItem("flag");
  // 在最后必须return config
  return config;
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
