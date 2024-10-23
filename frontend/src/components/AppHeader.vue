<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a href="/" class="navbar-brand">Quản Lý Mượn Sách</a>
      <div class="navbar-nav">
        <li class="nav-item">
          <router-link :to="{ name: 'login' }" class="nav-link">
            Sách
            <i class="fas fa-address-book"></i>
          </router-link>
        </li>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

<style scoped>
nav {
  position: fixed; 
  top: 0; 
  left: 0; 
  right: 0; 
  z-index: 1000; 
}

.container {
  margin-top: 60px; 
}
</style>
