import { createApp } from 'vue';
import App from './App.vue';
import { defineRule } from 'vee-validate';
import { required, email, min } from '@vee-validate/rules'; 

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import './assets/main.css';
import router from "./router";

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);

const app = createApp(App);

app.use(router);

app.mount('#app');
