import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import './style.css'

const savedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('vue-mini-site.theme') || 'dark' : 'dark'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: savedTheme,
    themes: {
      light: {
        colors: {
          primary: '#2563eb',
          surface: '#ffffff',
          'surface-bright': '#f8fafc',
          'surface-variant': '#f1f5f9',
        },
      },
      dark: {
        colors: {
          primary: '#3b82f6',
          surface: '#1e293b',
          'surface-bright': '#334155',
          'surface-variant': '#0f172a',
        },
      },
    },
  },
})

createApp(App)
  .use(createPinia())
  .use(router)
  .use(vuetify)
  .mount('#app')
