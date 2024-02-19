import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt';

import 'bootstrap/dist/css/bootstrap.css'


const emitter =mitt();
const app =createApp(App);
app.provide('emitter',emitter);
app.mount('#app')
