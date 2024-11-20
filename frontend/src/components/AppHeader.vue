<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-secondary shadow-sm">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand"><strong>Quản Lý Mượn Sách</strong></router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item" v-if="userRole === 'docgia'">
            <router-link :to="{ name: 'theodoi' }" class="nav-link">Sách Đã Mượn</router-link>
          </li>
          <li class="nav-item" v-if="userRole === 'nhanvien'">
            <router-link :to="{ name: 'theodoi' }" class="nav-link">Phiếu Mượn</router-link>
          </li>
          <li class="nav-item" v-if="userRole === 'nhanvien'">
            <router-link :to="{ name: 'alldocgia' }" class="nav-link">Đọc Giả</router-link>
          </li>
          <li class="nav-item" v-if="userRole === 'nhanvien' && Pro">
            <router-link :to="{ name: 'nhanvien' }" class="nav-link">Nhân Viên</router-link>
          </li>
          <li class="nav-item" v-if="userRole === 'nhanvien'">
            <router-link :to="{ name: 'nhaxuatban' }" class="nav-link">Nhà Xuất Bản</router-link>
          </li>
          <li class="nav-item" v-if="username">
            <router-link :to="{ name: 'suanguoi', params: { id: userId } }" class="nav-link">
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
import axios from 'axios';

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
      Pro: false,
    };
  },
  async mounted() {
    await this.checkProRole();
  },
  watch: {
    userRole(newRole) {
      console.log("userRole đã thay đổi:", newRole);
      this.checkProRole(); 
    },
    userId(newUserId) {
      console.log("userId đã thay đổi:", newUserId);
      this.checkProRole(); 
    }
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
    async checkProRole() {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          const response = await axios.get(`/api/nhanvien/${userId}`);
          console.log(response.data);
          console.log(response.data.__v);
          this.Pro = response.data.__v === 1;
        } else {
          this.Pro = false;
          console.error("Không tìm thấy userId trong localStorage.");
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra quyền quản lý:", error);
      }
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

.navbar-collapse {
  max-height: 400px;  /* Cung cấp không gian cuộn, tùy chỉnh theo nhu cầu */
  overflow-y: auto;   /* Cho phép cuộn menu khi không gian bị giới hạn */
}
</style>

