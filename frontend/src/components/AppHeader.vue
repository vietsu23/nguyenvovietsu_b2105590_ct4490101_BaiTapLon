<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a href="/" class="navbar-brand">Quản Lý Mượn Sách</a>
      <div class="navbar-nav">
        <li class="nav-item" v-if="username">
          <span class="nav-link">Xin chào, {{ username }}</span>
          <button @click="logout" class="btn btn-danger">Đăng Xuất</button>
        </li>
        <li class="nav-item" v-else>
          <router-link :to="{ name: 'login' }" class="nav-link">
            Đăng Nhập/Đăng Kí            
          </router-link>
        </li>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppHeader",
  props: {
    username: {
      type: String,
      default: null,
    },
  },
  methods: {
    logout() {
      this.$emit('logout'); // Gửi sự kiện đăng xuất lên App.vue
    },
  },
  watch: {
    username(newVal) {
      console.log("Tên đăng nhập mới:", newVal);
    },
  },
};
</script>
