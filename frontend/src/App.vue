<template>
  <div id="app">
    <AppHeader />
    <div class="container-fluid mt-3"> <!-- Thay 'container' thành 'container-fluid' -->
      <router-view /> <!-- Đây là nơi hiển thị component được điều hướng -->
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  components: {
    AppHeader,
  },
};
</script>

<style>
.container-fluid {
  /* Đảm bảo container mở rộng ra toàn bộ chiều rộng */
  max-width: 100%;
  padding: 0 15px; /* Đảm bảo có khoảng cách ở hai bên */
}
</style>
