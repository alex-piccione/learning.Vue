import './assets/CSS/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { extendDate } from './extensions/Date.extensions'

const app = createApp(App)

app.use(router)

extendDate(); // Call the function to extend the Date prototype

app.mount('#app')
