<template>
  <div id="app">
    <AppHeader :username="username" :userId="userId" :userRole="userRole" @logout="handleLogout" />
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
      userId: '',
    };
  },
created() {
  
  const storedUsername = localStorage.getItem('username');
  const storedUserId = localStorage.getItem('userId');
  const storedUserRole = localStorage.getItem('userRole');
  if (storedUsername && storedUserId && storedUserRole ) { 
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
