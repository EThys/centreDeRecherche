import './assets/main.css'
import 'vue-toast-notification/dist/theme-default.css'
import './assets/toast.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastPlugin from 'vue-toast-notification'
import '@fortawesome/fontawesome-free/css/all.min.css'
import App from './App.vue'
import router from '@/router'
import i18n from '@/i18n'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(ToastPlugin, {
  position: 'top-right',
  duration: 5000,
  dismissible: true,
  pauseOnHover: true,
})

app.mount('#app')
