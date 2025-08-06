import './assets/CSS/main.css'
import { createApp } from 'vue'
import App from './components/App.vue'
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

console.info('App is starting...')

// npm run build says top-level await is not supported (npm run dev still works!)
//await extendApi() // Call the function to extend the API, requires API Info to be set
extendApi()
  .then((_) => {}) // Call the function to extend the API, requires API Info to be set
  .catch((error) => {
    console.error('Error extending API:', error)
  })

extendDate() // Call the function to extend the Date prototype

app.directive('focus', {
  mounted: (element) => {
    element.focus()
  },
})

app.mount('#app')

// Get Version from an environment variable
// Augment the global `import.meta` object
declare global {
  interface ImportMetaEnv {
    readonly VITE_UI_VERSION: string | undefined // VITE_ prefix is mandatory
  }
}
