<template>
  <div class="register">
    <h2 class="text-center">Đăng Ký Đọc Giả</h2>
    <DocGiaForm :docGia="initialDocGia" @submit:docgia="handleRegister" />
    <p class="text-center">Đã có tài khoản? <router-link to="/login">Đăng nhập ngay!</router-link></p>
  </div>
</template>

<script>
import DocGiaForm from "../components/DocGiaForm.vue"; 
import axios from 'axios';

export default {
  components: {
    DocGiaForm,
  },
  data() {
    return {
      initialDocGia: {
        HoLot: '',
        Ten: '',
        NgaySinh: '',
        Phai: '',
        DiaChi: '',
        DienThoai: '',
        Email: '',
        Password: '',
      },
    };
  },
  methods: {
    async handleRegister(formData) {
      try {
        const response = await axios.post("http://localhost:3000/api/docgia/", formData);
        alert("Đăng ký thành công! Bạn có thể đăng nhập.");
        this.$router.push("/login");
      } catch (error) {
        console.error("Lỗi đăng ký:", error);
        alert("Đăng ký thất bại. Vui lòng thử lại.");
      }
    },
  },
};
</script>
