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

    <p v-if="role === 'docgia'" class="mt-3">
      Bạn chưa có tài khoản? <router-link to="/register">Đăng ký ngay!</router-link>
    </p>
  </div>
</template>

<script>
import axios from 'axios';

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
      if (this.role === "nhanvien") return "Nhân Viên";
    },
  },
  methods: {
    async handleLogin() {
      try {
        let loginUrl;
        if (this.role === "docgia") {
          loginUrl = 'http://localhost:3000/api/docgia/login';
        } else if (this.role === "nhanvien") {
          loginUrl = 'http://localhost:3000/api/nhanvien/login'; 
        }
        const loginData = this.role === "nhanvien" 
          ? { SoDienThoai: this.username, Password: this.password } 
          : { Email: this.username, Password: this.password }; 

        const response = await axios.post(loginUrl, loginData);
        const role = this.role === "docgia" ? "docgia" : "nhanvien"; 
        
        console.log(response.data);
        if (response.data) {
          const userName = this.role === "docgia" ? response.data.docgia?.Ten : response.data.nhanVien?.HoTenNV;
          const userId = this.role === "docgia" ? response.data.docgia?._id : response.data.nhanVien?._id; 
        
          console.log("Tên người dùng:", userName);
          console.log("User ID:", userId); 
          this.$emit("loginSuccess", userName, userId, role);
          this.$router.push('/'); 
        } else {
          console.error("Không có dữ liệu người dùng trong phản hồi");
        }
      } catch (error) {
        console.error(error.response ? error.response.data.message : error.message);
        alert('Số điện thoại hoặc mật khẩu không chính xác');
      }
    }
  }
};
</script>

<style scoped>
</style>
