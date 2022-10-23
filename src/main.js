import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router";
import '@/assets/common.css'

const electron = require('electron')
const app = createApp(App)
app.use(router)
app.mount('#app')
app.config.globalProperties.$electron = electron
