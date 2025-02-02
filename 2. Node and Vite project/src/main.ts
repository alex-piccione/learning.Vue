import './assets/CSS/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { extendDate } from './extensions/Date.extensions'
import { extendApi } from './services/API/api'
import { createPinia } from 'pinia'
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css' // required by  vue-final-modal 4


const app = createApp(App)

app.use(router)

const pinia = createPinia()
app.use(pinia)

const vfm = createVfm()
app.use(vfm)

extendApi() // Call the function to extend the API
extendDate() // Call the function to extend the Date prototype

app.mount('#app')

// Get Version from an environment variable
// Augment the global `import.meta` object
declare global {
  interface ImportMetaEnv {
    readonly VITE_UI_VERSION: string | undefined; // VITE_ prefix is mandatory
  }
}
