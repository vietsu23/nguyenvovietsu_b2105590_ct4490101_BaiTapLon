<template>
  <div class="container mt-4">
    <h2>Quản Lý</h2>
    <div class="row">
      <div class="col-md-3 mb-3">
        <router-link to="/docgia" class="btn btn-primary btn-block">Đọc Giả</router-link>
      </div>
      <div class="col-md-3 mb-3" v-if="isManager">
        <router-link to="/nhanvien" class="btn btn-primary btn-block">Nhân Viên</router-link>
      </div>
      <div class="col-md-3 mb-3">
        <router-link to="/nxb" class="btn btn-primary btn-block">Nhà Xuất Bản</router-link>
      </div>
      <div class="col-md-3 mb-3">
        <router-link to="/theodoi" class="btn btn-primary btn-block">Phiếu Mượn</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "QuanLy",
  data() {
    return {
      isManager: false, 
    };
  },
  async mounted() {
    await this.checkManagerRole();
  },
  methods: {
    async checkManagerRole() {
      try {
        const userId = localStorage.getItem('userId'); 
        if (userId) {
          const response = await axios.get(`/api/nhanvien/${userId}`);
          console.log(response.data);
          console.log(response.data.__v);
          this.isManager = response.data.__v === 1;
        } else {
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
.btn-block {
  width: 100%;
}
</style>
