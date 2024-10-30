import { createApp } from 'vue';
import App from './App.vue';
import { defineRule } from 'vee-validate';
import { required, email, min } from '@vee-validate/rules'; // Nhập các quy tắc cụ thể

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import './assets/main.css';
import router from "./router";

// Đăng ký quy tắc xác thực
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
// Đăng ký thêm các quy tắc mà bạn cần

// Tạo một ứng dụng Vue
const app = createApp(App);

// Sử dụng router
app.use(router);

// Gắn ứng dụng vào phần tử HTML
app.mount('#app');
