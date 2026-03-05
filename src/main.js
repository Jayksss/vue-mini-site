import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import './style.css'

const savedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('vue-mini-site.theme') || 'dark' : 'dark'
if (typeof document !== 'undefined') {
  document.documentElement.classList.toggle('dark', savedTheme === 'dark')
}

createApp(App)
  .use(createPinia())
  .use(router)
  .use(ElementPlus)
  .mount('#app')
