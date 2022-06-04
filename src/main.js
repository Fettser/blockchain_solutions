import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/router";
import VueChartkick from 'vue-chartkick'
import store from '@/store'
import VueBasicAlert from 'vue-basic-alert'


const app = createApp(App)

app
    .use(VueChartkick)
    .use(router)
    .use(store)
    .use(VueBasicAlert)
    .mount('#app')
