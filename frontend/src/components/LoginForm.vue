<template>
  <div class="login">
    <h3>Đăng Nhập {{ roleName }}</h3>
    <form @submit.prevent="handleLogin" class="mt-3">
      <div class="mb-3">
        <label for="username" class="form-label">Tài Khoản:</label>
        <input type="text" v-model="username" class="form-control" id="username" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mật Khẩu:</label>
        <input type="password" v-model="password" class="form-control" id="password" required />
      </div>
      <button type="submit" class="btn btn-primary w-100">Đăng Nhập</button>
    </form>

    <!-- Hiển thị dòng đăng ký nếu role là Đọc Giả -->
    <p v-if="role === 'docgia'" class="mt-3">
      Bạn chưa có tài khoản? <router-link to="/register">Đăng ký ngay!</router-link>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    role: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    roleName() {
      if (this.role === "docgia") return "Đọc Giả";
      if (this.role === "quanly") return "Quản Lý";
      if (this.role === "nhanvien") return "Nhân Viên";
    },
  },
  methods: {
    handleLogin() {
      console.log(`Đăng nhập với tài khoản: ${this.username}, vai trò: ${this.role}`);
    },
  },
};
</script>

<style scoped>
/* Style cho form đăng nhập */
.login {
  max-width: 400px;
  margin: auto;
}
</style>
