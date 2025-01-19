import './assets/CSS/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { extendDate } from './extensions/Date.extensions'
import { createPinia } from 'pinia'

const app = createApp(App)

// Version from environment variable


app.use(router)

const pinia = createPinia()
app.use(pinia)

extendDate() // Call the function to extend the Date prototype

app.mount('#app')



// Define the interface for import.meta.env
/*
interface ImportMetaEnv {
  readonly VITE_UI_VERSION: string;
  // Add other environment variables here as needed
}*/

// Augment the global `import.meta` object
declare global {
  /*interface ImportMeta {
    readonly env: ImportMetaEnv;
  }*/
    interface ImportMetaEnv {
      readonly VITE_UI_VERSION: string | undefined;
      // Add other environment variables here as needed
    }

}
