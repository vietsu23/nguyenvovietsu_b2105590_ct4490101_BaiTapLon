<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <AppHeader 
      :username="username" 
      :userId="userId" 
      :userRole="userRole" 
      @logout="handleLogout" 
    />
    <router-view 
      class="flex-grow-1" 
      :is-logged-in="isLoggedIn" 
      @loginSuccess="updateLoginStatus" 
    />
    <AppFooter /> <!-- Thêm Footer -->
  </div>
</template>


<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/Footer.vue"; // Import Footer
export default {
  components: {
    AppHeader,
    AppFooter, // Khai báo Footer
  },
  data() {
    return {
      isLoggedIn: false,
      username: '',
      userId: '',
    };
  },
  created() {
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userId');
    const storedUserRole = localStorage.getItem('userRole');
    if (storedUsername && storedUserId && storedUserRole) { 
      this.isLoggedIn = true;
      this.username = storedUsername;
      this.userId = storedUserId;
      this.userRole = storedUserRole;
      console.log("User ID từ localStorage:", this.userId);
    }
  },
  methods: {
    updateLoginStatus(username, userId, userRole) {
      this.isLoggedIn = true;
      this.username = username;
      this.userId = userId; 
      this.userRole = userRole; 
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('username', username);
      localStorage.setItem('userId', userId); 
      console.log("User ID trong updateLoginStatus:", userId);
      console.log(userRole);
    },
    handleLogout() {
      this.isLoggedIn = false;
      this.username = '';
      this.userId = '';
      this.userRole = '';
      localStorage.removeItem('username');
      localStorage.removeItem('userId'); 
      localStorage.removeItem('userRole');
    },
  },
};
</script>
<style>
#app {
  position: relative;
  min-height: 100vh;
  color: #040404;
}

#app::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('assets/pic/background.jpg'); /* Đường dẫn tới ảnh */
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  opacity: 0.5; /* Độ mờ từ 0 (trong suốt) đến 1 (không mờ) */
  z-index: -1; /* Đưa lớp phủ ra phía sau nội dung */
}
</style>
