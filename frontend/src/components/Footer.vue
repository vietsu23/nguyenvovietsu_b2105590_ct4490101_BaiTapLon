<template>
  <footer class=" bg-secondary shadow-sm text-white mt-auto py-3 shadow-sm">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h5></h5>
          <p class="mb-0">© 2024. Tất cả các quyền được bảo lưu.</p>
        </div>
        <div class="col-md-6 text-md-end">
          <ul class="list-inline mb-0">
            <li class="list-inline-item">
              <router-link to="/about" class="text-white text-decoration-none">Về Chúng Tôi</router-link>
            </li>
            <li class="list-inline-item">
              <router-link to="/privacy" class="text-white text-decoration-none">Chính Sách Bảo Mật</router-link>
            </li>
            <li class="list-inline-item">
              <router-link to="/contact" class="text-white text-decoration-none">Liên Hệ</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style scoped>
footer {
  font-size: 0.9rem;
}

footer a {
  transition: color 0.3s;
}

footer a:hover {
  color: #ffd700; /* Màu vàng sáng khi hover */
}
</style>
