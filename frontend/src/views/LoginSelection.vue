<template>
  <div class="login-selection container mt-5 text-center">
    <h2>Cảm ơn vì đã dùng dịch vụ của chúng tôi! Bạn là:</h2>
    <div class="btn-group mt-3" role="group">
      <button @click="selectRole('docgia')" class="btn btn-primary">Đọc Giả</button>
      <button @click="selectRole('quanly')" class="btn btn-success">Quản Lý</button>
      <button @click="selectRole('nhanvien')" class="btn btn-warning">Nhân Viên</button>
    </div>

    <div v-if="selectedRole" class="mt-4">
      <LoginForm :role="selectedRole" @loginSuccess="$emit('loginSuccess', $event)" />
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue"; // Form đăng nhập

export default {
  data() {
    return {
      selectedRole: null, // Vai trò đã chọn
    };
  },
  methods: {
    selectRole(role) {
      this.selectedRole = role; // Gán vai trò khi người dùng chọn
    },
  },
  components: {
    LoginForm, // Import LoginForm component để hiển thị form tương ứng
  },
};
</script>
