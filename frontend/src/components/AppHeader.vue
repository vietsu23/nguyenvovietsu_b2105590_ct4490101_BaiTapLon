<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-secondary shadow-sm">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand"><strong>Quản Lý Mượn Sách</strong></router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <!-- Hiển thị mục khác nhau dựa trên userRole -->
          <li class="nav-item" v-if="userRole === 'docgia'">
            <router-link :to="{ name: 'theodoi' }" class="nav-link">Sách Đã Mượn</router-link>
          </li>
          <li class="nav-item" v-if="userRole === 'nhanvien'">
            <router-link :to="{ name: 'quanly' }" class="nav-link">Quản Lý</router-link>
          </li>
          <li class="nav-item" v-if="username">
            <router-link
              :to="{ name: 'suanguoi', params: { id: userId } }"
              class="nav-link"
            >
              Xin chào, {{ username }}
            </router-link>
            <button @click="logout" class="btn btn-danger btn-sm ms-2">Đăng Xuất</button>
          </li>
          <li class="nav-item" v-else>
            <router-link :to="{ name: 'login' }" class="nav-link">Đăng Nhập/Đăng Kí</router-link>
          </li>
        </ul>
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
    userId: {
      type: String,
      default: null,
    },
    userRole: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isManager: false,
    };
  },
  created() {
    const userRole = localStorage.getItem("userRole");
console.log("userRole từ localStorage:", userRole); 
this.isManager = userRole === "nhanvien";
console.log("isManager:", this.isManager); 
  },
  methods: {
    logout() {
      this.$emit('logout'); 
    },
  },
};
</script>

<style scoped>
.nav-link {
  transition: background-color 0.3s, color 0.3s;
  color: #ffffff;
  border-radius: 5px;
}

.nav-link:hover {
  background-color: #ffffff;
  color: rgba(2, 0, 0, 0.922);
}

.btn-danger {
  transition: background-color 0.3s, border-color 0.3s;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #bd2130;
}
</style>
