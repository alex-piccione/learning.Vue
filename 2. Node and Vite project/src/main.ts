import './assets/CSS/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { extendDate } from './extensions/Date.extensions'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(router)

const pinia = createPinia()
app.use(pinia)

extendDate() // Call the function to extend the Date prototype

app.mount('#app')
