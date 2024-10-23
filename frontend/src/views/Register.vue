<template>
  <div class="register">
    <h2>Đăng Ký</h2>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="username">Tài Khoản:</label>
        <input type="text" v-model="username" required />
      </div>
      <div>
        <label for="password">Mật Khẩu:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Đăng Ký</button>
    </form>
    <p>Đã có tài khoản? <router-link to="/">Đăng nhập ngay!</router-link></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    handleRegister() {
      // Xử lý đăng ký ở đây
      console.log('Đăng ký với tài khoản:', this.username);
    }
  }
};
</script>
