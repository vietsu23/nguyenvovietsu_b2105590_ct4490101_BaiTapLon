<template>
  <div id="app">
    <AppHeader :username="username" @logout="handleLogout" />
    <router-view :is-logged-in="isLoggedIn" @loginSuccess="updateLoginStatus" />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  components: {
    AppHeader,
  },
  data() {
    return {
      isLoggedIn: false,
      username: '',
    };
  },
  created() {
    // Kiểm tra localStorage để duy trì trạng thái đăng nhập
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.isLoggedIn = true;
      this.username = storedUsername; // Lấy tên người dùng từ localStorage
    }
  },
  methods: {
    updateLoginStatus(username) {
      this.isLoggedIn = true;
      this.username = username;
      localStorage.setItem('username', username); // Lưu tên người dùng vào localStorage
      console.log("Tên đọc giả đã cập nhật:", username);
    },
    handleLogout() {
      this.isLoggedIn = false;
      this.username = '';
      localStorage.removeItem('username'); // Xóa tên người dùng khỏi localStorage
    },
  },
};
</script>
