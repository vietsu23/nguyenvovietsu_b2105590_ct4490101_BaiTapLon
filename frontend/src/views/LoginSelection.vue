<template>
  <div class="login-selection container mt-5 text-center">
    <h2>Cảm ơn vì đã dùng dịch vụ của chúng tôi! Bạn là:</h2>
    <div class="btn-group mt-3" role="group">
      <button @click="selectRole('docgia')" class="btn btn-outline-dark"><strong>Đọc Giả</strong></button>
      &nbsp;
      <button @click="selectRole('nhanvien')" class="btn btn-outline-dark"><strong>Nhân Sự</strong></button>
    </div>

    <div v-if="selectedRole" class="mt-4">
      <LoginForm :role="selectedRole" @loginSuccess="handleLoginSuccess" />
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue"; 

export default {
  data() {
    return {
      selectedRole: null, 
    };
  },
  methods: {
    selectRole(role) {
      this.selectedRole = role; 
    },
    handleLoginSuccess(username, userId, role) {
      
      this.$emit("loginSuccess", username, userId, role);
    },
  },
  components: {
    LoginForm,
  },
};
</script>
<style>
  
</style>